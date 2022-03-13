import { PNG } from 'pngjs'
import * as fs from 'fs'
import * as path from 'path'
import * as pixelmatch from 'pixelmatch'

import { SOLVED_TARGETS } from '../consts/solvedTargets'
import { TARGET_DIMENSIONS } from '../consts/targetDimensions'

const solutionsImagesFolderPath = path.resolve(__dirname, './solutionsImages')
const maximumPixelsMismatch =
  TARGET_DIMENSIONS.WIDTH * TARGET_DIMENSIONS.HEIGHT * 0.001

function getPngFile(filePath: string) {
  return PNG.sync.read(fs.readFileSync(filePath))
}

function getPixelsMismatch(
  currentTargetFileName: string,
  expectedTargetFileName: string,
) {
  const current = getPngFile(currentTargetFileName)
  const expected = getPngFile(expectedTargetFileName)
  const pixelsMismatch = pixelmatch(
    current.data,
    expected.data,
    null,
    TARGET_DIMENSIONS.WIDTH,
    TARGET_DIMENSIONS.HEIGHT,
  )

  return pixelsMismatch
}

function getChangedSolutions() {
  const solutionsIds = fs
    .readdirSync(solutionsImagesFolderPath)
    .map((solutionFileName) =>
      solutionFileName.replace('.png', '').padStart(3, '0'),
    )
  const changedSolutions = SOLVED_TARGETS.filter(({ id }) =>
    solutionsIds.includes(id),
  )

  return changedSolutions
}

describe.each(getChangedSolutions())('$title pixels mismatch', ({ id }) => {
  const fileName = `${Number(id)}.png`
  const pixelsMismatch = getPixelsMismatch(
    path.resolve(__dirname, `./targetsImages/${fileName}`),
    path.resolve(__dirname, `./solutionsImages/${fileName}`),
  )

  it(`${pixelsMismatch} should be less than ${maximumPixelsMismatch}`, () => {
    expect.hasAssertions()
    expect(pixelsMismatch).toBeLessThan(maximumPixelsMismatch)
  })
})
