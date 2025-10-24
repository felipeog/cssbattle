import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { Target } from 'shared/types'
import { TARGET_DIMENSIONS } from 'src/consts/targetDimensions'
import { Card } from '../Card'
import { EmptyCard } from '../EmptyCard'
import * as styles from './index.module.css'

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  targets: Target[]
}

export function List({ targets }: ListProps) {
  const debounceRef = useRef<NodeJS.Timeout>()
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth)

  const columnsNumber = Math.floor(availableWidth / TARGET_DIMENSIONS.WIDTH)

  function handleResize() {
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      setAvailableWidth(window.innerWidth)
    }, 100)
  }

  function getScalingStyle() {
    if (availableWidth < TARGET_DIMENSIONS.WIDTH) {
      const scale = availableWidth / TARGET_DIMENSIONS.WIDTH

      return {
        height: targets.length * (TARGET_DIMENSIONS.HEIGHT * scale),
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }
    }

    const width = columnsNumber * TARGET_DIMENSIONS.WIDTH
    const scale = availableWidth / width

    return {
      width,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    }
  }

  function isInLastColumn(columnNumber: number) {
    if (columnsNumber <= 1) {
      return true
    }

    return columnNumber % columnsNumber === 0
  }

  function isInLastRow(rowNumber: number) {
    if (columnsNumber <= 1) {
      return rowNumber === targets.length
    }

    const paddedRows = Math.ceil(targets.length / columnsNumber) * columnsNumber

    return rowNumber > paddedRows - columnsNumber
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ul className={classNames('List', styles.list)} style={getScalingStyle()}>
      {targets.map((target, index) => {
        if (!target.solution) {
          return (
            <li key={target.id}>
              <EmptyCard
                isInLastColumn={isInLastColumn(index + 1)}
                isInLastRow={isInLastRow(index + 1)}
                target={target}
              />
            </li>
          )
        }

        return (
          <li key={target.id}>
            <Card target={target} />
          </li>
        )
      })}
    </ul>
  )
}
