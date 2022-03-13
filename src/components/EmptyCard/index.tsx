import { HTMLAttributes } from 'react'
import classNames from 'classnames'

import { Target } from '../../types'
import * as styles from './index.module.css'

export type EmptyCardProps = HTMLAttributes<HTMLDivElement> &
  Target & {
    isInLastColumn?: boolean
    isInLastRow?: boolean
  }

export function EmptyCard({
  title,
  isInLastColumn,
  isInLastRow,
}: EmptyCardProps) {
  function getBorderStyle() {
    return {
      ...(isInLastColumn ? { borderRight: 'none' } : {}),
      ...(isInLastRow ? { borderBottom: 'none' } : {}),
    }
  }

  return (
    <div
      className={classNames('EmptyCard', styles.container)}
      style={getBorderStyle()}
    >
      <p>{title}</p>
    </div>
  )
}
