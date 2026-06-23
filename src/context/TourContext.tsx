import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SiteTour from '../components/tour/SiteTour'
import { tourSteps, type TourStep } from '../data/tour'

type TourContextValue = {
  isActive: boolean
  stepIndex: number
  step: TourStep | null
  totalSteps: number
  startTour: () => void
  endTour: () => void
  nextStep: () => void
  prevStep: () => void
}

const TourContext = createContext<TourContextValue | null>(null)

export function TourProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isActive, setIsActive] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [routeReady, setRouteReady] = useState(true)

  const step = tourSteps[stepIndex] ?? null
  const totalSteps = tourSteps.length

  const startTour = useCallback(() => {
    setStepIndex(0)
    setIsActive(true)
    if (location.pathname !== tourSteps[0].route) {
      setRouteReady(false)
      navigate(tourSteps[0].route)
    }
  }, [location.pathname, navigate])

  const endTour = useCallback(() => {
    setIsActive(false)
    setStepIndex(0)
    setRouteReady(true)
  }, [])

  const goToStep = useCallback(
    (index: number) => {
      const next = tourSteps[index]
      if (!next) return

      setStepIndex(index)
      if (location.pathname !== next.route) {
        setRouteReady(false)
        navigate(next.route)
      } else {
        setRouteReady(true)
      }
    },
    [location.pathname, navigate],
  )

  const nextStep = useCallback(() => {
    if (stepIndex >= totalSteps - 1) {
      endTour()
      return
    }
    goToStep(stepIndex + 1)
  }, [endTour, goToStep, stepIndex, totalSteps])

  const prevStep = useCallback(() => {
    if (stepIndex <= 0) return
    goToStep(stepIndex - 1)
  }, [goToStep, stepIndex])

  useEffect(() => {
    if (!isActive || !step) return
    if (location.pathname === step.route) {
      const timer = window.setTimeout(() => setRouteReady(true), 120)
      return () => window.clearTimeout(timer)
    }
    setRouteReady(false)
    navigate(step.route)
  }, [isActive, location.pathname, navigate, step])

  useEffect(() => {
    if (!isActive) return
    document.body.classList.add('tour-active')
    return () => document.body.classList.remove('tour-active')
  }, [isActive])

  const value = useMemo(
    () => ({
      isActive,
      stepIndex,
      step,
      totalSteps,
      startTour,
      endTour,
      nextStep,
      prevStep,
    }),
    [endTour, isActive, nextStep, prevStep, startTour, step, stepIndex, totalSteps],
  )

  return (
    <TourContext.Provider value={value}>
      {children}
      {isActive && step ? (
        <SiteTour
          step={step}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          routeReady={routeReady}
          onNext={nextStep}
          onPrev={prevStep}
          onClose={endTour}
        />
      ) : null}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error('useTour must be used within TourProvider')
  }
  return context
}
