import { HTMLAttributes } from 'react'

import { Target } from 'shared/types'
import { TARGET_DIMENSIONS } from 'shared/consts/targetDimensions'
import { IFrame } from '../IFrame'
import * as styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & Target

export function Card({ solution, title }: CardProps) {
  return (
    <div className="Card" title={title}>
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
