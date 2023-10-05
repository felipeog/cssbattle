import * as fs from 'fs'
import axios from 'axios'

import { createFolder } from 'scripts/utils/createFolder'
import { SHARED_FOLDER_PATH } from 'scripts/consts/sharedFolderPath'
import * as targets from 'shared/targetsInfo.json'

const targetsImagesFolderPath = `${SHARED_FOLDER_PATH}/targetsImages`

async function downloadTargetsImages() {
  for (let index = 0; index < targets.length; index++) {
    const target = targets[index]
    const targetFileName = target.image.split('/')[2]
    const targetFilePath = `${targetsImagesFolderPath}/${targetFileName}`

    if (fs.existsSync(targetFilePath)) {
      console.log(`${targetFileName} already downloaded, skipping`)

      continue
    }

    try {
      console.log(`Downloading ${targetFileName}...`)

      const response = await axios.get(
        `https://cssbattle.dev/targets/${targetFileName}`,
        { responseType: 'arraybuffer' },
      )
      const image = Buffer.from(response.data, 'binary').toString('base64')

      fs.writeFileSync(
        `${SHARED_FOLDER_PATH}/targetsImages/${targetFileName}`,
        image,
        'base64',
      )

      console.log(`${targetFileName} downloaded`)
    } catch (error) {
      console.error(error)
    }
  }
}

createFolder({ path: targetsImagesFolderPath, label: 'Images' })
downloadTargetsImages()
