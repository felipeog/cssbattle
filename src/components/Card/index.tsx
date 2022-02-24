import { HTMLAttributes } from 'react'
import parse from 'html-react-parser'

import { Challenge } from '../../challenges/types'
import { IFrame } from '../IFrame'
import { CHALLENGE_DIMENSIONS } from '../../consts/challengeDimensions'
// import styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & Challenge

export function Card({ solution }: CardProps) {
  return (
    <IFrame
      width={CHALLENGE_DIMENSIONS.WIDTH}
      height={CHALLENGE_DIMENSIONS.HEIGHT}
    >
      {parse(solution)}
    </IFrame>
  )
}
