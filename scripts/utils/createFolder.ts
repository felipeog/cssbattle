import * as fs from 'fs'

export function createFolder({ path, label }: { path: string; label: string }) {
  if (fs.existsSync(path)) {
    return console.log(`${label} folder already exists`)
  }

  console.log(`Creating ${label} folder...`)

  fs.mkdirSync(path, {
    recursive: true,
  })

  console.log(`${label} folder created`)
}
