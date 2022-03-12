import { PNG } from 'pngjs'
import * as fs from 'fs'
import * as path from 'path'
import * as pixelmatch from 'pixelmatch'

import { SOLVED_TARGETS } from '../consts/solvedTargets'
import { TARGET_DIMENSIONS } from '../consts/targetDimensions'

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

describe.each(SOLVED_TARGETS)('$title pixels mismatch', ({ id }) => {
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
