import * as fs from 'fs'
import * as path from 'path'
import { PNG } from 'pngjs'
import * as pixelmatch from 'pixelmatch'
import htmlToImage from 'node-html-to-image'

import * as targetsMap from '../targets'
import { TARGET_DIMENSIONS } from '../consts/targetDimensions'
import { getHtmlFromSolution } from '../utils/getHtmlFromSolution'

const allTargets = Object.values(targetsMap)
const solvedTargets = allTargets.filter((target) => !!target.solution)
const maximumPixelsMismatch =
  TARGET_DIMENSIONS.WIDTH * TARGET_DIMENSIONS.HEIGHT * 0.001

async function createSolutionImage(solution: string) {
  const solutionHtml = getHtmlFromSolution(solution)
  const src = `data:text/html,${encodeURIComponent(solutionHtml)}`
  const style = 'background:white;width:400px;height:300px;border:0;outline:0'

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

    fs.writeFileSync(path.resolve(__dirname, './solution.png'), image, 'base64')
  } catch (error) {
    throw Error(`createSolutionImage: ${error}`)
  }
}

function getPixelsMismatch(fileName: string) {
  const solution = PNG.sync.read(
    fs.readFileSync(path.resolve(__dirname, './solution.png')),
  )
  const target = PNG.sync.read(
    fs.readFileSync(path.resolve(__dirname, `./targetsImages/${fileName}`)),
  )
  const pixelsMismatch = pixelmatch(
    solution.data,
    target.data,
    null,
    TARGET_DIMENSIONS.WIDTH,
    TARGET_DIMENSIONS.HEIGHT,
  )

  return pixelsMismatch
}

describe(`pixels mismatch shoul be less than ${maximumPixelsMismatch}`, () => {
  it.each(solvedTargets)('$id', async ({ id, solution }) => {
    expect.hasAssertions()

    await createSolutionImage(solution)

    const index = Number(id)
    const fileName = `${index}.png`
    const pixelsMismatch = getPixelsMismatch(fileName)

    expect(pixelsMismatch).toBeLessThan(maximumPixelsMismatch)
  })
})
