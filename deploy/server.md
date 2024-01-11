---
title: Set up a Server
outline: deep
---

# Set up a Server

PMTiles has first-class integration with [Caddy](https://caddyserver.com), a production-grade, dependency-free web server with [automatic HTTPS](https://caddyserver.com/docs/quick-starts/https). The Caddy plugin can serve buckets of archives from private S3-compatible storage, Azure, Google Cloud, public HTTP endpoints, and the filesystem.

::: info
If you already use a server like nginx or Apache, you can run [`pmtiles serve`](/pmtiles/cli) behind a reverse proxy configuration.
:::

## Installation

Use [Caddy Downloads](https://caddyserver.com/download?package=github.com%2Fprotomaps%2Fgo-pmtiles%2Fcaddy) to download a Caddy build with the pmtiles plugin for your OS and architecture.

See the Caddy docs for how to [Keep Caddy Running](https://caddyserver.com/docs/running) by installing as a system service.

## Credentials

Credentials will be loaded from environment variables by the [gocloud](https://gocloud.dev/howto/blob/) library.
* S3 buckets can specify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in Caddy's [unit files](https://caddyserver.com/docs/running#unit-files):

```txt{3-4}
...
[Service]
Environment=AWS_ACCESS_KEY_ID=mykey
Environment=AWS_SECRET_ACCESS_KEY=mysecret
...
```


## Caddyfile

A minimal configuration for serving a bucket:

```txt{7-11}
{
  order pmtiles_proxy before reverse_proxy
}

localhost:2019 {
  handle_path /tiles/* {
    pmtiles_proxy {
      bucket https://example.com
      cache_size 256
      public_url https://localhost:2019/tiles
    }
  }
}
```

* `handle_path`: A [Caddy directive](https://caddyserver.com/docs/caddyfile/directives/handle_path) that strips the prefix before passing the path to the proxy. **Requires** the `order` directive at the global Caddyfile level. 
  * Example: A request to the server for `/tiles/testdata.json` would resolve to the file `testdata.pmtiles` in the bucket.
* `bucket`: Any bucket URL [recognized by gocloud](https://gocloud.dev/concepts/urls/) or the [pmtiles cli](/pmtiles/cli#buckets).
  Examples:
  * `s3://my_bucket?region=auto&endpoint=https://1234.r2.cloudflarestorage.com`
* `cache_size`: Cache size in MB for intermediate PMTiles headers and directories. Tile data and JSON metadata are not cached.
* `public_url`: The base URL and path that appears in [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/3.0.0). Required only if you need TileJSON responses. Must be the public URL as it should appear to the browser, after traversing any proxies or CDNs.

For a production-ready deployment, refer to the Caddy docs on [configuring SSL](https://caddyserver.com/docs/automatic-https#hostname-requirements) and [CORS headers](https://caddyserver.com/docs/caddyfile/directives/header).


