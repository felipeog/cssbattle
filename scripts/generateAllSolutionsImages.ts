import htmlToImage from 'node-html-to-image'

import { getHtmlFromSolution } from 'shared/utils/getHtmlFromSolution'
import { TARGET_DIMENSIONS } from 'shared/consts/targetDimensions'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'
import { SOLVED_TARGETS } from 'shared/consts/solvedTargets'
import { createFolder } from './utils/createFolder'

const solutionsFolderPath = `${SHARED_FOLDER_PATH}/solutionsImages`

export async function generateAllSolutionsImages() {
  console.log('Generating all Solutions')

  const iframes = SOLVED_TARGETS.map((target) => {
    const solutionHtml = getHtmlFromSolution(target.solution)
    const src = `data:text/html,${encodeURIComponent(solutionHtml)}`
    const style = 'background:white;width:400px;height:300px;border:0;outline:0'
    const output = `${solutionsFolderPath}/${Number(target.id)}.png`

    return {
      src,
      style,
      output,
    }
  })

  try {
    await htmlToImage({
      html: '<iframe src="{{ src }}" style="{{ style }}" />',
      content: iframes,
      puppeteerArgs: {
        defaultViewport: {
          width: TARGET_DIMENSIONS.WIDTH + 16,
          height: TARGET_DIMENSIONS.HEIGHT,
        },
      },
    })

    console.log('All Solutions generated')
  } catch (error) {
    throw Error(`generateAllSolutionsImages: ${error}`)
  }
}

createFolder({
  path: solutionsFolderPath,
  label: 'Solutions',
})
generateAllSolutionsImages()
