export type Battle = {
  id: number
  title: string
  description: string
  url: string
  targets: number[]
}

export type Target = {
  id: number
  title: string
  url: string
  solution: string
  colors: string[]
}
