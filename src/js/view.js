import onChange from 'on-change'

const view = (validate, url, feeds, state) => {
  const watchedState = onChange(state, (path, value) => {
    if (value) {
      state.elementsForm.input.classList.remove('is-invalid')
      state.elementsForm.p.textContent = ''
    }
    else {
      state.elementsForm.input.classList.add('is-invalid')
    }
  })

  validate(url, feeds)
    .then(() => {
      console.log('ok')
      state.feeds.push(url)
      watchedState.stateInvalid = true
    })
    .catch((err) => {
      watchedState.stateInvalid = false
      state.elementsForm.p.textContent = err.message
    })
}
export default view
