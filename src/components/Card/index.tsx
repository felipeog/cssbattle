import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { IFrame } from '../IFrame'
import { PlaceholderCard } from '../PlaceholderCard'
import { Target } from '../../types'
import { TARGET_DIMENSIONS } from '../../consts/targetDimensions'
import * as styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & Target

export function Card({ solution, title }: CardProps) {
  const cardRef = useRef()
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting)
      setIsIntersecting(entries[0].isIntersecting)
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
