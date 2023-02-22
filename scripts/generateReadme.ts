import * as fs from 'fs'
import * as path from 'path'

import * as targetsMap from '../src/targets'
import { fetchStatistics } from './utils/fetchStatistics'

const readmeFolderPath = path.resolve(__dirname, '../')
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
    const statistics = await fetchStatistics({ username: 'felipeog' })
    const targets = Object.values(targetsMap)
    const checklistSection = targets
      .map((target) => {
        const isDone = !!target.solution.length
        const formattedTitle = target.title.replace('#', '<span>#</span>')

        return `- [${isDone ? 'x' : ' '}] ${formattedTitle}`
      })
      .join('\n')
    const statisticsSection = statistics
      .map((statistic) => {
        return `- ${statistic.id}: ${statistic.value}`
      })
      .join('\n')
    const readmeContent =
      `${readmeHeader}\n` +
      `## Statistics\n` +
      `\n` +
      `${statisticsSection}\n` +
      `\n` +
      `## Checklist\n` +
      `\n` +
      `${checklistSection}\n`

    fs.writeFileSync(`${readmeFilePath}`, readmeContent)

    console.log('Readme file created')
  } catch (error) {
    throw Error(`generateReadme: ${error}`)
  }
}

generateReadme()
