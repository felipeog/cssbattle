import * as path from 'path'

import { SOLVED_TARGETS } from '../src/consts/solvedTargets'
import { createFolder } from './utils/createFolder'
import { createSolutionImageFromTarget } from './utils/createSolutionImageFromTarget'

const solutionsFolderPath = path.resolve(
  __dirname,
  '../src/tests/solutionsImages',
)

async function generateAllSolutionsImages() {
  console.log('Generating all Solutions')

  for (let index = 0; index < SOLVED_TARGETS.length; index++) {
    const target = SOLVED_TARGETS[index]

    try {
      await createSolutionImageFromTarget(target)
    } catch (error) {
      throw Error(`generateAllSolutionsImages: ${error}`)
    }
  }

  console.log('All Solutions generated')
}

createFolder({
  path: solutionsFolderPath,
  label: 'Solutions',
})
generateAllSolutionsImages()
