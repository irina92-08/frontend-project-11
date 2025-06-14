export const parserRss = ([contents, url]) => {
  const parserDom = new DOMParser()
  const doc = parserDom.parseFromString(contents, 'text/xml')
  console.log(doc)
  if (doc.querySelector('body')) return { url }
  const title = doc.querySelector('channel title').textContent
  const description = doc.querySelector('channel description').textContent
  const items = Array.from(doc.querySelectorAll('item')).map((item) => {
    const titleItem = item.querySelector('title').textContent
    const descItem = item.querySelector('description').textContent
    return { titleItem, descItem }
  })
  return { url, title, description, items }
}
