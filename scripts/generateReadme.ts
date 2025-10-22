import * as fs from 'fs'
import * as path from 'path'

import * as battlesMap from 'shared/battles'
import * as targetsMap from 'shared/targets'

const battles = Object.values(battlesMap)
const targets = Object.values(targetsMap)

const totalCount = targets.length
const solvedCount = targets.reduce(
  (sum, target) => (Boolean(target.solution.length) ? sum + 1 : sum),
  0,
)

const readmeFolderPath = path.resolve(__dirname, '..')
const readmeFilePath = `${readmeFolderPath}/readme.md`

// TODO: improve each section creation
async function generateReadme() {
  if (fs.existsSync(readmeFilePath)) {
    console.log('Readme file already exists, overwriting...')
  }

  const headerSection =
    `# [CSSBattle](https://cssbattle.dev)\n` +
    `\n` +
    `[@felipeog](https://cssbattle.dev/player/felipeog)\n`
  const checklistSection = battles
    .map((battle) => {
      const formattedTitle = battle.title.replace('#', '<span>#</span>')
      const targetsList = battle.targets
        .map((targetId) => {
          const target = targetsMap[`target${targetId}`]
          const isDone = Boolean(target.solution.length)
          const formattedTitle = target.title.replace('#', '<span>#</span>')

          return `| ${
            isDone ? '✅' : '❌'
          } | ${formattedTitle} | [Solution](./shared/targets/${
            target.id
          }.ts) | [Preview](https://felipeog-cssbattle.netlify.app#${
            target.id
          }) |`
        })
        .join('\n')

      return `\n**${formattedTitle}**\n\n${battle.desciption}\n\n| Complete | Target | Solution | Preview |\n| --- | --- | --- | --- |\n${targetsList}`
    })
    .join('\n')
  const readmeContent =
    `${headerSection}\n` +
    `## Checklist (${solvedCount}/${totalCount})\n` +
    `${checklistSection}\n`

  fs.writeFileSync(`${readmeFilePath}`, readmeContent)

  console.log('Readme file created')
}

generateReadme()
