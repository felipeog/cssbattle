import * as fs from 'fs'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const battlesFolderPath = `${SHARED_FOLDER_PATH}/battles`
const battlesExportFilePath = `${battlesFolderPath}/index.ts`

const numericCollator = new Intl.Collator(undefined, { numeric: true })

function generateBattleExports() {
  if (fs.existsSync(battlesExportFilePath)) {
    console.log('Export file already exists, overwriting...')
  }

  const fileNames = fs
    .readdirSync(battlesFolderPath)
    .sort(numericCollator.compare)
  const exportFileContent = fileNames.reduce((fileContent, fileName) => {
    const formattedFileName = fileName.replace('.ts', '')

    if (isNaN(Number(formattedFileName))) {
      return fileContent
    }

    return `${fileContent}export { default as battle${formattedFileName} } from './${formattedFileName}'\n`
  }, '')

  try {
    fs.writeFileSync(battlesExportFilePath, exportFileContent)
  } catch (error) {
    throw Error(`generateBattleExports: ${error}`)
  }

  console.log('Export file created')
}

generateBattleExports()
