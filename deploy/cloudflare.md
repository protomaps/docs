---
title: Cloudflare Integration
outline: deep
---

# Cloudflare Integration

## Installation

### 1. Upload to R2

Uploading via Web UI is limited to 300 MB.

Use [rclone](https://rclone.org/downloads/) to upload larger PMTiles archives to R2 (you can use the `rclone/rclone` docker image in order to avoid installation, the config is at `/etc/rclone` for mounting). 
In order to use rclone you'll need to create an API key. Copy the "Access Key ID", the "Secret Access Key" and the "Endpoints for S3 clients" from the API key creation screen.
Run the following commands:
1. `rclone config` and follow the on screen questions, note that the endpoint should be `https://<ACCOUNT_ID>.r2.cloudflarestorage.com/<BUCKET_NAME>`
2. `rclone copy your.pmtiles <the name you gave the above rclone configuration):<FOLDER_INSIDE_THE_BEUCKET> to upload the file

Name your uploads to storage with the `.pmtiles` extension. Your tile requests to the Workers URL will look like `/FILENAME/0/0/0.ext` for the archive `FILENAME.pmtiles`.

### 2. Create Worker with Web Console

1. In the Workers left menu of the Cloudflare dashboard, choose **Create Worker**.

2. It will ask you to deploy it first before you can edit the code, click **Deploy**

3. Paste in this code from: [index.js](https://protomaps.github.io/PMTiles/index.js).

4. Leave the default **HTTP handler** option.

5. Choose **Save and Deploy** and leave the code editing window.
  
6. Select the newly create worker from the workers list

7. In Settings of your worker, choose Variables > R2 Bucket Bindings > **Add Binding**.

  * Create variable with name `BUCKET` and select your R2 bucket from Step 1.

  * Choose **Save and Deploy**.


Your worker should now be active at its `*.workers.dev` domain. 

Make a request for `<ACCOUNT_NAME>.workers.dev/<FOLDER>/<FILENAME>/0/0/0.pbf` to verify tiles are served.

### Alternative: Use Wrangler

1. Clone the [PMTiles repository](https://github.com/protomaps/PMTiles) and change to the `serverless/cloudflare` directory.

2. `npm install` in `PMTiles/js` to get the dependencies of the core JS library

3. Also `npm install` in `PMTiles/serverless/cloudflare`

4. Copy `wrangler.toml.example` to `wrangler.toml`

5. Edit `wrangler.toml`, replacing `bucket_name` with your bucket.

6. Publish the worker: `npm run deploy`

### 3. Create Worker Route

For the cache to work, the worker must be assigned a zone on your own domain, not `workers.dev`.

1. In Websites > your domain > DNS, Add a CNAME entry pointing to your `workers.dev` domain:

![cloudflare image](./cloudflare_1.png)

2. In Websites > your domain > Workers Routes, Choose **Add Route**.

  * for **Route**, enter `SUBDOMAIN.mydomain.com/*`

  * for **Service**, choose the name of your Worker. for **Environment**, choose `production`.

![cloudflare image](./cloudflare_2.png)

Verify your deployment is working on `SUBDOMAIN.mydomain.com` by checking for the `Cf-Cache-Status` header with a value of `HIT` on tile requests. This may take 2-3 attempts.

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
* [Cloudflare R2](https://blog.cloudflare.com/introducing-r2-object-storage/) incurs costs for storage, write requests and read requests. These will only happon on tile cache misses.

## Cache Invalidation

* For Cloudflare, "Purge Cache" applies to all cached resources in the zone (domain). It's recommended to deploy on a dedicated zone for this reason.
