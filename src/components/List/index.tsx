import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Challenge } from '../../challenges/types'
import { Card } from '../Card'
import styles from './index.module.css'

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

  const columns = Math.floor(availableWidth / 400)
  const contentWidth = columns * 400
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
