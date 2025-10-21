import * as fs from 'fs'
import * as cheerio from 'cheerio'

import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'

const SELECTOR_MAP = {
  NAME: 'a:nth-child(2) span',
  DESCRIPTION: 'span:nth-child(3)',
  TARGET_NUMBER: '[class^=BattleTile_BattleTile_target] > div > p:nth-child(1)',
}

async function scrapeBattlesInformation() {
  const $ = await cheerio.fromURL('https://cssbattle.dev/battles')
  const $cards = $('[class^=Panel_panel] > .hstack.hstack--responsive')
  const battles = []

  console.log(`Found ${$cards.length} battles`)

  $cards.each((_, card) => {
    const $card = $(card)
    const splitName = $card.find(SELECTOR_MAP.NAME).text().trim().split(' - ')
    const id = Number(splitName[0].replace(/\D*/g, ''))
    const name = splitName[1]
    const description = $card.find(SELECTOR_MAP.DESCRIPTION).text().trim()
    const targets = []

    $card.find(SELECTOR_MAP.TARGET_NUMBER).each((_, target) => {
      const $target = $(target)
      const number = Number($target.text().trim().replace('#', ''))

      targets.push(number)
    })

    console.log(`${id} - Found ${targets.length} targets`)

    battles.push({ id, name, description, targets })
  })

  battles.sort((a, b) => a.id - b.id)

  fs.writeFileSync(
    `${SHARED_FOLDER_PATH}/battlesInfo.json`,
    JSON.stringify(battles, null, 2),
    'utf-8',
  )
}

scrapeBattlesInformation()
