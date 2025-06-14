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
            urlExists: 'Rss уже существует',
          },
          success: {
            validUrl: 'RSS успешно загружен', 
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
