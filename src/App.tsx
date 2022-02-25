import { TARGETS_MAP } from './consts/targetsMap'
import { List } from './components/List'

export function App() {
  const targets = Object.values(TARGETS_MAP)

  return (
    <main className="App">
      <List targets={targets} />
    </main>
  )
}
