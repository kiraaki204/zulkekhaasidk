export const imageCredits = [
  {
    id: 'dried-flowers-kaorock72',
    file: 'Dried Flowers Still Life.jpg',
    title: 'Dried flowers',
    author: 'kaorock72',
    licence: 'CC0 1.0 Universal (Public Domain Dedication)',
    licenceShort: 'CC0',
    source: 'WordPress Photo Directory',
    landingUrl: 'https://wordpress.org/photos/photo/8627f323a3/',
    imageUrl: 'https://pd.w.org/2022/05/8627f323a3bff76.54746621.jpg',
    retrieved: '2026-11-16',
    usedOn: ['Hero (atmosphere variant)', 'Meet Zulfe Khaas'],
  },
]

export const getCredit = (file) => imageCredits.find((c) => c.file === file)
