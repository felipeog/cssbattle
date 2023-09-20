import { exec } from 'child_process'

import { SOLVED_TARGETS } from 'shared/consts/solvedTargets'
import { deleteFolder } from 'scripts/utils/deleteFolder'
import { createFolder } from 'scripts/utils/createFolder'
import { createSolutionImageFromTarget } from 'scripts/utils/createSolutionImageFromTarget'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const targetsFolderPath = `${SHARED_FOLDER_PATH}/targets`
const solutionsFolderPath = `${SHARED_FOLDER_PATH}/solutionsImages`

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
  console.log('Generating changed Solutions')

  try {
    const changedSolutionsIds = await getChangedSolutionsIds()
    const targetsToGenerate = SOLVED_TARGETS.filter(({ id }) =>
      changedSolutionsIds.includes(id),
    )

    if (!targetsToGenerate.length) {
      return console.log('No changed Solutions found')
    }

    for (let index = 0; index < targetsToGenerate.length; index++) {
      const target = targetsToGenerate[index]

      await createSolutionImageFromTarget(target)
    }
  } catch (error) {
    throw Error(`generateChangedSolutionsImages: ${error}`)
  }

  console.log('Changed Solutions generated')
}

deleteFolder({
  path: solutionsFolderPath,
  label: 'Solutions',
})
createFolder({
  path: solutionsFolderPath,
  label: 'Solutions',
})
generateChangedSolutionsImages()
