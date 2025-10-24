import * as fs from 'fs'

import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'
import * as targets from 'shared/targetsInfo.json'

type Target = {
  id: number
  name: string
  image: string
}

async function scrapeTargetsInformation(
  index: number = 1,
  targets: Target[] = [],
) {
  console.log(index)

  const response = await fetch(`https://cssbattle.dev/play/${index}`)
  const text = await response.text()
  const matches = [
    text.match(/"id":.+?,/g),
    text.match(/"name":.+?,/g),
    text.match(/"image":.+?,/g),
    text.match(/"colors":.+?}/g),
  ]

  if (matches.some((match) => !match)) {
    fs.writeFileSync(
      `${SHARED_FOLDER_PATH}/targetsInfo.json`,
      JSON.stringify(targets, null, 2),
      'utf-8',
    )

    return console.log('end')
  }

  const targetJsonString = matches.reduce((previous, current, index, array) => {
    const isLast = index + 1 === array.length
    const next = current![0]

    if (isLast) {
      const nextWithoutFlag = next.slice(0, -1)

      return previous + nextWithoutFlag + '}'
    }

    return previous + next
  }, '{')

  const target = JSON.parse(targetJsonString)
  const newTargets = [...targets, target]

  scrapeTargetsInformation(index + 1, newTargets)
}

scrapeTargetsInformation(targets.length + 1, targets)
