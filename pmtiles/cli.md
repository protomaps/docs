---
title: pmtiles CLI
outline: deep
---

# pmtiles CLI

## Installation

`pmtiles` is a single binary with no external dependencies.

The source code is on [GitHub at protomaps/go-pmtiles](https://github.com/protomaps/go-pmtiles). 

To download, see [Releases on GitHub](https://github.com/protomaps/go-pmtiles/releases) for your OS and architecture.

## CLI Overview

### Local archives

The CLI works with local tilesets on disk, for example:

```sh
pmtiles show test.pmtiles
```

### Remote archives

However, `pmtiles` can also work with remote HTTP archives and tilesets on cloud storage, even in private buckets.

```sh
pmtiles show https://r2-public.protomaps.com/protomaps-sample-datasets/cb_2018_us_zcta510_500k.pmtiles
```

`pmtiles` uses the [go-cloud]() library for connecting and authenticating to cloud storage.

Commands for S3, Azure Blob and Google Cloud Storage:

:::info
Commands that uses URL characters like `?` and `&`, should be escaped by a backslash `\` in your shell.
:::

```sh
pmtiles show test.pmtiles --bucket=s3://BUCKET_NAME
pmtiles show test.pmtiles --bucket=azblob://CONTAINER_NAME?storage_account=ACCOUNT
pmtiles show test.pmtiles --bucket=gs://BUCKET_NAME
```

For S3-compatible blob storage (Minio, Cloudflare R2, etc) outside of AWS:

```sh
pmtiles show test.pmtiles --bucket=s3://BUCKET_NAME?endpoint=https://example.com&region=auto
```

### Private buckets

`pmtiles` uses [go-cloud's]() default authentication methods for each cloud provider.

For example, the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables are used to sign requests to private S3-compatible buckets:

```sh
export AWS_ACCESS_KEY_ID=MY_KEY
export AWS_SECRET_ACCESS_KEY=MY_SECRET
pmtiles show NAME.pmtiles --bucket=s3://R2_BUCKET_NAME\?endpoint=https://R2_ACCOUNT_ID.r2.cloudflarestorage.com\&region=auto
```

:::info
Note that some S3-compatible storage servers like Minio, Ceph and SeaweedFS may require [additional URL options](https://gocloud.dev/howto/blob/#s3-compatible) like `s3ForcePathStyle=true`.
:::

## Commands

### show

```bash
pmtiles show INPUT.pmtiles
pmtiles show INPUT.pmtiles --bucket=s3://BUCKET_NAME
```

Print an archive's header data and metadata.

### tile

```bash
pmtiles tile INPUT.pmtiles 0 0 0
```

Output a single tile's contents to stdout.

### verify

```bash
pmtiles verify INPUT.pmtiles
```

Check that an archive is ordered correctly and has correct header information.

### extract

```bash
pmtiles extract INPUT.pmtiles OUTPUT.pmtiles --bbox=MIN_LON,MIN_LAT,MAX_LON,MAX_LAT
pmtiles extract INPUT.pmtiles OUTPUT.pmtiles --region=REGION.geojson
pmtiles extract https://example.com/INPUT.pmtiles OUTPUT.pmtiles --maxzoom=MAXZOOM
pmtiles extract INPUT.pmtiles OUTPUT.pmtiles --maxzoom=MAXZOOM --bucket=s3://BUCKET_NAME
```

Create a smaller archive from a larger archive. The source archive may be local or remote. The source archive must be clustered.

Options:

* `--maxzoom`: Extract only a subset of zoom levels. Extracting a full sub-pyramid from 0 to `maxzoom` is always an efficient operation that makes minimal I/O or network requests to the source archive.
* `--minzoom`: Extract only a partial sub-pyramid. This may require many more requests than leaving the default `--minzoom=0`. Because this removes overview zoom levels, it should only be used in specific situations.
* `--region`: a [GeoJSON](https://geojson.org) Polygon, Multipolygon, Feature, or FeatureCollection.
* `--download-threads` Number of parallel requests to speed up downloads.
* `--overfetch` extra data to download to batch small requests: 0.05 is 5%.

### serve

The simplest way to consume PMTiles on the web is directly in the browser with [pmtiles.js along with a renderer-specific client](/docs/pmtiles/maplibre). However, decoding PMTiles on the server and exposing a ZXY API is faster and works with more clients. A ZXY API is directly supported by web and native renderers such as [MapLibre](http://maplibre.org), without needing the PMTiles client library. Using `pmtiles serve` also allows serving a public ZXY API from private storage buckets.

:::info
When using `pmtiles serve`, requests for the raw file like `/test.pmtiles`, either whole or partial range requests, are not supported. A standard web server like Apache, Nginx or Caddy can serve those.
:::

Serve a directory or bucket of tilesets (like TILESET.pmtiles) from local or cloud storage as a Z/X/Y endpoint: 

```bash
pmtiles serve .
# serves the current directory at http://localhost:8080/TILESET/{z}/{x}/{y}.mvt
# TileJSON at http://localhost:8080/TILESET.json
pmtiles serve . --bucket=https://example.com
pmtiles serve / --bucket=s3://BUCKET_NAME
pmtiles serve PREFIX --bucket=s3://BUCKET_NAME
```

For ZXY URLs, the extension must match the type of the tiles in the archive, for example `mvt`, `png`, `jpg`, `webp`, `avif`.

Flags:

* `--cors=ORIGIN` set the value of the Access-Control-Allow-Origin. * is a valid value but must be escaped in your shell. Appropriate for development use.
* `--cache-size=SIZE_MB` set the total size of the header and directory LRU cache. Default is 64 MB.
* `--port=PORT` specify the HTTP port. Defaults to 8080.
* `--public-url`: Required for serving [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/3.0.0). Specify the full URL as it should appear to the browser client like `http://localhost:8080` or `https://example.com`.

For production usage, it's recommended to run behind a CDN or reverse proxy like Caddy to handle SSL and CORS. See the guide on [Accelerating PMTiles](/docs/deploy/).


### convert

Convert an [MBTiles](https://github.com/mapbox/mbtiles-spec/tree/master/1.3) archive to PMTiles.

```bash
pmtiles convert INPUT.mbtiles OUTPUT.pmtiles
```

### upload

Upload an archive to cloud storage.

```bash
# requires environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY credentials
pmtiles upload INPUT.pmtiles REMOTE.pmtiles --bucket=s3://BUCKET_NAME
```

You will need write permissions to the bucket, for example this AWS IAM policy:

```json
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": "s3:*",
              "Resource": "arn:aws:s3:::my-bucket-name/*"
          }
      ]
  }
```

### version

```bash
pmtiles version
```

Print the version of the command line tool.
