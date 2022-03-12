import { TARGETS_MAP } from './targetsMap'

const allTargets = Object.values(TARGETS_MAP)

export const SOLVED_TARGETS = allTargets.filter((target) => !!target.solution)
