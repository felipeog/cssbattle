import { HTMLAttributes } from 'react'
import parse from 'html-react-parser'

import { Challenge } from '../../challenges/types'
import { IFrame } from '../IFrame'
// import styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & Challenge

export function Card({ solution }: CardProps) {
  return (
    <IFrame width={400} height={300}>
      {parse(solution)}
    </IFrame>
  )
}
