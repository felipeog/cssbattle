import { GitHubButton } from './components/GitHubButton'
import { List } from './components/List'
import { TARGETS_MAP } from './consts/targetsMap'

export function App() {
  const targets = Object.values(TARGETS_MAP)

  return (
    <main className="App">
      <GitHubButton />
      <List targets={targets} />
    </main>
  )
}
