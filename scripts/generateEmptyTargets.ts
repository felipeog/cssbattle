import * as fs from 'fs'
import * as path from 'path'

import { createFolder } from './utils/createFolder'
import * as targets from '../shared/targets.json'

const targetsFolderPath = path.resolve(__dirname, '../src/targets')

function getEmptyTargetContent(target: string, index: number) {
  const targetId = String(index).padStart(3, '0')
  const parsedName = target.replace("'", "\\'")

  return (
    `export default {\n` +
    `  id: '${targetId}',\n` +
    `  title: 'Target #${index} - ${parsedName}',\n` +
    `  url: 'https://cssbattle.dev/play/${index}',\n` +
    `  solution: '',\n` +
    `}\n`
  )
}

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
      getEmptyTargetContent(target.name, index + 1),
    )

    console.log(`${target.name} created`)
  })
}

createFolder({
  path: targetsFolderPath,
  label: 'Targets',
})
generateEmptyTargets()
