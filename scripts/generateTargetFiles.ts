import * as fs from 'fs'

import { createFolder } from './utils/createFolder'
import * as targets from 'shared/targetsInfo.json'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

export type TargetInfo = {
  id: number
  name: string
  image: string
}

const targetsFolderPath = `${SHARED_FOLDER_PATH}/targets`

function generateTargetFiles() {
  targets.forEach((target) => {
    const targetFileName = `${target.id}.ts`
    const targetFilePath = `${targetsFolderPath}/${targetFileName}`

    if (fs.existsSync(targetFilePath)) {
      return console.log(`${target.name} already exists, skipping...`)
    }

    console.log(`${target.name} does not exist`)
    console.log(`Creating ${target.name}...`)

    fs.writeFileSync(
      `${targetsFolderPath}/${targetFileName}`,
      getFileContent(target),
    )

    console.log(`${target.name} created`)
  })
}

function getFileContent(target: TargetInfo) {
  const parsedName = target.name.replace("'", "\\'")

  return (
    `export default {\n` +
    `  id: ${target.id},\n` +
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
generateTargetFiles()
