import { HTMLAttributes } from 'react'
import parse from 'html-react-parser'

import { IFrame } from '../IFrame'
// import styles from './index.module.css'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  url: string
  solution: string
}

export function Card({ title, url, solution }: CardProps) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <article className="Card">
        <h1>{title}</h1>

        <IFrame width={400} height={300}>
          {parse(solution)}
        </IFrame>
      </article>
    </a>
  )
}
