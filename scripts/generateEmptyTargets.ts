import * as fs from 'fs'

import { createFolder } from './utils/createFolder'
import * as targets from 'shared/targetsInfo.json'
import { SHARED_FOLDER_PATH } from 'scripts/consts/sharedFolderPath'

export type TargetInfo = {
  id: number
  name: string
  image: string
}

const targetsFolderPath = `${SHARED_FOLDER_PATH}/targets`

function generateEmptyTargets() {
  targets.forEach((target, index) => {
    const targetFileName = `${String(index + 1).padStart(3, '0')}.ts`
    const targetFilePath = `${targetsFolderPath}/${targetFileName}`

    if (fs.existsSync(targetFilePath)) {
      return console.log(`${target.name} already exists, skipping...`)
    }

    console.log(`${target.name} does not exist`)
    console.log(`Creating ${target.name}...`)

    fs.writeFileSync(
      `${targetsFolderPath}/${targetFileName}`,
      getEmptyTargetContent(target),
    )

    console.log(`${target.name} created`)
  })
}

function getEmptyTargetContent(target: TargetInfo) {
  const targetId = String(target.id).padStart(3, '0')
  const parsedName = target.name.replace("'", "\\'")

  return (
    `export default {\n` +
    `  id: '${targetId}',\n` +
    `  title: 'Target #${target.id} - ${parsedName}',\n` +
    `  url: 'https://cssbattle.dev/play/${target.id}',\n` +
    `  solution: '',\n` +
    `}\n`
  )
}

createFolder({
  path: targetsFolderPath,
  label: 'Targets',
})
generateEmptyTargets()
