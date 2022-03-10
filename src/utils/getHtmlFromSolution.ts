export function getHtmlFromSolution(solution: string) {
  const head =
    '<head><style>body{overflow:hidden;width:400px;height:300px}</style></head>'
  const body = `<body>${solution}</body>`
  const html = `<html>${head}${body}</html>`

  return html
}
