import * as fs from 'fs'
import * as path from 'path'

const targets = [
  // battle 1
  'Simply Square',
  'Carrom',
  'Push Button',
  'Ups n Downs',
  'Acid Rain',
  'Missing Slice',
  'Leafy Trail',
  'Forking Crazy',
  'Tesseract',
  'Cloaked Spirits',
  'Eye of Sauron',
  'Wiggly Moustache',
  // battle 2
  'Totally Triangle',
  'Web Maker Logo',
  'Overlap',
  'Eye of the Tiger',
  'Fidget Spinner',
  'Matrix',
  // battle 3
  'Cube',
  'Ticket',
  // battle 4
  'SitePoint Logo',
  'Cloud',
  'Boxception',
  'Switches',
  'Blossom',
  'Smiley',
  'Lock Up',
  'Cups & Balls',
  // battle 5
  'Suffocate',
  'Horizon',
  // battle 6
  'Equals',
  'Band-aid',
  // battle 7
  'Birdie',
  'Christmas Tree',
  'Ice Cream',
  'Interleaved',
  'Tunnel',
  'Not Simply Square',
  'Sunset',
  'Letter B',
  'Fox Head',
  // battle 8
  'Baby',
  'Wrench',
  'Stripes',
  // battle 9
  'Magical Tree',
  'Mountains',
  // battle 10
  'Corona Virus',
  'Wash Your Hands',
  'Stay at Home',
  'Use Hand Sanitizer',
  'Wear a Mask',
  'Break the Chain',
  // battle 11
  'Pastel Logo',
  'Black Lives Matter',
  'Windmill',
  'Skull',
  'Pillars',
  'Rose',
  'Earth',
  'Evil Triangles',
  // battle 12
  'ImprovMX',
  'Sunset',
  'Command Key',
  'Door Knob',
  'Max Volume',
  'Batmicky',
  'Video Reel',
  'Bell',
  // battle 13
  'PushOwl',
  'Froggy',
  'Elephant',
  'Sheep',
  'Happy Tiger',
  'Danger Noodle',
  'Hippo',
  'Beeee',
  // battle 14
  'Notes',
  'Ukulele',
  'Tambourine',
  'Piano',
  // battle 15
  'Odoo',
  'Diamond Cut',
  'Supernova',
  'Junction',
  'Pythagoras',
  'Stairway',
  'Building Blocks',
  'Tight Corner',
  // battle 16
  'Summit',
  'Eclipse',
  'Reflection',
  'Squeeze',
  'Great Wall',
  'Ripples',
  'Pokeball',
  'Mandala',
  // battle 17
  'Snowman',
  'Candle',
  'Gift Box',
  'CSSBattle',
]
const targetsFolderPath = path.resolve(__dirname, '../src/targets')

function getEmptyTargetContent(target: string, index: number) {
  const targetId = String(index).padStart(3, '0')

  return (
    `export default {\n` +
    `  id: '${targetId}',\n` +
    `  title: 'Target #${index} - ${target}',\n` +
    `  url: 'https://cssbattle.dev/play/${index}',\n` +
    `  solution: '',\n` +
    `}\n`
  )
}

function createTargetsFolder() {
  if (fs.existsSync(targetsFolderPath)) {
    console.log('Targets folder already exists')
  } else {
    console.log('Targets folder does not exist')
    console.log('Creating Targets folder...')

    try {
      fs.mkdirSync(targetsFolderPath, { recursive: true })

      console.log('Targets folder created')
    } catch (err) {
      throw Error(`Error creating Targets folder: ${err}`)
    }
  }
}

function createEmptyTargets() {
  targets.forEach((target, index) => {
    const targetFileName = `${String(index + 1).padStart(3, '0')}.ts`
    const targetFilePath = `${targetsFolderPath}/${targetFileName}`

    if (fs.existsSync(targetFilePath)) {
      console.log(`${target} already exists, skipping...`)
    } else {
      console.log(`${target} does not exist`)
      console.log(`Creating ${target}...`)

      try {
        fs.writeFileSync(
          `${targetsFolderPath}/${targetFileName}`,
          getEmptyTargetContent(target, index + 1),
        )

        console.log(`${target} created`)
      } catch (err) {
        throw Error(`Error creating ${target} file: ${err}`)
      }
    }
  })
}

createTargetsFolder()
createEmptyTargets()
