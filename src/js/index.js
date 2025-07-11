import i18next from 'i18next'
import * as yup from 'yup'

export const runApp = async () => {
  await i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          errors: {
            invalidUrl: 'Сcылка должна быть валидным URL',
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
  })
  yup.setLocale({
    string: {
      url: () => i18next.t('errors.invalidUrl'),
    },
  })
}
