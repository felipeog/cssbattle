import * as fs from 'fs'
import * as path from 'path'

const targetsFolderPath = path.resolve(__dirname, '../src/targets')
const targetsExportFilePath = `${targetsFolderPath}/index.ts`

function generateTargetsExport() {
  if (fs.existsSync(targetsExportFilePath)) {
    console.log('Export file already exists, overwriting...')
  }

  const fileNames = fs.readdirSync(targetsFolderPath)
  const exportFileContent = fileNames.reduce((fileContent, fileName) => {
    const formattedFileName = fileName.replace('.ts', '')

    if (isNaN(Number(formattedFileName))) {
      return fileContent
    }

    return `${fileContent}export { default as target${formattedFileName} } from './${formattedFileName}'\n`
  }, '')

  try {
    fs.writeFileSync(targetsExportFilePath, exportFileContent)

    console.log('Export file created')
  } catch (error) {
    throw Error(`generateTargetsExport: ${error}`)
  }
}

generateTargetsExport()
