import { IframeHTMLAttributes } from 'react'

export type IFrameProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  solution: string
}

// https://stackoverflow.com/a/52873226
export function IFrame({ solution, ...props }: IFrameProps) {
  const html = `<style>body{overflow:hidden}</style>${solution}`

  return (
    <iframe src={'data:text/html,' + encodeURIComponent(html)} {...props} />
  )
}
