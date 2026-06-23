import { useEffect, useMemo, useRef } from 'react'
import { select } from 'd3-selection'
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom'
import type { MissionNode } from '../../data/exploration'

const COLUMN_WIDTH = 200
const ROW_GAP = 58
const MARGIN = { top: 36, left: 28, right: 40, bottom: 36 }

type LayoutItem = {
  node: MissionNode
  depth: number
  parentId: string | null
}

type PositionedNode = LayoutItem & {
  x: number
  y: number
}

type Props = {
  root: MissionNode
  expandedIds: Set<string>
  selectedId: string | null
  onToggle: (id: string) => void
  onSelect: (id: string) => void
}

function collectVisible(
  node: MissionNode,
  expandedIds: Set<string>,
  depth = 0,
  parentId: string | null = null,
  acc: LayoutItem[] = [],
): LayoutItem[] {
  acc.push({ node, depth, parentId })
  if (node.children && expandedIds.has(node.id)) {
    for (const child of node.children) {
      collectVisible(child, expandedIds, depth + 1, node.id, acc)
    }
  }
  return acc
}

function layoutTree(items: LayoutItem[]): { nodes: PositionedNode[]; width: number; height: number } {
  const depthCounts = new Map<number, number>()
  const depthIndices = new Map<number, number>()

  for (const item of items) {
    depthCounts.set(item.depth, (depthCounts.get(item.depth) ?? 0) + 1)
  }

  const maxPerDepth = Math.max(1, ...depthCounts.values())
  const maxDepth = Math.max(0, ...items.map((item) => item.depth))
  const height = MARGIN.top + MARGIN.bottom + Math.max(maxPerDepth, 1) * ROW_GAP
  const width = MARGIN.left + MARGIN.right + (maxDepth + 1) * COLUMN_WIDTH

  const nodes: PositionedNode[] = items.map((item) => {
    const countAtDepth = depthCounts.get(item.depth) ?? 1
    const indexAtDepth = depthIndices.get(item.depth) ?? 0
    depthIndices.set(item.depth, indexAtDepth + 1)

    const blockHeight = countAtDepth * ROW_GAP
    const yStart = MARGIN.top + (height - MARGIN.top - MARGIN.bottom - blockHeight) / 2

    return {
      ...item,
      x: MARGIN.left + item.depth * COLUMN_WIDTH,
      y: yStart + indexAtDepth * ROW_GAP + ROW_GAP / 2,
    }
  })

  return { nodes, width, height }
}

function linkPath(source: PositionedNode, target: PositionedNode): string {
  const sx = source.x + 8
  const sy = source.y
  const tx = target.x - 8
  const ty = target.y
  const midX = (sx + tx) / 2
  return `M${sx},${sy} C${midX},${sy} ${midX},${ty} ${tx},${ty}`
}

function shortName(name: string): string {
  if (name.length <= 16) return name
  return `${name.slice(0, 15)}…`
}

function fitTreeToView(
  container: HTMLElement,
  svgEl: SVGSVGElement,
  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>,
  treeWidth: number,
  treeHeight: number,
) {
  const cw = container.clientWidth
  const ch = container.clientHeight
  if (!cw || !ch || !treeWidth || !treeHeight) return

  const scale = Math.min(cw / treeWidth, ch / treeHeight, 1) * 0.9
  const tx = (cw - treeWidth * scale) / 2
  const ty = (ch - treeHeight * scale) / 2

  select(svgEl).call(
    zoomBehavior.transform,
    zoomIdentity.translate(tx, ty).scale(scale),
  )
}

export default function MissionTree({
  root,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const hasInitialFitRef = useRef(false)

  const { nodes, links, width, height } = useMemo(() => {
    const items = collectVisible(root, expandedIds)
    const layout = layoutTree(items)
    const byId = new Map(layout.nodes.map((node) => [node.node.id, node]))

    const visibleLinks = layout.nodes
      .filter((item) => item.parentId)
      .map((item) => {
        const source = byId.get(item.parentId!)
        const target = item
        return source ? { source, target, linkStyle: target.node.linkStyle ?? 'solid' } : null
      })
      .filter(
        (link): link is {
          source: PositionedNode
          target: PositionedNode
          linkStyle: 'solid' | 'dashed'
        } => Boolean(link),
      )

    return { nodes: layout.nodes, links: visibleLinks, width: layout.width, height: layout.height }
  }, [root, expandedIds])

  useEffect(() => {
    const container = containerRef.current
    const svgEl = svgRef.current
    if (!container || !svgEl) return

    svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`)

    if (!hasInitialFitRef.current && zoomRef.current) {
      fitTreeToView(container, svgEl, zoomRef.current, width, height)
      hasInitialFitRef.current = true
    }
  }, [width, height])

  useEffect(() => {
    const container = containerRef.current
    const svgEl = svgRef.current
    if (!container || !svgEl) return

    const svg = select(svgEl)
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.25, 2.5])
      .on('zoom', (event) => {
        svg.select('.mission-tree__zoom').attr('transform', event.transform)
      })

    svg.call(zoomBehavior)
    zoomRef.current = zoomBehavior

    const containerSize = { w: 0, h: 0 }

    const fitOnContainerResize = () => {
      const cw = container.clientWidth
      const ch = container.clientHeight
      if (!cw || !ch) return
      if (cw === containerSize.w && ch === containerSize.h) return

      containerSize.w = cw
      containerSize.h = ch

      const viewBox = svgEl.viewBox.baseVal
      const treeW = viewBox.width || width
      const treeH = viewBox.height || height
      fitTreeToView(container, svgEl, zoomBehavior, treeW, treeH)
    }

    const resizeObserver = new ResizeObserver(fitOnContainerResize)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  const handleToggleClick = (event: React.MouseEvent | React.KeyboardEvent, nodeId: string) => {
    event.stopPropagation()
    onToggle(nodeId)
  }

  const handleSelectClick = (node: MissionNode) => {
    onSelect(node.id)
  }

  return (
    <div ref={containerRef} className="mission-tree">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Интерактивное дерево ключевых космических миссий"
      >
        <g className="mission-tree__zoom">
          <g className="mission-tree__links">
            {links.map(({ source, target, linkStyle }) => (
              <path
                key={`${source.node.id}-${target.node.id}`}
                className={`mission-tree__link${
                  linkStyle === 'dashed' ? ' is-dashed' : ''
                }${
                  selectedId === source.node.id || selectedId === target.node.id
                    ? ' is-active'
                    : ''
                }`}
                d={linkPath(source, target)}
              />
            ))}
          </g>

          <g className="mission-tree__nodes">
            {nodes.map(({ node, x, y }) => {
              const hasChildren = Boolean(node.children?.length)
              const isExpanded = expandedIds.has(node.id)
              const isSelected = selectedId === node.id
              const kind = node.kind ?? 'mission'

              return (
                <g
                  key={node.id}
                  className={`mission-tree__node${isSelected ? ' is-selected' : ''}${
                    hasChildren ? (isExpanded ? ' is-expanded' : ' is-collapsed') : ''
                  }${kind === 'precursor' ? ' is-precursor' : ''}${
                    kind === 'spinoff' ? ' is-spinoff' : ''
                  }`}
                  transform={`translate(${x},${y})`}
                >
                  <g
                    className="mission-tree__body"
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.year}, ${node.name}. Выбрать миссию`}
                    onClick={() => handleSelectClick(node)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        handleSelectClick(node)
                      }
                    }}
                  >
                    <circle r={7} className="mission-tree__dot" />
                    <text className="mission-tree__year" y={-14}>
                      {node.year}
                    </text>
                    <text className="mission-tree__label" y={22}>
                      {shortName(node.name)}
                    </text>
                  </g>

                  {hasChildren ? (
                    <g
                      className="mission-tree__toggle"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      aria-label={
                        isExpanded
                          ? `Свернуть ветку ${node.name}`
                          : `Раскрыть ветку ${node.name}`
                      }
                      transform="translate(11, -10)"
                      onClick={(event) => handleToggleClick(event, node.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          handleToggleClick(event, node.id)
                        }
                      }}
                    >
                      <circle r={11} className="mission-tree__toggle-hit" />
                      <text className="mission-tree__badge" x={0} y={4} textAnchor="middle">
                        {isExpanded ? '−' : '+'}
                      </text>
                    </g>
                  ) : null}

                  <title>{`${node.year} — ${node.name}. ${node.result}`}</title>
                </g>
              )
            })}
          </g>
        </g>
      </svg>
    </div>
  )
}
