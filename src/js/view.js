
const view = (validate, url, feeds,state) => {
    validate(url, feeds)
    .then((data) => {
        console.log(data);
        state.elementsForm.input.classList.remove('is-invalid')
        state.feeds.push(url);
        state.elementsForm.p.textContent = '';
    })
    .catch((err) => {
        state.elementsForm.input.classList.add('is-invalid');
        state.elementsForm.p.textContent = err.message;
    })
}
export default view;