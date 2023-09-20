export function getHtmlFromSolution(solution: string) {
  const head = '<head><style>body{overflow:hidden}</style></head>'
  const body = `<body>${solution}</body>`
  const html = `<html>${head}${body}</html>`

  return html
}
