import * as yup from 'yup'
import view from './view.js'
import i18next from 'i18next'
import { parserRss } from './parser.js'
import { getRss } from './api.js'

export const app = () => {
  const validateUrl = (url, feeds) => {
    const schema = yup.string()
      .url()
      .notOneOf(feeds, () => i18next.t('errors.urlExists'))
    return schema.validate(url)
  }

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

  state.elementsForm.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()

    getRss(url)
      .then(data => parserRss(data))
      .then((data) => {
        console.log(data)
        state.elementsForm.input.value = ''
        view(validateUrl, data, state, url)
      })
      .catch(err => console.log(err))
  })
}
