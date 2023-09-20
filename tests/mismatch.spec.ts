import { PNG } from 'pngjs'
import * as fs from 'fs'
import * as pixelmatch from 'pixelmatch'

import { SOLVED_TARGETS } from 'shared/consts/solvedTargets'
import { TARGET_DIMENSIONS } from 'shared/consts/targetDimensions'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const solutionsImagesFolderPath = `${SHARED_FOLDER_PATH}/solutionsImages`
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

function getTargetsToTest() {
  const solutionsIds = fs
    .readdirSync(solutionsImagesFolderPath)
    .map((solutionImageFileName) =>
      solutionImageFileName.replace('.png', '').padStart(3, '0'),
    )
  const targetsToTest = SOLVED_TARGETS.filter(({ id }) =>
    solutionsIds.includes(id),
  )

  return targetsToTest
}

describe.each(getTargetsToTest())('$title pixels mismatch', ({ id }) => {
  const fileName = `${Number(id)}.png`
  const pixelsMismatch = getPixelsMismatch(
    `${SHARED_FOLDER_PATH}/targetsImages/${fileName}`,
    `${SHARED_FOLDER_PATH}/solutionsImages/${fileName}`,
  )

  it(`${pixelsMismatch} should be less than ${maximumPixelsMismatch}`, () => {
    expect.hasAssertions()
    expect(pixelsMismatch).toBeLessThan(maximumPixelsMismatch)
  })
})
