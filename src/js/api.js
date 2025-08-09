import axios from 'axios'
import i18next from 'i18next'
import { errorsApp } from './errors.js'

const getProxyUrl = (url) => {
  const baseUrl = 'https://allorigins.hexlet.app/get'
  const params = new URLSearchParams({
    disableCache: 'true',
    url,
  })
  console.log(`${baseUrl}?${params.toString()}`)
  return `${baseUrl}?${params.toString()}`
}

export const getRss = (url, state) => {
  const timeout = 10000;
  return axios.get(getProxyUrl(url), {timeout})
    .then(response => response.data.contents)
    .then(data => [data, url])
    .catch(() => {
      throw errorsApp(i18next.t('errors.errorNetwork'), state)
    })
}
