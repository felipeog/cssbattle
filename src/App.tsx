import { Card } from './components/Card'
import * as rawChallenges from './challenges'

export function App() {
  const challenges = Object.values(rawChallenges)

  return (
    <div className="App">
      {challenges.map((challenge) => (
        <Card key={challenge.title} {...challenge} />
      ))}
    </div>
  )
}
