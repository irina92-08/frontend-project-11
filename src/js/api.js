import axios from 'axios'
import i18next from 'i18next'
import { errorsApp } from './errors.js'
import { parserRss } from './parser.js'

const getProxyUrl = (url) => {
  const baseUrl = 'https://allorigins.hexlet.app/get'
  const params = new URLSearchParams({
    disableCache: 'true',
    url,
  })

  return `${baseUrl}?${params.toString()}`
}

export const getRss = (url, state) => {
  const timeout = 10000
  return axios.get(getProxyUrl(url), { timeout })
    .then(response => response.data.contents)
    .then(data => [data, url])
    .catch(() => {
      throw errorsApp(i18next.t('errors.errorNetwork'), state)
    })
}

export const startTime = (url, currentPosts, state, displaying) => {
  getRss(url)
    .then(data => parserRss(data))
    .then(({ items }) => {
      items.forEach((item) => {
        const newPost = currentPosts.filter(post => post.link === item.link)
        if (newPost.length === 0) {
          displaying(item, 'new')
        }
      })
      return items
    })
    .then((items) => {
      setTimeout(() => startTime(url, items, state, displaying), 5000)
    })
    .catch((err) => {
      console.log(err)
      setTimeout(() => startTime(url, currentPosts, state), 5000)
      throw errorsApp(i18next.t('errors.errorNetwork'), state)
    })
}
