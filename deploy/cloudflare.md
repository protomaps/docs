---
title: Cloudflare Integration
outline: deep
---

# Cloudflare Integration

## Installation

### 1. Upload to R2

Uploading via Web UI is limited to 300 MB.

Use [rclone](https://rclone.org/downloads/) to upload larger PMTiles archives to R2 (you can use the `rclone/rclone` docker image in order to avoid installation, the config is at `/etc/rclone` for mounting). 
This requires a token from **R2 > Manage R2 API Tokens**. Note **Access Key ID**, the **Secret Access Key** and the **Endpoint for S3 Clients** from the API key creation screen.
Run the following commands:
1. `rclone config` and follow the on screen questions, the endpoint should look like: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
2. `rclone copyto <FILE> <rclone configuration name>:<BUCKET_NAME>/<FILE> --progress --s3-no-check-bucket --s3-chunk-size=256M` to upload to the root of the bucket.

Name your uploads to storage with the `.pmtiles` extension. Your tile requests to the Workers URL will look like `/NAME/0/0/0.<mvt | png>` for the archive `NAME.pmtiles`.

### 2. Create Worker with Web Console

1. In the Workers left menu of the Cloudflare dashboard, choose **Create Worker**.

2. It will ask you to deploy it first before you can edit the code, click **Deploy**.

3. **Edit Code** and paste the bundled [index.js](https://pmtiles.io/index.js) from [PMTiles/serverless/cloudflare](https://github.com/protomaps/PMTiles/tree/main/serverless/cloudflare).

4. Leave the default **HTTP handler** option.

5. Choose **Save and Deploy** and leave the code editing window.
  
6. Select the newly created worker from the Workers list.

7. In **Settings** of your worker, choose Variables > R2 Bucket Bindings > **Add Binding**.

  * Create a variable named `BUCKET` and select your R2 bucket from Step 1.

  * Choose **Save and Deploy**.

Your worker should now be active at its `*.workers.dev` domain. 

Make a request for `<ACCOUNT_NAME>.workers.dev/<FILENAME>/0/0/0.<mvt | png>` to verify tiles are served.

### Alternative: Use Wrangler

1. Clone the [PMTiles repository](https://github.com/protomaps/PMTiles) and change to the `serverless/cloudflare` directory.

2. `npm install` in `PMTiles/js` to get the dependencies of the core JS library

3. Also `npm install` in `PMTiles/serverless/cloudflare`

4. Copy `wrangler.toml.example` to `wrangler.toml`

5. Edit `wrangler.toml`, replacing `bucket_name` with your bucket.

6. Publish the worker: `npm run deploy`

### 3. Create Worker Route

For the cache to work, the worker must be assigned a zone on your own domain, not `workers.dev`.

1. In **Triggers** for your Worker, **Add Custom Domain** e.g. `subdomain.mydomain.com`. This will create a DNS entry in your Cloudflare site.

2. In **Routes**, Assign the route `subdomain.mydomain.com/*` to your worker. This directs traffic to the above subdomain to this specific worker.

Verify your deployment is working by checking for the `Cf-Cache-Status` header with a value of `HIT` on tile requests. This may take 2-3 attempts.

Example with `curl` for vector tiles and [TileJSON](https://github.com/mapbox/tilejson-spec):

```bash
curl -v https://subdomain.mydomain.com/FILENAME/0/0/0.mvt

curl -v https://subdomain.mydomain.com/FILENAME.json
```

## Configuration

Optional environment variables can be set set in `[vars]` of `wrangler.toml` or in the Workers web console.

* `PMTILES_PATH` - A string like `folder/{name}.pmtiles` specifying the path to archives in your bucket. Default `{name}.pmtiles`

* ~~`TILES_PATH` - a string like `prefix/{name}/{z}/{x}/{y}.{ext}` specifying the tile path exposed by the worker. Default `{name}/{z}/{x}/{y}.{ext}`~~ **Deprecated**

* `PUBLIC_HOSTNAME` - Optional, override the absolute hostname in [TileJSON](https://github.com/mapbox/tilejson-spec) responses. Example `tiles.example.com`

* `ALLOWED_ORIGINS` - a comma-separated list of allowed CORS origins. Default none. Examples: `https://example.com,https://localhost:3000`, `*`

* `CACHE_MAX_AGE`: max age in the Cloudflare cache, in seconds. default 86400, or 1 day.

## Cost Estimate

* Cloudflare Workers is [$5 USD per month](https://developers.cloudflare.com/workers/platform/pricing) with 10 million requests a month included, plus $0.50 per additional million.
* [Cloudflare R2](https://blog.cloudflare.com/introducing-r2-object-storage/) incurs costs for storage, write requests and read requests. These will only happen on tile cache misses. See the [Cost Calculator](./cost) for estimates based on usage.

## Cache Invalidation

* For Cloudflare, "Purge Cache" applies to all cached resources in the zone (domain). It's recommended to deploy on a dedicated zone for this reason.
