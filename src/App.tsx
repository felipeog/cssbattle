import { TARGETS_MAP } from 'shared/consts/targetsMap'
import { GitHubButton } from './components/GitHubButton'
import { List } from './components/List'

export function App() {
  const targets = Object.values(TARGETS_MAP)

  return (
    <main className="App">
      <GitHubButton />
      <List targets={targets} />
    </main>
  )
}
