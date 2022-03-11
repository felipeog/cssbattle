import * as fs from 'fs'
import * as path from 'path'

const targetsFolderPath = path.resolve(__dirname, '../src/targets')
const targetsExportFilePath = `${targetsFolderPath}/index.ts`

function generateTargetsExport() {
  if (fs.existsSync(targetsExportFilePath)) {
    console.log('Export file already exists, overwriting...')
  }

  const fileNames = fs.readdirSync(targetsFolderPath)
  const formattedFileNames = fileNames
    .map((fileName) => fileName.replace('.ts', ''))
    .filter((fileName) => !isNaN(Number(fileName)))
  const exportFileContent = formattedFileNames
    .map((fileName) => {
      return `export { default as target${fileName} } from './${fileName}'\n`
    })
    .join('')

  try {
    fs.writeFileSync(targetsExportFilePath, exportFileContent)

    console.log('Export file created')
  } catch (error) {
    throw Error(`generateTargetsExport: ${error}`)
  }
}

generateTargetsExport()
