import { PNG } from 'pngjs'
import * as fs from 'fs'
import * as pixelmatch from 'pixelmatch'

import { TARGET_DIMENSIONS } from 'shared/consts/targetDimensions'

export function getPixelsMismatch(
  currentTargetFileName: string,
  expectedTargetFileName: string,
) {
  const current = PNG.sync.read(fs.readFileSync(currentTargetFileName))
  const expected = PNG.sync.read(fs.readFileSync(expectedTargetFileName))
  const pixelsMismatch = pixelmatch(
    current.data,
    expected.data,
    null,
    TARGET_DIMENSIONS.WIDTH,
    TARGET_DIMENSIONS.HEIGHT,
  )

  return pixelsMismatch
}
