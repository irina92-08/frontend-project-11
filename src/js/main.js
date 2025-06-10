import 'bootstrap/scss/bootstrap.scss'
import * as yup from 'yup'
import { runApp } from './index.js'
import view from './view.js'
import i18next from 'i18next'

runApp()

const elementsForm = {
  form: document.querySelector('form'),
  input: document.getElementById('url-input'),
  button: document.querySelector('form button'),
  p: document.querySelector('.feedback'),
}

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
  stateInvalid: true,

  feeds: [],
}

elementsForm.form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const url = formData.get('url').trim()

  fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => console.log(data.contents))

  elementsForm.input.value = ''
  const currentFeeds = state.feeds.map(feed => feed)

  view(validateUrl, url, currentFeeds, state)
})
