import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Challenge } from '../../challenges/types'
import { Card } from '../Card'
import styles from './index.module.css'
import { CHALLENGE_DIMENSIONS } from '../../consts/challengeDimensions'

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  challenges: Challenge[]
}

export function List({ challenges }: ListProps) {
  const debounceRef = useRef<number>()
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth)

  function handleResize() {
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      setAvailableWidth(window.innerWidth)
    }, 100)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const columnsNumber = Math.floor(availableWidth / CHALLENGE_DIMENSIONS.WIDTH)
  const contentWidth = columnsNumber * CHALLENGE_DIMENSIONS.WIDTH
  const scale = availableWidth / contentWidth

  return (
    <ul
      className={styles.container}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        maxWidth: contentWidth,
      }}
    >
      {challenges.map((challenge) => (
        <li key={challenge.title}>
          <Card {...challenge} />
        </li>
      ))}
    </ul>
  )
}
