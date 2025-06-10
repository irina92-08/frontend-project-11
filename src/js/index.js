import i18next from 'i18next'

export const runApp = async () => {
  await i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          err1: 'Сcылка должна быть валидным URL',
          err2: 'Rss уже существует',
        },
      },
    },
  })
}
