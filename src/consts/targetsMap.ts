import * as targetsMap from '../targets'
import { Target } from '../types'

export type TargetsMap = {
  [key: string]: Target
}

export const TARGETS_MAP: TargetsMap = targetsMap
