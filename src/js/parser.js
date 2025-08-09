// import _ from 'lodash';
import { errorsApp } from './errors.js'
import i18next from 'i18next'

export const parserRss = ([contents, url], state) => {
  try {
   
    const parserDom = new DOMParser()
    const doc = parserDom.parseFromString(contents, 'text/xml')
    const parserError = doc.querySelector('parsererror')
     console.log(doc)
    if (parserError) {
      console.log(parserError)
      if(doc.body?.querySelector('parsererror')) {
        console.log(1)
        throw new Error('invalidUrl')
      } else {
        throw new Error('notRss')
      }
    }
    
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
  catch(e) {
    console.log(e.message)
      throw errorsApp(i18next.t(`errors.${e.message}`), state)
  }
}
