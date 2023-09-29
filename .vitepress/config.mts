import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Protomaps Docs",
  description: "Technical Documentation for Protomaps",
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'PMTiles',
        collapsed: true,
        items: [
          { text: 'Creating PMTiles', link: '/pmtiles/create' },
          { text: 'Cloud Storage', link: '/markdown-examples' }
        ]
      },
      {
        text: 'PMTiles in the browser',
        collapsed: true,
        items: [
          { text: '', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Accelerating PMTiles',
        collapsed: true,
        items: [
          { text: 'AWS', link: '/pmtiles/create' },
          { text: 'Cloudflare', link: '/markdown-examples' },
          { text: 'Tileserver', link: '/markdown-examples' }
        ]
      },
      {
        text: 'Basemaps',
        collapsed: true,
        items: [
          { text: 'Basemap Layers', link: '/basemaps/layers' },
          { text: 'Basemap Styles', link: '/basemaps/styles' },
          { text: 'MapLibre GL', link: '/basemaps/styles' },
          { text: 'OpenLayers', link: '/basemaps/styles' },
          { text: 'Leaflet', link: '/basemaps/styles' }
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
