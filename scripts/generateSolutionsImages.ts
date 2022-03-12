import * as fs from 'fs'
import * as path from 'path'
import htmlToImage from 'node-html-to-image'

import { getHtmlFromSolution } from '../src/utils/getHtmlFromSolution'
import { SOLVED_TARGETS } from '../src/consts/solvedTargets'
import { Target } from '../src/types'
import { TARGET_DIMENSIONS } from '../src/consts/targetDimensions'

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

async function generateSolutionsImages() {
  for (let index = 0; index < SOLVED_TARGETS.length; index++) {
    const target = SOLVED_TARGETS[index]

    try {
      await createSolutionImageFromTarget(target)
    } catch (error) {
      throw Error(`generateSolutionsImages: ${error}`)
    }
  }
}

createSolutionsImagesFolder()
generateSolutionsImages()
