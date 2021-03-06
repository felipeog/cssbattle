import * as fs from 'fs'

export function deleteFolder({ path, label }: { path: string; label: string }) {
  console.log(`Deleting ${label} folder...`)

  fs.rmSync(path, {
    recursive: true,
    force: true,
  })

  console.log(`${label} folder deleted`)
}
