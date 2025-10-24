import { HTMLAttributes } from 'react'

import { Target } from 'shared/types'
import { TARGET_DIMENSIONS } from 'src/consts/targetDimensions'
import { IFrame } from '../IFrame'
import * as styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & { target: Target }

export function Card({ target }: CardProps) {
  const { id, solution, title } = target

  return (
    <div id={String(id)} className="Card" title={title}>
      <IFrame
        className={styles.iframe}
        width={TARGET_DIMENSIONS.WIDTH}
        height={TARGET_DIMENSIONS.HEIGHT}
        solution={solution}
        title={title}
      />
    </div>
  )
}
