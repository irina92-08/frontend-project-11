import 'bootstrap/scss/bootstrap.scss'
import * as yup from 'yup'
import onChange from 'on-change'
import view from './view.js'

const elementsForm = {
    form: document.querySelector('form'),
    input: document.getElementById('url-input'),
    button: document.querySelector('form button'),
    p: document.querySelector('.feedback')
};

const validateUrl = (url, feeds) => {
    const schema = yup.string()
        .url('ССылка должна быть валидным URL')
        .notOneOf(feeds, 'Rss уже существует');
    return schema.validate(url)
}

const state = {
    elementsForm: {
        form: document.querySelector('form'),
        input: document.getElementById('url-input'),
        button: document.querySelector('form button'),
        p: document.querySelector('.feedback')
    },
    stateInvalid: true,
    feeds: [],
}


elementsForm.form.addEventListener('submit',(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    elementsForm.input.value = '';
    const currentFeeds = state.feeds.map((feed) => feed);
    
    view(validateUrl,url, currentFeeds,state)
    
})
