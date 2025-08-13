import * as yup from 'yup'
import view from './view.js'
import i18next from 'i18next'
import { parserRss } from './parser.js'
import { getRss } from './api.js'
import { errorsApp } from './errors.js'

export const app = () => {
  const state = {
    elementsForm: {
      form: document.querySelector('form'),
      input: document.getElementById('url-input'),
      button: document.querySelector('form button'),
      p: document.querySelector('.feedback'),
    },
    elementFeeds: document.querySelector('.feeds'),
    elementPosts: document.querySelector('.posts'),
    stateValid: true,

    feeds: [],
  }

  const validateUrl = (url, feeds, feed) => {
    const schema = yup.string()
      .url()
      .notOneOf(feeds, () => i18next.t('errors.urlExists'))
    return schema.validate(url)
      .then(() => {
        state.feeds.push(feed)
      })
      .catch((err) => {
        console.log(err)
        throw new Error(err)
      })
  }

  state.elementsForm.form.addEventListener('submit', (e) => {
    e.preventDefault()
    state.elementsForm.button.classList.add('disabled')
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()
    if (!url) {
      throw errorsApp(i18next.t('errors.urlNull'), state)
    }

    getRss(url, state)
      .then(data => parserRss(data, state))
      .then((data) => {
        console.log(data)
        state.elementsForm.input.value = ''
        view(validateUrl, data, state, url)
      })
      .catch((err) => {
        console.log(err)
        state.elementsForm.button.classList.remove('disabled')
      })
  })
}
