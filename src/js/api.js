import axios from 'axios'

export const getRss = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
  return axios.get(proxyUrl)
    .then(response => response.data.contents)
    .then(data => [data, url])
    .catch((err) => {
      throw new Error('Network response was not ok', err)
    })
}
