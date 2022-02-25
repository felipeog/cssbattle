export type Battle = {
  battleId: string
  title: string
  url: string
}

export type Target = {
  targetId: string
  title: string
  url: string
  solution: string
  battle: Battle
}
