import { IframeHTMLAttributes } from 'react'

export function getHtmlFromSolution(solution: string) {
  const head = '<head><style>body{overflow:hidden}</style></head>'
  const body = `<body>${solution}</body>`
  const html = `<html>${head}${body}</html>`

  return html
}

export type IFrameProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  solution: string
}

// https://stackoverflow.com/a/52873226
export function IFrame({ solution, ...props }: IFrameProps) {
  const html = getHtmlFromSolution(solution)

  return (
    <iframe src={'data:text/html,' + encodeURIComponent(html)} {...props} />
  )
}
