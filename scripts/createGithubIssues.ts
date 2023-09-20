// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#about-issues

import { PNG } from 'pngjs'
import * as fs from 'fs'
import * as path from 'path'
import * as pixelmatch from 'pixelmatch'

import { SOLVED_TARGETS } from '../src/consts/solvedTargets'
import { TARGET_DIMENSIONS } from '../src/consts/targetDimensions'
import { octokit } from './services/octokit'

// TODO: move images to `shared` (used by tests and scripts)
const solutionsImagesFolderPath = path.resolve(
  __dirname,
  '../src/tests/solutionsImages',
)

// TODO: move images to `shared` (used by tests and scripts)
function getPngFile(filePath: string) {
  return PNG.sync.read(fs.readFileSync(filePath))
}

// TODO: move images to `shared` (used by tests and scripts)
function getPixelsMismatch(
  currentTargetFileName: string,
  expectedTargetFileName: string,
) {
  const current = getPngFile(currentTargetFileName)
  const expected = getPngFile(expectedTargetFileName)
  const pixelsMismatch = pixelmatch(
    current.data,
    expected.data,
    null,
    TARGET_DIMENSIONS.WIDTH,
    TARGET_DIMENSIONS.HEIGHT,
  )

  return pixelsMismatch
}

// TODO: move images to `shared` (used by tests and scripts)
function getTargetsToTest() {
  const solutionsIds = fs
    .readdirSync(solutionsImagesFolderPath)
    .map((solutionImageFileName) =>
      solutionImageFileName.replace('.png', '').padStart(3, '0'),
    )
  const targetsToTest = SOLVED_TARGETS.filter(({ id }) =>
    solutionsIds.includes(id),
  )

  return targetsToTest
}

// TODO: issue already exists? ? update its description : create new issue
// TODO: close issue if mismatch is zero
async function createGithubIssues() {
  const targetsToTest = getTargetsToTest()
  const targetsToIssue = targetsToTest
    .map((target) => {
      const fileName = `${Number(target.id)}.png`
      const pixelsMismatch = getPixelsMismatch(
        path.resolve(__dirname, `../src/tests/targetsImages/${fileName}`),
        path.resolve(__dirname, `../src/tests/solutionsImages/${fileName}`),
      )

      return {
        ...target,
        pixelsMismatch,
      }
    })
    .filter((target) => Boolean(target.pixelsMismatch))

  for (let index = 0; index < targetsToIssue.length; index++) {
    const target = targetsToIssue[index]

    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: 'felipeog',
      repo: 'cssbattle',
      title: target.title,
      body:
        '```json' +
        '\n' +
        JSON.stringify(target, null, 2) +
        '\n' +
        '```' +
        '\n',
    })
  }
}

createGithubIssues()
