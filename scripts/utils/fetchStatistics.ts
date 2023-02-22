import puppeteer from 'puppeteer'

export async function fetchStatistics({ username }: { username: string }) {
  try {
    console.log(`Fetching ${username} statistics...`)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(`https://cssbattle.dev/player/${username}`)
    await page.waitForSelector('.global-stats', { timeout: 5_000 })

    const statistics = await page.evaluate(() => {
      const statisticElements = document.querySelectorAll('.global-stats__item')
      const statistics = Array.from(statisticElements).map(
        (statisticElement) => {
          const idElement = statisticElement.querySelector(
            '.global-stats__item__id',
          )
          const valueElement = statisticElement.querySelector(
            '.global-stats__item__value',
          )

          return {
            id: idElement?.textContent,
            value: valueElement?.textContent,
          }
        },
      )

      return statistics
    })

    await browser.close()

    console.log(`${username} statistics fetched`)

    return statistics
  } catch (error) {
    throw Error(`fetchStatistics: ${error}`)
  }
}
