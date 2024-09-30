---
title: Cloudflare Integration
outline: deep
---

# Cloudflare Integration

This guide walks through setting up a ZXY API using Cloudflare R2 Storage and Workers.

:::warning
Cloudflare R2 is known to have higher latency (500ms or higher) than other Cloud Storage products, but lower storage and no egress costs. Evaluate this as a deployment option alongside others.
:::

## Installation

### 1. Upload to R2

Uploading via Web UI is limited to 300 MB.

Use [rclone](/pmtiles/cloud-storage#uploading) to upload larger PMTiles archives to R2.

This requires a token from **R2 > Manage R2 API Tokens**. Note **Access Key ID**, the **Secret Access Key** and the **Endpoint for S3 Clients** from the API key creation screen. The S3-compatible endpoint should look like: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.

Name your uploads to storage with the `.pmtiles` extension. Your tile requests to the Workers URL will look like `/NAME/0/0/0.<mvt | png>` or `/NAME.json` ([TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/3.0.0)) for the archive `NAME.pmtiles`.

### 2. Manual Option: Create Worker with Web Console

1. In the **Workers & Pages** menu of the Cloudflare dashboard, choose **Create > Create Worker**.

2. Click **Deploy** to publish the sample code.

3. **Edit Code** and replace the existing with the bundled [index.js](https://pmtiles.io/index.js) from [PMTiles/serverless/cloudflare](https://github.com/protomaps/PMTiles/tree/main/serverless/cloudflare).

5. Choose **Deploy > Save and Deploy** and leave the code editing window.
  
6. In **Settings** of your worker:

  * Choose **Variables and Secrets** > **+Add**. Name a variable `ALLOWED_ORIGINS` and set it to `*` to allow all CORS origins.

  * Choose **Bindings** > **+Add** > **R2 bucket**. Name your variable `BUCKET` and select your R2 bucket from Step 1.

  * Choose **Deploy**.

Your worker should now be active at its `*.workers.dev` domain, visible at the **Visit** link.

Make a request for `/TILESET.json` to verify TileJSON is served.

### 2. Command-line Option: Use Wrangler

1. Clone the [PMTiles repository](https://github.com/protomaps/PMTiles) and change to the `serverless/cloudflare` directory.

2. `npm install` in `PMTiles/js` to get the dependencies of the core JS library.

3. Also `npm install` in `PMTiles/serverless/cloudflare`.

4. Copy `wrangler.toml.example` to `wrangler.toml`.

5. Edit `wrangler.toml`, replacing `my-bucket-development` and `my-bucket-production` with your bucket.

6. Publish the worker: `npm run deploy`

After the deploy, the `*.workers.dev` subdomain will be printed.

Make a request for `/TILESET.json` to verify TileJSON is served.

### 3. Create Worker Route

For the cache to work, the worker must be assigned a zone on your own domain, not `workers.dev`.

1. In **Settings > Triggers** for your Worker, **Add Custom Domain** e.g. `subdomain.mydomain.com`. This will create a DNS entry in your Cloudflare site.

Verify your deployment is working by checking for the `Cf-Cache-Status` header with a value of `HIT` on successful (HTTP 200) requests.

Example with `curl` for vector tiles and [TileJSON](https://github.com/mapbox/tilejson-spec):

```bash
curl -v https://subdomain.mydomain.com/FILENAME/0/0/0.mvt

# TileJSON for MapLibre
curl -v https://subdomain.mydomain.com/FILENAME.json
```

## Configuration

Optional environment variables can be set set in `[vars]` of `wrangler.toml` or in the Workers web console.

* `PMTILES_PATH` - A string like `folder/{name}.pmtiles` specifying the path to archives in your bucket. Default `{name}.pmtiles`

* `PUBLIC_HOSTNAME` - Optional, override the absolute hostname in [TileJSON](https://github.com/mapbox/tilejson-spec) responses. Example `tiles.example.com`

* `ALLOWED_ORIGINS` - a comma-separated list of allowed CORS origins. Default none. Examples: `https://example.com,https://localhost:3000`, `*`

* `CACHE_CONTROL`: HTTP header value to control caching, default `public, max-age=86400` (1 day).

## Cost Estimate

* Cloudflare Workers is [$5 USD per month](https://developers.cloudflare.com/workers/platform/pricing) with 10 million requests a month included, plus $0.50 per additional million.
* [Cloudflare R2](https://blog.cloudflare.com/introducing-r2-object-storage/) incurs costs for storage, write requests and read requests. These will only happen on tile cache misses. See the [Cost Calculator](./cost) for estimates based on usage.

## Cache Invalidation

* For Cloudflare, "Purge Cache" applies to all cached resources in the zone (domain). It's recommended to deploy on a dedicated zone for this reason.
