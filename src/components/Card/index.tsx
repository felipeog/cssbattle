import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { IFrame } from '../IFrame'
import { PlaceholderCard } from '../PlaceholderCard'
import { Target } from '../../types'
import { TARGET_DIMENSIONS } from '../../consts/targetDimensions'
import * as styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & Target

export function Card({ solution, title }: CardProps) {
  const cardRef = useRef()
  const [isIntersecting, setIsIntersecting] = useState(true)

  function handleObserverChange(entries: IntersectionObserverEntry[]) {
    setIsIntersecting(entries?.[0]?.isIntersecting)
  }

  useEffect(() => {
    if (!window?.IntersectionObserver) {
      return
    }

    const observer = new IntersectionObserver(handleObserverChange, {
      rootMargin: '100px',
    })

    observer.observe(cardRef.current)

    return () => {
      observer.unobserve(cardRef.current)
    }
  }, [])

  return (
    <div className="Card" title={title} ref={cardRef}>
      {isIntersecting ? (
        <IFrame
          className={styles.iframe}
          width={TARGET_DIMENSIONS.WIDTH}
          height={TARGET_DIMENSIONS.HEIGHT}
          solution={solution}
        />
      ) : (
        <PlaceholderCard />
      )}
    </div>
  )
}
