// import _ from 'lodash';
import { errorsApp } from './ errors.js'
import i18next from 'i18next'

export const parserRss = ([contents, url], state) => {
  try {
    console.log(1)
    const parserDom = new DOMParser()
    const doc = parserDom.parseFromString(contents, 'text/xml')
    const parserError = doc.querySelector('parsererror')
    if (parserError) {
      throw new Error('notRss')
    }
    // if (doc.querySelector('body')) return { url }
    const title = doc.querySelector('channel title').textContent
    const description = doc.querySelector('channel description').textContent
    const items = Array.from(doc.querySelectorAll('item')).map((item) => {
      const titleItem = item.querySelector('title').textContent
      const descItem = item.querySelector('description').textContent
      const link = item.querySelector('link').textContent
      return { titleItem, descItem, link }
    })
    return { url, title, description, items }
  }
  catch (e) {
    const error = e.message === 'notRss' ? 'errors.notRss' : 'errors.invalidUrl'
    console.log(error)
    throw errorsApp(i18next.t(error), state)
  }
}
