import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Protomaps Docs",
  description: "Technical Documentation for Protomaps",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Basemaps',
        items: [
          { text: 'Basemap Layers', link: '/basemaps/layers' },
          { text: 'Basemap Styles', link: '/basemaps/styles' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/protomaps' }
    ],

    search: {
      provider: 'local'
    }
  }
})
