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

  function getScalingStyle(availableWidth: number) {
    if (availableWidth < TARGET_DIMENSIONS.WIDTH) {
      const scale = availableWidth / TARGET_DIMENSIONS.WIDTH

      return {
        height: targets.length * (TARGET_DIMENSIONS.HEIGHT * scale),
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }
    }

    const columnsNumber = Math.floor(availableWidth / TARGET_DIMENSIONS.WIDTH)
    const width = columnsNumber * TARGET_DIMENSIONS.WIDTH
    const scale = availableWidth / width

    return {
      width,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ul className={styles.list} style={getScalingStyle(availableWidth)}>
      {targets.map((target) => (
        <li key={target.id}>
          <Card {...target} />
        </li>
      ))}
    </ul>
  )
}
