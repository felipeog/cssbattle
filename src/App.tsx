import * as rawChallenges from './challenges'
import { List } from './components/List'

export function App() {
  const challenges = Object.values(rawChallenges)

  return (
    <main className="App">
      <List challenges={challenges} />
    </main>
  )
}
