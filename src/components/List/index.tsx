import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Card } from '../Card'
import { Target } from '../../types'
import { TARGET_DIMENSIONS } from '../../consts/targetDimensions'
import * as styles from './index.module.css'

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
        maxWidth: contentWidth,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      {targets.map((target) => (
        <li key={target.targetId}>
          <Card {...target} />
        </li>
      ))}
    </ul>
  )
}
