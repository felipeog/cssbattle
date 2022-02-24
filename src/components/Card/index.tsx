import { HTMLAttributes } from 'react'
import parse from 'html-react-parser'

import { Target } from '../../targets/types'
import { IFrame } from '../IFrame'
import { TARGET_DIMENSIONS } from '../../consts/targetDimensions'
import styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & Target

export function Card({ solution }: CardProps) {
  return (
    <IFrame
      className={styles.iframe}
      width={TARGET_DIMENSIONS.WIDTH}
      height={TARGET_DIMENSIONS.HEIGHT}
    >
      {parse(solution)}
    </IFrame>
  )
}
