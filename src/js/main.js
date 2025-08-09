import i18next from 'i18next'
import * as yup from 'yup'
import { app } from './app.js'

export const init = () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          errors: {
            invalidUrl: 'Ссылка должна быть валидным URL',
            urlExists: 'RSS уже существует',
            urlNull: 'Не должно быть пустым',
            notRss: 'Ресурс не содержит валидный RSS',
            errorNetwork: 'Ошибка сети',
          },
          success: {
            validUrl: 'RSS успешно загружен',
          },
          buttons: {
            buttonPost: 'Просмотр',
            buttonModal: 'Читать полностью',
            buttonClose: 'Закрыть',
          },

        },
      },
    },
  }).then(() => yup.setLocale({
    string: {
      url: () => i18next.t('errors.invalidUrl'),
    },
  })).then(() => app())
}
