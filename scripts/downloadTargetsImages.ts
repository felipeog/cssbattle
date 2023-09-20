import * as fs from 'fs'
import axios, { AxiosResponse } from 'axios'

import { createFolder } from 'scripts/utils/createFolder'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const targetsImagesFolderPath = `${SHARED_FOLDER_PATH}/targetsImages`

async function downloadTargetsImages(index = 1) {
  const targetFileName = `${index}.png`
  const targetFilePath = `${targetsImagesFolderPath}/${targetFileName}`

  if (fs.existsSync(targetFilePath)) {
    console.log(`${targetFileName} already downloaded, skipping`)

    return downloadTargetsImages(index + 1)
  }

  try {
    const response = await axios.get(
      `https://cssbattle.dev/targets/${targetFileName}`,
      { responseType: 'arraybuffer' },
    )

    if (response.status === 200) {
      saveTargetImage(targetFileName, response.data)

      return downloadTargetsImages(index + 1)
    }

    throw Error(`downloadTargetsImages: request error`)
  } catch (error) {
    if (error?.response?.status === 404) {
      return console.log(`${targetFileName} not found, end of targets`)
    }

    return console.error(error)
  }
}

function saveTargetImage(targetFileName: string, data: AxiosResponse['data']) {
  const image = Buffer.from(data, 'binary').toString('base64')

  fs.writeFileSync(
    `${SHARED_FOLDER_PATH}/targetsImages/${targetFileName}`,
    image,
    'base64',
  )

  console.log(`${targetFileName} saved`)
}

createFolder({ path: targetsImagesFolderPath, label: 'Images' })
downloadTargetsImages()
