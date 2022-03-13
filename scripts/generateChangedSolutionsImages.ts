import { exec } from 'child_process'
import * as path from 'path'

import { SOLVED_TARGETS } from '../src/consts/solvedTargets'
import { clearFolder } from './utils/clearFolder'
import { createFolder } from './utils/createFolder'
import { createSolutionImageFromTarget } from './utils/createSolutionImageFromTarget'

const targetsFolderPath = path.resolve(__dirname, '../src/targets')
const solutionsFolderPath = path.resolve(
  __dirname,
  '../src/tests/solutionsImages',
)

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
    const availableTargets = SOLVED_TARGETS.filter(({ id }) =>
      changedSolutionsIds.includes(id),
    )

    for (let index = 0; index < availableTargets.length; index++) {
      const target = availableTargets[index]

      await createSolutionImageFromTarget(target)
    }
  } catch (error) {
    throw Error(`generateChangedSolutionsImages: ${error}`)
  }
}

clearFolder({ path: solutionsFolderPath, label: 'Solutions' })
createFolder({ path: solutionsFolderPath, label: 'Solutions' })
generateChangedSolutionsImages()
