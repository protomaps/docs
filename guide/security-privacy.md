---
title: Security and Privacy
outline: deep
---

# Security and Privacy

## Applications

Protomaps is designed for simple, secure and privacy-enabled map publishing, and is especially suited for:

* Maps for humanitarian operations, adversarial environments or emergency services. Protomaps enables maps to **work 100% offline**, meaning there's less risk of data leaks or compromise.

* **Public sector**: Protomaps can power mapping applications in city government, using storage and servers already provisioned. It ensures user data is not transmitted to third party map APIs, and can enable [compliance in the European Union.](#gdpr)

## Checklist

### Storage buckets

Verify the **access level of your storage buckets.**

Hosting PMTiles from a public storage bucket and decoding via [pmtiles.js]() is the simplest publishing method, but allows anyone to download your entire tileset. To limit access, use one of the [deployment options](/deploy) for decoding on the server or in a serverless function.

### HTTPS

Ensure that you access your maps over HTTPS instead of plain HTTP.

Using HTTPS is also required for [HTTP/2](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2) and 3, which will make map viewing faster by [enabling more requests at a time compared to HTTP 1.1](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x#domain_sharding).

### CORS

[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) limits the sites that are allowed to embed your hosted resources, such as PMTiles archives, ZXY tile endpoints and TileJSON.

Check the [Cloud Storage](/pmtiles/cloud-storage) docs for your platform for how to configure CORS.

Avoid the `*` wildcard value for `Access-Control-Allow-Origin` for production traffic.

### Map Resources

Even if your PMTiles archives or tile endpoints come from your own infrastructure, other resources on a web map may come from an external origin. These include:

  * Map rendering library JavaScript.

  * Map rendering library CSS Stylesheets.

  * For MapLibre GL: Map style JSON, spritesheets, fontstacks, and RTL (right-to-left) text plugins. See [Example Application](#example-application) below.

  * Use Subresource Integrity to ensure that libraries from third parties are not compromised. Example:

```html
<script 
  src="https://unpkg.com/pmtiles@3.0.7/dist/pmtiles.js" 
  integrity="sha384-MjejsnWXHmuz93aE35YWLh5AbS/6ceRB3Vb+ukOwqFzJRTpQ8vvbkLbNV7I0QK4f" 
  crossorigin="anonymous"
></script>
```

## GDPR

::: info
This is not a substitute for legal advice.
:::

The European Union's [General Data Protection Regulation (GDPR)](https://gdpr.eu) regulates how companies store and transmit personal data. 

Using Protomaps for your web map can **eliminate third party data controllers and processors**, making it much easier for sites to comply with GDPR.

Hosting [PMTiles](/pmtiles) via your existing cloud storage or server is a first step - a typical map application has many other components.

### Example Application

Below is a complete example of a map application that avoids third-party data processors. As long as all linked assets are on your own GDPR-compliant static storage, no third party data processors or controllers are required.

```html{4-7,15,23-24}
<html>
    <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="maplibre-gl.css">
        <script src="maplibre-gl.js"></script>
        <script src="pmtiles.js"></script>
        <script src="protomaps-themes-base.js"></script>
    </head>
    <body>
        <div id="map" style="height: 100%; width: 100%"></div>
        <script type="text/javascript">
            let protocol = new pmtiles.Protocol();
            maplibregl.addProtocol("pmtiles", protocol.tile);
            maplibregl.setRTLTextPlugin(
              "mapbox-gl-rtl-text.min.js",
              true,
            );
            const map = new maplibregl.Map({
              container: "map",
              zoom: 12,
              center: [11.24962,43.77078],
              style: {
                glyphs: "fonts/{fontstack}/{range}.pbf",
                sprites: "sprites/v3/light",
                version: 8,
                sources: {
                  protomaps: {
                    type: "vector",
                    url: "pmtiles://firenze.pmtiles",
                    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
                  },
                },
                layers: protomaps_themes_base.default("protomaps", "light")
              },
            });
        </script>
    </body>
</html>
```

* `maplibre-gl.js`, `maplibre-gl.css` - JavaScript and CSS for the MapLibre GL rendering library.
* `pmtiles.js` - JavaScript for decoding PMTiles archives in the browser.
* `protomaps-themes-base.js` - JavaScript for creating a MapLibre GL style for a basemap tileset. 
* `mapbox-gl-rtl-text.min.js` - MapLibre plugin for supporting right-to-left languages.
* `fonts/{fontstack}/{range}.pbf` - Font glyphs for rendering labels, available at [protomaps/basemaps-assets](https://github.com/protomaps/basemaps-assets).
* `sprites/{version/{theme}` - Sprites for basemap icons, available at [protomaps/basemaps-assets](https://github.com/protomaps/basemaps-assets).