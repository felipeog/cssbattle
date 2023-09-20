import { IframeHTMLAttributes } from 'react'

import { getHtmlFromSolution } from 'shared/utils/getHtmlFromSolution'

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
