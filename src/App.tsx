import { List } from './components/List'
import { TARGETS_MAP } from './consts/targetsMap'

export function App() {
  const targets = Object.values(TARGETS_MAP)

  return (
    <main className="App">
      <List targets={targets} />
    </main>
  )
}
