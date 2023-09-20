// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#about-issues

import { PNG } from 'pngjs'
import * as fs from 'fs'
import * as path from 'path'
import * as pixelmatch from 'pixelmatch'

import { SOLVED_TARGETS } from '../src/consts/solvedTargets'
import { TARGET_DIMENSIONS } from '../src/consts/targetDimensions'
import { octokit } from './services/octokit'

// TODO: move to `shared` (used by tests and scripts)
const solutionsImagesFolderPath = path.resolve(
  __dirname,
  '../src/tests/solutionsImages',
)

// TODO: move to `shared` (used by tests and scripts)
function getPngFile(filePath: string) {
  return PNG.sync.read(fs.readFileSync(filePath))
}

// TODO: move to `shared` (used by tests and scripts)
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

// TODO: move to `shared` (used by tests and scripts)
function getSolvedTargets() {
  const solutionsIds = fs
    .readdirSync(solutionsImagesFolderPath)
    .map((solutionImageFileName) =>
      solutionImageFileName.replace('.png', '').padStart(3, '0'),
    )
  const solvedTargets = SOLVED_TARGETS.filter(({ id }) =>
    solutionsIds.includes(id),
  )

  return solvedTargets
}

async function updateGithubIssues() {
  // get current issues
  const issuesResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/issues',
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        accept: 'application/vnd.github+json',
      },
      owner: 'felipeog',
      repo: 'cssbattle',
      state: 'open',
      per_page: 100,
    },
  )
  const issues = issuesResponse?.data ?? []

  // get solved targets
  const solvedTargets = getSolvedTargets()
  const targetsWithMismatch = solvedTargets.map((target) => {
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

  // open or update issues
  const targetsToOpen = targetsWithMismatch.filter(
    (target) => target.pixelsMismatch > 0,
  )

  for (let index = 0; index < targetsToOpen.length; index++) {
    const target = targetsToOpen[index]
    const issue = issues.find((issue) => issue.title === target.title)

    if (issue) {
      console.log(`Updating ${target.title}`)

      // update issue
      await octokit.request(
        'PATCH /repos/{owner}/{repo}/issues/{issue_number}',
        {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            accept: 'application/vnd.github+json',
          },
          owner: 'felipeog',
          repo: 'cssbattle',
          issue_number: issue.number,
          body:
            '```json' +
            '\n' +
            JSON.stringify(target, null, 2) +
            '\n' +
            '```' +
            '\n',
        },
      )

      continue
    }

    console.log(`Opening ${target.title}`)

    // open issue
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        accept: 'application/vnd.github+json',
      },
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

  // close issues
  const targetsToClose = targetsWithMismatch.filter(
    (target) => target.pixelsMismatch <= 0,
  )

  for (let index = 0; index < targetsToClose.length; index++) {
    const target = targetsToClose[index]
    const issue = issues.find((issue) => issue.title === target.title)

    if (issue) {
      console.log(`Closing ${target.title}`)

      // close issue
      await octokit.request(
        'PATCH /repos/{owner}/{repo}/issues/{issue_number}',
        {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            accept: 'application/vnd.github+json',
          },
          owner: 'felipeog',
          repo: 'cssbattle',
          issue_number: issue.number,
          state: 'closed',
        },
      )
    }
  }
}

updateGithubIssues()
