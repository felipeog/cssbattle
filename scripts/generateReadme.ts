import * as fs from 'fs'
import * as path from 'path'

import * as targetsMap from '../src/targets'

const readmeFolderPath = path.resolve(__dirname, '../')
const readmeFilePath = `${readmeFolderPath}/readme.md`
const readmeHeader =
  `# [CSSBattle](https://cssbattle.dev)\n` +
  `\n` +
  `[@felipeog](https://cssbattle.dev/player/felipeog)\n` +
  `\n` +
  `## Checklist\n`

function generateReadme() {
  if (fs.existsSync(readmeFilePath)) {
    console.log('Readme file already exists, overwriting...')
  }

  const targets = Object.values(targetsMap)
  const readmeChecklist = targets
    .map((target) => {
      const isDone = !!target.solution.length
      const formattedTitle = target.title.replace('#', '<span>#</span>')

      return `- [${isDone ? 'x' : ' '}] ${formattedTitle}`
    })
    .join('\n')
  const readmeContent = `${readmeHeader}\n${readmeChecklist}\n`

  fs.writeFileSync(`${readmeFilePath}`, readmeContent)

  console.log('Readme file created')
}

generateReadme()
