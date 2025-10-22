import * as fs from 'fs'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const targetsFolderPath = `${SHARED_FOLDER_PATH}/targets`
const targetsExportFilePath = `${targetsFolderPath}/index.ts`

const numericCollator = new Intl.Collator(undefined, { numeric: true })

function generateTargetExports() {
  if (fs.existsSync(targetsExportFilePath)) {
    console.log('Export file already exists, overwriting...')
  }

  const fileNames = fs
    .readdirSync(targetsFolderPath)
    .sort(numericCollator.compare)
  const exportFileContent = fileNames.reduce((fileContent, fileName) => {
    const formattedFileName = fileName.replace('.ts', '')

    if (isNaN(Number(formattedFileName))) {
      return fileContent
    }

    return `${fileContent}export { default as target${formattedFileName} } from './${formattedFileName}'\n`
  }, '')

  try {
    fs.writeFileSync(targetsExportFilePath, exportFileContent)
  } catch (error) {
    throw Error(`generateTargetExports: ${error}`)
  }

  console.log('Export file created')
}

generateTargetExports()
