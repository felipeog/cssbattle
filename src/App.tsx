import * as rawTargets from './targets'
import { List } from './components/List'

export function App() {
  const targets = Object.values(rawTargets)

  return (
    <main className="App">
      <List targets={targets} />
    </main>
  )
}
