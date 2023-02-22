import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'

import { createFolder } from './utils/createFolder'

const targetsImagesFolderPath = path.resolve(
  __dirname,
  '../src/tests/targetsImages',
)

async function downloadTargetImage(targetFileName: string) {
  console.log(`Downloading ${targetFileName}...`)

  try {
    const { data } = await axios.get(
      `https://cssbattle.dev/targets/${targetFileName}`,
      { responseType: 'arraybuffer' },
    )
    const image = Buffer.from(data, 'binary').toString('base64')

    fs.writeFileSync(
      path.resolve(__dirname, `../src/tests/targetsImages/${targetFileName}`),
      image,
      'base64',
    )
  } catch (error) {
    throw Error(`downloadTargetImage(${targetFileName}): ${error}`)
  }

  console.log(`${targetFileName} downloaded successfully`)
}

async function downloadTargetsImages() {
  for (let index = 1; index <= 100; index++) {
    const targetFileName = `${index}.png`
    const targetFilePath = `${targetsImagesFolderPath}/${targetFileName}`

    if (fs.existsSync(targetFilePath)) {
      console.log(`${targetFileName} already exists, skipping...`)

      continue
    }

    try {
      console.log(`${targetFileName} does not exist`)

      await downloadTargetImage(targetFileName)
    } catch (error) {
      throw Error(`downloadTargetsImages: ${error}`)
    }
  }
}

createFolder({
  path: targetsImagesFolderPath,
  label: 'Images',
})
downloadTargetsImages()
