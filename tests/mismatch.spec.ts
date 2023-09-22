import { SOLVED_TARGETS } from 'shared/consts/solvedTargets'
import { TARGET_DIMENSIONS } from 'shared/consts/targetDimensions'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'
import { getPixelsMismatch } from 'shared/utils/getPixelsMismatch'

const maximumPixelsMismatch =
  TARGET_DIMENSIONS.WIDTH * TARGET_DIMENSIONS.HEIGHT * 0.001

describe.each(SOLVED_TARGETS)('$title pixels mismatch', ({ id }) => {
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
