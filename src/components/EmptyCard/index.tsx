import { HTMLAttributes } from 'react'
import classNames from 'classnames'

import { Target } from 'shared/types'
import * as styles from './index.module.css'

export type EmptyCardProps = HTMLAttributes<HTMLDivElement> & {
  target: Target
  isInLastColumn?: boolean
  isInLastRow?: boolean
}

export function EmptyCard({
  target,
  isInLastColumn,
  isInLastRow,
}: EmptyCardProps) {
  const { id, title } = target

  function getBorderStyle() {
    return {
      ...(isInLastColumn ? { borderRight: 'none' } : {}),
      ...(isInLastRow ? { borderBottom: 'none' } : {}),
    }
  }
  return (
    <div
      id={String(id)}
      className={classNames('EmptyCard', styles.container)}
      style={getBorderStyle()}
    >
      <p>{title}</p>
    </div>
  )
}
