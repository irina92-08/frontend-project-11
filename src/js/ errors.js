export const errorsApp = (err, state) => {
    state.elementsForm.input.classList.add('is-invalid')
    state.elementsForm.p.classList.add('text-danger')
    state.elementsForm.p.classList.remove('text-success')
    state.statevalid = false
    state.elementsForm.p.textContent = err
}