import * as fs from 'fs'
import * as path from 'path'

import * as targetsMap from 'shared/targets'

const targets = Object.values(targetsMap)
const totalCount = targets.length
const solvedCount = targets.reduce(
  (sum, target) => (Boolean(target.solution.length) ? sum + 1 : sum),
  0,
)
const readmeFolderPath = path.resolve(__dirname, '..')
const readmeFilePath = `${readmeFolderPath}/readme.md`

async function generateReadme() {
  if (fs.existsSync(readmeFilePath)) {
    console.log('Readme file already exists, overwriting...')
  }

  const headerSection =
    `# [CSSBattle](https://cssbattle.dev)\n` +
    `\n` +
    `[@felipeog](https://cssbattle.dev/player/felipeog)\n`
  const checklistSection = targets
    .map((target) => {
      const isDone = Boolean(target.solution.length)
      const formattedTitle = target.title.replace('#', '<span>#</span>')

      return `- [${
        isDone ? 'x' : ' '
      }] ${formattedTitle} | [Solution](./shared/targets/${
        target.id
      }.ts) | [Preview](https://felipeog-cssbattle.netlify.app#${target.id})`
    })
    .join('\n')
  const readmeContent =
    `${headerSection}\n` +
    `## Checklist (${solvedCount}/${totalCount})\n` +
    `\n` +
    `${checklistSection}\n`

  fs.writeFileSync(`${readmeFilePath}`, readmeContent)

  console.log('Readme file created')
}

generateReadme()
