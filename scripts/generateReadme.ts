import * as fs from 'fs'
import * as path from 'path'
import puppeteer from 'puppeteer'

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

  try {
    const stats = await scrapeUserStats()
    const headerSection =
      `# [CSSBattle](https://cssbattle.dev)\n` +
      `\n` +
      `- Profile: [@felipeog](https://cssbattle.dev/player/felipeog)\n` +
      stats.reduce(
        (previous, current) =>
          `${previous}- ${current.label}: ${current.value}\n`,
        '',
      )
    const checklistSection = targets
      .map((target) => {
        const isDone = Boolean(target.solution.length)
        const formattedTitle = target.title.replace('#', '<span>#</span>')

        return `- [${
          isDone ? 'x' : ' '
        }] [${formattedTitle}](./shared/targets/${target.id}.ts)`
      })
      .join('\n')
    const readmeContent =
      `${headerSection}\n` +
      `## Checklist (${solvedCount}/${totalCount})\n` +
      `\n` +
      `${checklistSection}\n`

    fs.writeFileSync(`${readmeFilePath}`, readmeContent)
  } catch (error) {
    throw Error(`generateReadme: ${error}`)
  }

  console.log('Readme file created')
}

async function scrapeUserStats() {
  console.log('Scraping user stats...')

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  const statsSelector =
    '#__next > div.page-wrapper > div.content-wrapper > div.page-content.false > div > div:nth-child(1) > div.hstack.hstack--responsive > div:nth-child(1) > div > div > div:nth-child(2) [class^=Panel_panel]'

  await page.goto('https://cssbattle.dev/player/felipeog')
  await page.waitForSelector(statsSelector)

  const stats = await page.evaluate(() => {
    const battleStatCards = document.querySelectorAll(statsSelector)

    return Array.from(battleStatCards).map((card) => {
      const [valueSpan, labelSpan] = card.querySelectorAll('span')

      return {
        label: labelSpan.textContent,
        value: valueSpan.textContent,
      }
    })
  })

  await browser.close()

  console.log('Stats: ', stats)

  return stats
}

generateReadme()
