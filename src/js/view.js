import onChange from 'on-change'
import i18next from 'i18next'

const displayingFeeds = (feeds, elementFeeds) => {
  const divFeeds = document.createElement('div')
  divFeeds.innerHTML = '<div class="card-body"><h2 class="card-title h4">Фиды</h2></div>'
  elementFeeds.append(divFeeds)

  feeds.forEach ((feed) => {
    const listFeeds = document.createElement('ul')
    listFeeds.classList.add('list-group', 'border-0', 'rounded-0')

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

    elementFeeds.append(listFeeds)
  })
}

const view = (validate, feed, state) => {
  const watchedState = onChange(state, (path, value) => {
    if (value) {
      state.elementsForm.input.classList.remove('is-invalid')
      state.elementsForm.p.classList.remove('text-danger')
      state.elementsForm.p.classList.add('text-success')
      state.elementsForm.p.textContent = i18next.t('success.validUrl')

      displayingFeeds(state.feeds, state.elementFeeds)
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
      state.feeds.push(feed)
      watchedState.statevalid = true
    })
    .catch((err) => {
      watchedState.statevalid = false
      state.elementsForm.p.textContent = err.message
    })
}
export default view
