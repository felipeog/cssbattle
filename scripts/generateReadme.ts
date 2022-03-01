import * as fs from 'fs'
import * as path from 'path'

import * as targetsMap from '../src/targets'

const readmeHeader =
  `# [CSSBattle](https://cssbattle.dev)\n` +
  `\n` +
  `[@felipeog](https://cssbattle.dev/player/felipeog)\n` +
  `\n` +
  `## Checklist\n`

const readmeFolderPath = path.resolve(__dirname, `../`)
const readmeFilePath = `${readmeFolderPath}/readme.md`

if (fs.existsSync(readmeFilePath)) {
  console.log('Readme file already exists, overwriting...')
}

const targets = Object.values(targetsMap)
const readmeChecklist = targets
  .map((target) => {
    const isDone = !!target.solution.length

    return `- [${isDone ? 'x' : ' '}] ${target.title}`
  })
  .join('\n')
const readmeContent = `${readmeHeader}\n${readmeChecklist}\n`

try {
  fs.writeFileSync(`${readmeFilePath}`, readmeContent)

  console.log(`Readme file created`)
} catch (err) {
  throw Error(`Error creating Readme file: ${err}`)
}
