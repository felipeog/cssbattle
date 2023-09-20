import * as fs from 'fs'
import * as path from 'path'

import * as targetsMap from 'shared/targets'

const readmeFolderPath = path.resolve(__dirname, '..')
const readmeFilePath = `${readmeFolderPath}/readme.md`
const readmeHeader =
  `# [CSSBattle](https://cssbattle.dev)\n` +
  `\n` +
  `[@felipeog](https://cssbattle.dev/player/felipeog)\n`

async function generateReadme() {
  if (fs.existsSync(readmeFilePath)) {
    console.log('Readme file already exists, overwriting...')
  }

  try {
    const targets = Object.values(targetsMap)
    const checklistSection = targets
      .map((target) => {
        const isDone = !!target.solution.length
        const formattedTitle = target.title.replace('#', '<span>#</span>')

        return `- [${isDone ? 'x' : ' '}] ${formattedTitle}`
      })
      .join('\n')
    const readmeContent =
      `${readmeHeader}\n` +
      `\n` +
      `## Checklist\n` +
      `\n` +
      `${checklistSection}\n`

    fs.writeFileSync(`${readmeFilePath}`, readmeContent)
  } catch (error) {
    throw Error(`generateReadme: ${error}`)
  }

  console.log('Readme file created')
}

generateReadme()
