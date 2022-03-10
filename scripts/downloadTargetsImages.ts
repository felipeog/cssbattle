import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'

const targetsImagesFolderPath = path.resolve(
  __dirname,
  '../src/tests/targetsImages',
)

function createTargetsImagesFolder() {
  if (fs.existsSync(targetsImagesFolderPath)) {
    console.log('Images folder already exists')
  } else {
    console.log('Images folder does not exist')
    console.log('Creating images folder...')

    try {
      fs.mkdirSync(targetsImagesFolderPath, { recursive: true })

      console.log('Images folder created')
    } catch (error) {
      throw Error(`Error creating Images folder: ${error}`)
    }
  }
}

async function downloadTargetImage(targetFileName: string) {
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

    console.log(`${targetFileName} downloaded successfully`)
  } catch (error) {
    throw Error(`Axios error: ${error}`)
  }
}

async function downloadTargetsImages() {
  for (let index = 1; index <= 100; index++) {
    const targetFileName = `${index}.png`
    const targetFilePath = `${targetsImagesFolderPath}/${targetFileName}`

    if (fs.existsSync(targetFilePath)) {
      console.log(`${targetFileName} already exists, skipping...`)
    } else {
      try {
        console.log(`${targetFileName} does not exist`)
        console.log(`Downloading ${targetFileName}...`)

        await downloadTargetImage(targetFileName)
      } catch (error) {
        throw Error(`Error downloading ${targetFileName}: ${error}`)
      }
    }
  }
}

createTargetsImagesFolder()
downloadTargetsImages()