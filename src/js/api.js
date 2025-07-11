import axios from 'axios'
import i18next from 'i18next'
import { errorsApp } from './ errors.js'

export const getRss = (url, state) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
  return axios.get(proxyUrl)
    .then(response => response.data.contents)
    .then(data => [data, url])
    .catch((err) => {
      throw errorsApp(i18next.t('errors.errorNetwork'),state)
    })
}
