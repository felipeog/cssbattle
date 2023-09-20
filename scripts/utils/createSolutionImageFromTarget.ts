import * as fs from 'fs'
import htmlToImage from 'node-html-to-image'

import { getHtmlFromSolution } from 'shared/utils/getHtmlFromSolution'
import { Target } from 'shared/types'
import { TARGET_DIMENSIONS } from 'shared/consts/targetDimensions'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const solutionsFolderPath = `${SHARED_FOLDER_PATH}/solutionsImages`

export async function createSolutionImageFromTarget({
  title,
  solution,
  id,
}: Target) {
  console.log(`Creating ${title}...`)

  const solutionFilePath = `${solutionsFolderPath}/${Number(id)}.png`
  const solutionHtml = getHtmlFromSolution(solution)
  const src = `data:text/html,${encodeURIComponent(solutionHtml)}`
  const style = 'background:white;width:400px;height:300px;border:0;outline:0'

  try {
    const image = (await htmlToImage({
      html: `<iframe src="${src}" style="${style}" />`,
      encoding: 'base64',
      puppeteerArgs: {
        defaultViewport: {
          width: TARGET_DIMENSIONS.WIDTH + 16,
          height: TARGET_DIMENSIONS.HEIGHT,
        },
      },
    })) as Buffer

    fs.writeFileSync(solutionFilePath, image, 'base64')
  } catch (error) {
    throw Error(`createSolutionImageFromTarget: ${error}`)
  }

  console.log(`${title} created`)
}
