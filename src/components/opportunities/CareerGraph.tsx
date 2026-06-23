import { useEffect, useRef } from 'react'
import { drag } from 'd3-drag'
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force'
import { select, type Selection } from 'd3-selection'
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom'
import {
  careers,
  careerLinks,
  fieldColorBySlug,
  fieldMeta,
  graphRoleLines,
  type Career,
  type CareerLink,
  type FieldSlug,
} from '../../data/careers'

type GraphNode = SimulationNodeDatum & {
  id: string
  title: string
  lines: string[]
  isHub: boolean
  fieldSlug?: FieldSlug
  radius: number
}

type GraphLink = SimulationLinkDatum<GraphNode> & {
  source: string | GraphNode
  target: string | GraphNode
}

type Props = {
  highlightId: string | null
  selectedId: string | null
  onNodeHover: (id: string | null) => void
  onNodeClick: (id: string) => void
}

function buildNodes(): GraphNode[] {
  const hubNodes: GraphNode[] = fieldMeta.map((field, index) => ({
    id: field.hubId,
    title: field.label,
    lines: [field.shortLabel],
    isHub: true,
    fieldSlug: field.slug,
    radius: 14,
    x: 120 + (index % 3) * 180,
    y: 80 + Math.floor(index / 3) * 160,
  }))

  const careerNodes: GraphNode[] = careers.map((career, index) => ({
    id: career.id,
    title: career.role,
    lines: graphRoleLines(career.role),
    isHub: false,
    fieldSlug: career.fieldSlug,
    radius: 7,
    x: 60 + (index % 8) * 55,
    y: 40 + Math.floor(index / 8) * 48,
  }))

  return [...hubNodes, ...careerNodes]
}

function buildLinks(): GraphLink[] {
  return careerLinks.map((link) => ({ ...link }))
}

function neighborSet(nodeId: string, links: GraphLink[]): Set<string> {
  const neighbors = new Set<string>()
  for (const link of links) {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source
    const targetId = typeof link.target === 'object' ? link.target.id : link.target
    if (sourceId === nodeId) neighbors.add(String(targetId))
    if (targetId === nodeId) neighbors.add(String(sourceId))
  }
  return neighbors
}

function resolveActiveCareerId(activeId: string | null): string | null {
  if (!activeId) return null
  if (activeId.startsWith('field:')) return null
  return activeId
}

export default function CareerGraph({ highlightId, selectedId, onNodeHover, onNodeClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const simulationRef = useRef<Simulation<GraphNode, GraphLink> | null>(null)
  const nodesRef = useRef<GraphNode[]>(buildNodes())
  const linksRef = useRef<GraphLink[]>(buildLinks())
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const svgEl = svgRef.current
    if (!container || !svgEl) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = nodesRef.current
    const links = linksRef.current

    const width = container.clientWidth || 480
    const height = container.clientHeight || 480

    const svg = select(svgEl)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const root = svg.append('g').attr('class', 'career-graph__zoom')

    const linkSelection = root
      .append('g')
      .attr('class', 'career-graph__links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', 'career-graph__link')

    const nodeSelection = root
      .append('g')
      .attr('class', 'career-graph__nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', (d) => `career-graph__node${d.isHub ? ' is-hub' : ''}`)
      .attr('data-id', (d) => d.id)

    nodeSelection
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => {
        if (!d.fieldSlug) return 'var(--accent)'
        return fieldColorBySlug[d.fieldSlug]
      })

    nodeSelection.append('title').text((d) => d.title)

    const labelSelection = nodeSelection
      .append('text')
      .attr('class', 'career-graph__label')
      .attr('dy', (d) => d.radius + 11)

    labelSelection.each(function renderLabel(d) {
      const text = select(this)
      text.selectAll('tspan').remove()
      d.lines.forEach((line, index) => {
        text
          .append('tspan')
          .attr('x', 0)
          .attr('dy', index === 0 ? 0 : '1.15em')
          .text(line)
      })
    })

    const tick = () => {
      linkSelection
        .attr('x1', (d) => (d.source as GraphNode).x ?? 0)
        .attr('y1', (d) => (d.source as GraphNode).y ?? 0)
        .attr('x2', (d) => (d.target as GraphNode).x ?? 0)
        .attr('y2', (d) => (d.target as GraphNode).y ?? 0)

      nodeSelection.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
    }

    const simulation = forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance((d) => {
            const source = d.source as GraphNode
            const target = d.target as GraphNode
            if (source.isHub || target.isHub) return 72
            return 42
          })
          .strength(0.55),
      )
      .force('charge', forceManyBody().strength(-120))
      .force('center', forceCenter(width / 2, height / 2))
      .force(
        'collide',
        forceCollide<GraphNode>().radius((d) => {
          const labelPadding = d.lines.length > 1 ? 18 : 12
          return d.radius + labelPadding + (d.isHub ? 8 : 0)
        }),
      )

    if (reducedMotion) {
      simulation.stop()
      for (let i = 0; i < 120; i += 1) simulation.tick()
      tick()
    } else {
      simulation.on('tick', tick)
    }

    simulationRef.current = simulation

    const dragBehavior = drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.25).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    ;(nodeSelection as Selection<SVGGElement, GraphNode, SVGGElement, unknown>).call(
      dragBehavior,
    )

    nodeSelection
      .on('mouseenter', (_, d) => {
        if (!d.isHub) onNodeHover(d.id)
      })
      .on('mouseleave', () => onNodeHover(null))
      .on('click', (_, d) => {
        if (!d.isHub) onNodeClick(d.id)
      })

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.5])
      .on('zoom', (event) => {
        root.attr('transform', event.transform)
      })

    svg.call(zoomBehavior)
    svg.call(zoomBehavior.transform, zoomIdentity.translate(0, 0).scale(1))
    zoomRef.current = zoomBehavior

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = container.clientWidth || width
      const nextHeight = container.clientHeight || height
      svg.attr('viewBox', `0 0 ${nextWidth} ${nextHeight}`)
      simulation.force('center', forceCenter(nextWidth / 2, nextHeight / 2))
      if (!reducedMotion) simulation.alpha(0.3).restart()
    })
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      simulation.stop()
      simulationRef.current = null
    }
  }, [onNodeClick, onNodeHover])

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl) return

    const careerHighlightId = resolveActiveCareerId(highlightId)
    const careerSelectedId = resolveActiveCareerId(selectedId)
    const links = linksRef.current
    const neighbors = careerHighlightId ? neighborSet(careerHighlightId, links) : new Set<string>()

    select(svgEl)
      .selectAll<SVGLineElement, GraphLink>('.career-graph__link')
      .classed('is-active', (d) => {
        if (!careerHighlightId) return false
        const sourceId = typeof d.source === 'object' ? d.source.id : d.source
        const targetId = typeof d.target === 'object' ? d.target.id : d.target
        return sourceId === careerHighlightId || targetId === careerHighlightId
      })
      .classed('is-dimmed', () => Boolean(careerHighlightId))

    select(svgEl)
      .selectAll<SVGGElement, GraphNode>('.career-graph__node')
      .classed('is-selected', (d) => d.id === careerSelectedId)
      .classed('is-active', (d) => d.id === careerHighlightId || neighbors.has(d.id))
      .classed(
        'is-dimmed',
        (d) =>
          Boolean(careerHighlightId) && d.id !== careerHighlightId && !neighbors.has(d.id),
      )

    select(svgEl)
      .selectAll<SVGTextElement, GraphNode>('.career-graph__label')
      .classed('is-selected', (d) => d.id === careerSelectedId)
      .classed('is-active', (d) => d.id === careerHighlightId || neighbors.has(d.id))
  }, [highlightId, selectedId])

  return (
    <div ref={containerRef} className="career-graph" aria-hidden="true">
      <svg ref={svgRef} role="img" aria-label="Граф связей между профессиями космической отрасли" />
    </div>
  )
}

export type { Career, CareerLink }
