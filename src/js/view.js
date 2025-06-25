import onChange from 'on-change'
import i18next from 'i18next'
import { getRss } from './api.js'
import { parserRss } from './parser.js'

 const displayingPosts = (item) => {
  const listPosts = document.querySelector('ul');
      const itemListPost = document.createElement('li')
      itemListPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
      listPosts.prepend(itemListPost)

      const titlePost = document.createElement('a')
      titlePost.classList.add('fm-bold')
      titlePost.textContent = `${item.titleItem}`
      console.log(item.titleItem)
      itemListPost.append(titlePost)

      const ButtonPost = document.createElement('button')
      ButtonPost.classList.add('btn', 'btn-outline-primary', 'btn-sm')
      ButtonPost.textContent = i18next.t('buttons.buttonPost')

      itemListPost.append(ButtonPost)
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
       
    
      feed.items.forEach((item) => {
        const itemListPost = document.createElement('li')
      itemListPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
      listPosts.append(itemListPost)

      const titlePost = document.createElement('a')
      titlePost.classList.add('fm-bold')
      titlePost.textContent = `${item.titleItem}`
      console.log(item.titleItem)
      itemListPost.append(titlePost)

      const ButtonPost = document.createElement('button')
      ButtonPost.classList.add('btn', 'btn-outline-primary', 'btn-sm')
      ButtonPost.textContent = i18next.t('buttons.buttonPost')

      itemListPost.append(ButtonPost)
      }
    )
    
  
      
  })
}
  const startTime = (url, currentPosts) => {
      getRss(url)
          .then(data => parserRss(data))
          .then(({ items }) => {
              items.forEach((item)=> {
                const newPost = currentPosts.filter((post) => post.link === item.link)
                console.log(item.link, newPost.length )
             if(newPost.length === 0) {
              console.log(11111111111111)
              displayingPosts(item)}
            })
            setTimeout(() => startTime(url, items),5000)
          })
    
  }
const view = (validate, feed, state, urlFeed) => {
  const watchedState = onChange(state, (path, value) => {
    if (value) {
      state.elementsForm.input.classList.remove('is-invalid')
      state.elementsForm.p.classList.remove('text-danger')
      state.elementsForm.p.classList.add('text-success')
      state.elementsForm.p.textContent = i18next.t('success.validUrl')

      displayingFeeds(state.feeds, state.elementFeeds, state.elementPosts);
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
      state.feeds.push(feed)
      watchedState.statevalid = true
    })
    .catch((err) => {
      watchedState.statevalid = false
      state.elementsForm.p.textContent = err.message
    })
}
export default view
