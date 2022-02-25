import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Target } from '../../types'
import { Card } from '../Card'
import styles from './index.module.css'
import { TARGET_DIMENSIONS } from '../../consts/targetDimensions'

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  targets: Target[]
}

export function List({ targets }: ListProps) {
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

  const columnsNumber = Math.floor(availableWidth / TARGET_DIMENSIONS.WIDTH)
  const contentWidth = columnsNumber * TARGET_DIMENSIONS.WIDTH
  const scale = availableWidth / contentWidth

  return (
    <ul
      className={styles.list}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        maxWidth: contentWidth,
      }}
    >
      {targets.map((target) => (
        <li key={target.title}>
          <Card {...target} />
        </li>
      ))}
    </ul>
  )
}
