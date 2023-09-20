import { TARGETS_MAP } from 'shared/consts/targetsMap'

const allTargets = Object.values(TARGETS_MAP)

export const SOLVED_TARGETS = allTargets.filter((target) =>
  Boolean(target.solution),
)
