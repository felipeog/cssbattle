// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#about-issues

import { SOLVED_TARGETS } from 'shared/consts/solvedTargets'
import { octokit } from 'scripts/services/octokit'
import { SHARED_FOLDER_PATH } from 'shared/consts/sharedFolderPath'
import { getPixelsMismatch } from 'shared/utils/getPixelsMismatch'

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

  // get mismatch
  const targetsWithMismatch = SOLVED_TARGETS.map((target) => {
    const fileName = `${Number(target.id)}.png`
    const pixelsMismatch = getPixelsMismatch(
      `${SHARED_FOLDER_PATH}/targetsImages/${fileName}`,
      `${SHARED_FOLDER_PATH}/solutionsImages/${fileName}`,
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
