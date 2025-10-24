import * as fs from 'fs'

import { createFolder } from './utils/createFolder'
import * as targetsInfo from 'shared/targetsInfo.json'
import * as targetsMap from 'shared/targets'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

export type TargetInfo = {
  id: number
  name: string
  image: string
  colors: string[]
}

const targetsFolderPath = `${SHARED_FOLDER_PATH}/targets`

function generateTargetFiles() {
  targetsInfo.forEach((target) => {
    const targetFileName = `${target.id}.ts`
    const solution = targetsMap?.[`target${target.id}`]?.solution || ''

    fs.writeFileSync(
      `${targetsFolderPath}/${targetFileName}`,
      getFileContent(target, solution),
    )

    console.log(`${target.name} created`)
  })
}

function getFileContent(target: TargetInfo, solution = '') {
  const parsedName = target.name.replaceAll("'", "\\'")
  const parsedColors = target.colors.map((color) => `'${color}'`).join(', ')

  return (
    `export default {\n` +
    `  id: ${target.id},\n` +
    `  title: 'Target #${target.id} - ${parsedName}',\n` +
    `  url: 'https://cssbattle.dev/play/${target.id}',\n` +
    `  colors: [${parsedColors}],\n` +
    `  solution: '${solution}',\n` +
    `}\n`
  )
}

createFolder({
  path: targetsFolderPath,
  label: 'Targets',
})
generateTargetFiles()
