module.exports = {
  title: "Aloys Tech Blog",
  description: 'A private repository',
  base: '/my-tech-blog/',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: 'FE',
        link: '/front-end/index.md'
      },
      {
        text: 'cs',
        link: '/computer-se/index.md'
      },
      {
        text: 'cross-platform',
        link: '/cross-platform/index.md'
      },
      {
        text: 'project',
        link: '/project/index.md'
      },
      {
        text: 'topic',
        link: '/topic/index.md'
      },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' }
      //   ]
      // }
    ]
  },
}