import { IframeHTMLAttributes, useState } from 'react'
import { createPortal } from 'react-dom'

import * as styles from './index.module.css'

export type IFrameProps = IframeHTMLAttributes<HTMLIFrameElement>

// https://dev.to/graftini/rendering-in-an-iframe-in-a-react-app-2boa
export function IFrame({ children, ...props }: IFrameProps) {
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement>()

  const head = {
    children: <style>{`body{overflow:hidden}`}</style>,
    container: iframeRef?.contentDocument?.head,
  }
  const body = {
    children: children,
    container: iframeRef?.contentDocument?.body,
  }

  return (
    <iframe className={styles.iframe} ref={setIframeRef} {...props}>
      {head.container && createPortal(head.children, head.container)}
      {body.container && createPortal(body.children, body.container)}
    </iframe>
  )
}
