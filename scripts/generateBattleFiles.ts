import * as fs from 'fs'

import { createFolder } from './utils/createFolder'
import * as battles from 'shared/battlesInfo.json'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

export type BattleInfo = {
  id: number
  name: string
  description: string
  targets: number[]
}

const battlesFolderPath = `${SHARED_FOLDER_PATH}/battles`

function generateBattleFiles() {
  battles.forEach((battle) => {
    const battleFileName = `${battle.id}.ts`
    const battleFilePath = `${battlesFolderPath}/${battleFileName}`

    if (fs.existsSync(battleFilePath)) {
      return console.log(`${battle.name} already exists, skipping...`)
    }

    console.log(`${battle.name} does not exist`)
    console.log(`Creating ${battle.name}...`)

    fs.writeFileSync(
      `${battlesFolderPath}/${battleFileName}`,
      getFileContent(battle),
    )

    console.log(`${battle.name} created`)
  })
}

function getFileContent(battle: BattleInfo) {
  const parsedName = battle.name.replace("'", "\\'")
  const parsedDescription = battle.description.replace("'", "\\'")

  return (
    `export default {\n` +
    `  id: ${battle.id},\n` +
    `  title: 'Battle #${battle.id} - ${parsedName}',\n` +
    `  desciption: '${parsedDescription}',\n` +
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
