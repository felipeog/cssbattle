import classNames from 'classnames'

import gitHubLogo from 'url:../../../static/GitHub-Mark-Light-64px.png'
import * as styles from './index.module.css'

export function GitHubButton() {
  return (
    <a
      className={classNames('GitHubButton', styles.link)}
      href="https://github.com/felipeog/cssbattle"
      target="_blank"
      rel="noreferrer"
    >
      <img
        className={styles.logo}
        src={gitHubLogo}
        alt="GitHub logo"
        title="felipeog/cssbattle"
      />
    </a>
  )
}
