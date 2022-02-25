import { Fragment } from 'react'
import groupBy from 'core-js-pure/actual/array/group-by'

import { TARGETS_MAP } from './consts/targetsMap'
import { BATTLES_MAP } from './consts/battlesMap'
import { List } from './components/List'
import { Target } from './types'

export type TargetsByBattleMap = {
  [key: string]: Target[]
}

export function App() {
  const targetsByBattleMap: TargetsByBattleMap = groupBy(
    Object.values(TARGETS_MAP),
    (target: Target) => target.battleId,
  )
  const targetsByBattle = Object.entries(targetsByBattleMap).map(
    ([battleId, targets]) => {
      return {
        battle: BATTLES_MAP[battleId],
        targets,
      }
    },
  )

  return (
    <main className="App">
      {targetsByBattle.map(({ battle, targets }) => (
        <Fragment key={battle.battleId}>
          <h1>{battle.title}</h1>

          <List targets={targets} />
        </Fragment>
      ))}
    </main>
  )
}
