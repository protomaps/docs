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
      { text: 'Guide', link: '/guide/what-is-protomaps' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        collapsed: true,
        items: [
          { text: 'What is Protomaps?', link: '/guide/what-is-protomaps' },
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'PMTiles',
        collapsed: true,
        items: [
          { text: 'Concepts', link: '/pmtiles/overview' },
          { text: 'Creating PMTiles', link: '/pmtiles/create' },
          { text: 'Cloud Storage', link: '/pmtiles/cloud-storage' },
          { text: 'pmtiles CLI', link: '/pmtiles/cli' }
        ]
      },
      {
        text: 'PMTiles in the browser',
        collapsed: true,
        items: [
          { text: 'MapLibre GL JS', link: '/pmtiles/maplibre' },
          { text: 'Leaflet', link: '/pmtiles/leaflet' },
          { text: 'OpenLayers', link: '/pmtiles/openlayers' },
        ]
      },
      {
        text: 'Accelerating PMTiles',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/deploy/overview' },
          { text: 'AWS', link: '/deploy/aws' },
          { text: 'Cloudflare', link: '/deploy/cloudflare' },
          { text: 'Tileserver', link: '/deploy/server' }
        ]
      },
      {
        text: 'Basemaps',
        collapsed: true,
        items: [
          { text: 'Downloads', link: '/basemaps/downloads' },
          { text: 'Basemap Layers', link: '/basemaps/layers' },
          { text: 'Basemap Styles', link: '/basemaps/styles' },
          { text: 'MapLibre GL', link: '/basemaps/maplibre' },
          { text: 'Leaflet', link: '/basemaps/leaflet' },
          { text: 'OpenLayers', link: '/basemaps/openlayers' }
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
