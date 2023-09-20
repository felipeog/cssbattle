import * as path from 'path'

import { SOLVED_TARGETS } from 'shared/consts/solvedTargets'
import { createFolder } from 'scripts/utils/createFolder'
import { createSolutionImageFromTarget } from 'scripts/utils/createSolutionImageFromTarget'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const solutionsFolderPath = `${SHARED_FOLDER_PATH}/solutionsImages`

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
