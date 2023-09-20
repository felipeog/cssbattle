import * as dotenv from 'dotenv'
import { Octokit } from 'octokit'

dotenv.config()

// https://github.com/octokit/core.js#readme
export const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
})
