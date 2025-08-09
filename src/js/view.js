import onChange from 'on-change'
import i18next from 'i18next'
import { getRss } from './api.js'
import { parserRss } from './parser.js'

const modalOpen = (element) => {
  console.log(element)
  const body = document.querySelector('body')
  const modal = document.querySelector('#modal')
  const modalTitle = document.querySelector('.modal-title')
  const modalBody = document.querySelector('.modal-body')

  modalTitle.textContent = element.titleItem
  modalBody.textContent = element.descItem
  body.classList.add('modal-open')
  modal.classList.add('show')
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.setAttribute('style', 'display:block')

  const close = () => {
    modal.removeAttribute('style', 'aria-modal')
    modal.setAttribute('aria-hidden', 'true')
    body.classList.remove('modal-open')
    modal.classList.remove('show')
  }

  const modalCross = modal.querySelector('button')
  modalCross.addEventListener('click', () => close())

  const modalFooter = document.querySelector('.modal-footer')
  const buttonClose = modalFooter.querySelector('button')
  buttonClose.addEventListener('click', () => close())

  const modalLink = modalFooter.querySelector('a')
  modalLink.setAttribute('href', `${element.link}`)
}

// добавление постов или нового поста
const displayingNewPosts = (item, element = null) => {
  const listPosts = document.querySelector('ul')
  const itemListPost = document.createElement('li')
  itemListPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
  element === 'new' ? listPosts.prepend(itemListPost) : listPosts.append(itemListPost)

  const titlePost = document.createElement('a')
  titlePost.setAttribute('href', `${item.link}`)
  titlePost.classList.add('fw-bold')
  titlePost.textContent = `${item.titleItem}`
  console.log(item.titleItem)
  itemListPost.append(titlePost)

  const buttonPost = document.createElement('button')
  buttonPost.classList.add('btn', 'btn-outline-primary', 'btn-sm')
  buttonPost.textContent = i18next.t('buttons.buttonPost')
  itemListPost.append(buttonPost)

  buttonPost.addEventListener('click', () => {
    titlePost.classList.remove('fw-bold')
    titlePost.classList.add('fw-normal', 'link-secondary')
    modalOpen(item)
  })
}

const displayingFeeds = (feeds, elementFeeds, elementPosts) => {
  // секция фидов создание
  elementFeeds.innerHTML = ''
  const divFeeds = document.createElement('div')
  divFeeds.classList.add('card', 'border-0')
  divFeeds.innerHTML = '<div class="card-body"><h2 class="card-title h4">Фиды</h2></div>'
  elementFeeds.append(divFeeds)
  const listFeeds = document.createElement('ul')
  listFeeds.classList.add('list-group', 'border-0', 'rounded-0')
  elementFeeds.append(listFeeds)

  // секция постов создание
  elementPosts.innerHTML = ''
  const divPosts = document.createElement('div')
  divPosts.classList.add('card', 'border-0')
  divPosts.innerHTML = '<div class="card-body"><h2 class="card-title h4">Посты</h2></div>'
  elementPosts.append(divPosts)
  const listPosts = document.createElement('ul')
  listPosts.classList.add('list-group', 'border-0', 'rounded-0')
  elementPosts.append(listPosts)

  feeds.forEach ((feed) => {
    // фиды
    const itemListFeed = document.createElement('li')
    itemListFeed.classList.add('list-group-item', 'border-0', 'border-end-0')
    listFeeds.append(itemListFeed)

    const titleFeed = document.createElement('h3')
    titleFeed.classList.add('h6', 'm-0')
    titleFeed.textContent = `${feed.title}`
    itemListFeed.append(titleFeed)

    const descriptionFeed = document.createElement('p')
    descriptionFeed.classList.add('m-0', 'small', 'text-black-50')
    descriptionFeed.textContent = `${feed.description}`
    itemListFeed.append(descriptionFeed)

    // посты
    feed.items.forEach(item => displayingNewPosts(item),
    )
  })
}
const startTime = (url, currentPosts) => {
  getRss(url)
    .then(data => parserRss(data))
    .then(({ items }) => {
      items.forEach((item) => {
        const newPost = currentPosts.filter(post => post.link === item.link)
        if (newPost.length === 0) {
          displayingNewPosts(item, 'new')
        }
      })
      setTimeout(() => startTime(url, items), 5000)
    })
}
const view = (validate, feed, state, urlFeed) => {
  state.elementsForm.button.classList.remove('disabled')
  const watchedState = onChange(state, (path, value) => {
    if (value) {
      state.elementsForm.input.classList.remove('is-invalid')
      state.elementsForm.p.classList.remove('text-danger')
      state.elementsForm.p.classList.add('text-success')
      state.elementsForm.p.textContent = i18next.t('success.validUrl')

      displayingFeeds(state.feeds, state.elementFeeds, state.elementPosts)
      startTime(urlFeed, feed.items)
    }
    else {
      state.elementsForm.input.classList.add('is-invalid')
      state.elementsForm.p.classList.add('text-danger')

      state.elementsForm.p.classList.remove('text-success')
    }
  })

  const url = feed.url
  const currentFeed = state.feeds.map(feed => feed.url)
  validate(url, currentFeed)
    .then(() => {
      console.log('ok')
      watchedState.feeds.push(feed)
      watchedState.statevalid = true
    })
    .catch((err) => {
      watchedState.statevalid = false
      if (err.message === i18next.t('errors.urlExists')) {
        state.elementsForm.p.textContent = err.message
      }
      else {
        state.elementsForm.p.textContent = i18next.t('errors.invalidUrl')
      }
    })
}
export default view
