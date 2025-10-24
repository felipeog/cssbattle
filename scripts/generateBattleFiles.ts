import * as fs from 'fs'

import { createFolder } from './utils/createFolder'
import * as battlesInfo from 'shared/battlesInfo.json'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

export type BattleInfo = {
  id: number
  name: string
  description: string
  targets: number[]
}

const battlesFolderPath = `${SHARED_FOLDER_PATH}/battles`

function generateBattleFiles() {
  battlesInfo.forEach((battle) => {
    const battleFileName = `${battle.id}.ts`

    console.log(`Creating ${battle.name}...`)

    fs.writeFileSync(
      `${battlesFolderPath}/${battleFileName}`,
      getFileContent(battle),
    )

    console.log(`${battle.name} created`)
  })
}

function getFileContent(battle: BattleInfo) {
  const parsedName = battle.name.replaceAll("'", "\\'")
  const parsedDescription = battle.description.replaceAll("'", "\\'")

  return (
    `export default {\n` +
    `  id: ${battle.id},\n` +
    `  title: 'Battle #${battle.id} - ${parsedName}',\n` +
    `  description: '${parsedDescription}',\n` +
    `  url: 'https://cssbattle.dev/battle/${battle.id}',\n` +
    `  targets: [${battle.targets.join(', ')}],\n` +
    `}\n`
  )
}

createFolder({
  path: battlesFolderPath,
  label: 'Battles',
})
generateBattleFiles()
