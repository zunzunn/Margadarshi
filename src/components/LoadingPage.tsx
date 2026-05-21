import { useEffect, useRef } from 'react'
import type { TranslationSet } from '@/translations'

interface LoadingPageProps {
  t: TranslationSet
}

export default function LoadingPage({ t }: LoadingPageProps) {
  const stepRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const steps = t.loadingSteps
    let index = 0
    const totalDuration = 5000
    const stepDuration = totalDuration / steps.length

    if (stepRef.current) stepRef.current.textContent = steps[0]
    if (barRef.current) barRef.current.style.width = '0%'

    const timer = setInterval(() => {
      index++
      if (index < steps.length) {
        if (stepRef.current) {
          stepRef.current.style.opacity = '0'
          stepRef.current.style.transform = 'translateY(6px)'
          setTimeout(() => {
            if (stepRef.current) {
              stepRef.current.textContent = steps[index]
              stepRef.current.style.opacity = '1'
              stepRef.current.style.transform = 'translateY(0)'
            }
          }, 200)
        }
        if (barRef.current) {
          barRef.current.style.width = ((index + 1) / steps.length) * 100 + '%'
        }
      } else {
        clearInterval(timer)
        if (barRef.current) barRef.current.style.width = '100%'
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [t.loadingSteps])

  return (
    <div className="flex flex-col items-center justify-center py-20 page-enter">
      <div className="spinner mb-8" />
      <div className="h-7 flex items-center justify-center mb-4">
        <p ref={stepRef} className="text-base md:text-lg font-medium text-apple-text step-fade">
          {t.loadingSteps[0]}
        </p>
      </div>
      <div className="w-48 md:w-56 h-1 bg-apple-border/40 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-apple-text rounded-full transition-all duration-500 ease-out"
          style={{ width: '0%' }}
        />
      </div>
      <p className="text-xs text-apple-secondary/70 mt-6">Please wait while we analyze your profile</p>
    </div>
  )
}
