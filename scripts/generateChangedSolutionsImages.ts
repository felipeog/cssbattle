import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import htmlToImage from 'node-html-to-image'

import { getHtmlFromSolution } from '../src/utils/getHtmlFromSolution'
import { SOLVED_TARGETS } from '../src/consts/solvedTargets'
import { Target } from '../src/types'
import { TARGET_DIMENSIONS } from '../src/consts/targetDimensions'

const targetsFolderPath = path.resolve(__dirname, '../src/targets')
const solutionsFolderPath = path.resolve(
  __dirname,
  '../src/tests/solutionsImages',
)

function createSolutionsImagesFolder() {
  if (fs.existsSync(solutionsFolderPath)) {
    return console.log('Solutions folder already exists')
  }

  console.log('Solutions folder does not exist')
  console.log('Creating solutions folder...')

  fs.mkdirSync(solutionsFolderPath, { recursive: true })

  console.log('Solutions folder created')
}

function cleanSolutionsImagesFolder() {
  const fileNames = fs.readdirSync(solutionsFolderPath)

  if (!fileNames?.length) {
    return console.log('Solutions folder is clean, skipping...')
  }

  fileNames.forEach((fileName) => {
    console.log(`Removing ${fileName}...`)

    fs.rmSync(`${solutionsFolderPath}/${fileName}`)

    console.log(`${fileName} removed`)
  })
}

async function createSolutionImageFromTarget({ title, solution, id }: Target) {
  const solutionFilePath = `${solutionsFolderPath}/${Number(id)}.png`
  const solutionHtml = getHtmlFromSolution(solution)
  const src = `data:text/html,${encodeURIComponent(solutionHtml)}`
  const style = 'background:white;width:400px;height:300px;border:0;outline:0'

  console.log(`Creating ${title}...`)

  try {
    const image = (await htmlToImage({
      html: `<iframe src="${src}" style="${style}" />`,
      encoding: 'base64',
      puppeteerArgs: {
        defaultViewport: {
          width: TARGET_DIMENSIONS.WIDTH + 16,
          height: TARGET_DIMENSIONS.HEIGHT,
        },
      },
    })) as Buffer

    fs.writeFileSync(solutionFilePath, image, 'base64')

    console.log(`${title} created`)
  } catch (error) {
    throw Error(`createSolutionImageFromTarget: ${error}`)
  }
}

function getChangedSolutionsIds(): Promise<string[]> {
  const validStatuses = ['M', 'A', '?']

  return new Promise((resolve, reject) => {
    exec(
      `git status --porcelain ${targetsFolderPath}`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(`getChangedSolutionsIds: ${error || stderr}`)
        }

        const changedFiles = stdout
          .split('\n')
          .filter((statusRow) => validStatuses.includes(statusRow.charAt(1)))
          .map((statusRow) => statusRow.slice(15, 18))

        resolve(changedFiles ?? [])
      },
    )
  })
}

async function generateChangedSolutionsImages() {
  try {
    const changedSolutionsIds = await getChangedSolutionsIds()
    const changedSolutions = SOLVED_TARGETS.filter(({ id }) =>
      changedSolutionsIds.includes(id),
    )

    for (let index = 0; index < changedSolutions.length; index++) {
      const target = changedSolutions[index]

      await createSolutionImageFromTarget(target)
    }
  } catch (error) {
    throw Error(`generateChangedSolutionsImages: ${error}`)
  }
}

createSolutionsImagesFolder()
cleanSolutionsImagesFolder()
generateChangedSolutionsImages()
