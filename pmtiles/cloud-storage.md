---
title: Cloud Storage for PMTiles
outline: deep
---

# Cloud Storage for PMTiles

## Concepts

PMTiles is designed to work on any S3-compatible cloud storage platform that supports [HTTP Range Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests). Proper support for [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is required if your map frontend is hosted on a different domain than your storage platform. 

### Uploading

* Most cloud storage platforms support moderate-size uploads through a web interface.

* The [`pmtiles` command line tool](https://github.com/protomaps/go-pmtiles) has a `pmtiles upload` command for moving files to cloud storage. This requires credentials with your specific platform.

* [RClone](https://rclone.org) is another recommended tool for managing large files on S3-compatible storage. 

```sh
rclone copyto my-filename my-configuration:my-bucket/my-folder/my-filename.pmtiles --progress --s3-chunk-size=256M
```

* The [aws command-line tool](https://aws.amazon.com/cli/) can be used for uploads, as well as setting CORS configuration on any S3-compatible platform.

::: info
Storage services usually bill by number of GET requests and the total number of bytes stored. It's important to understand these costs when hosting PMTiles, as each `Range` tile request will count as a GET.
:::

## Recommended Platforms

### Cloudflare R2

**R2 is the recommended storage platform for PMTiles because it does not have bandwidth fees, only per-request fees: see [R2 Pricing](https://developers.cloudflare.com/r2/platform/pricing/#r2-pricing).**

* R2 supports HTTP/2.

* R2 CORS can be configured through a command-line utility, like the `aws` tool, or from your S2 bucket's "Settings" tab's "CORS Policy" section:

```json title="cors_rules.json"
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://example.com"],
      "AllowedMethods": ["GET","HEAD"],
      "AllowedHeaders": ["range","if-match"],
      "ExposeHeaders": ["etag"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

Example of using the `aws` command line tool to configure R2 CORS:

```
aws s3api put-bucket-cors --bucket MY_BUCKET --cors-configuration file:///home/user/cors_rules.json --endpoint-url https://S3_COMPATIBLE_ENDPOINT
```

### Amazon S3

* only HTTP/1.1 supported

* From your S3 Bucket's "Permissions" tab, scroll to the Cross-origin resource sharing (CORS) editor.

S3 Policy for public reads:

```json title="s3_permissions.json"
{
    "Version": "2012-10-17",
    "Id": "",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::example-bucket/*"
        }
    ]
}
```

S3 CORS Configuration:

* Using the AWS interface:

```json title="s3_cors.json"
[
    {
      "AllowedOrigins": ["https://example.com"],
      "AllowedMethods": ["GET","HEAD"],
      "AllowedHeaders": ["range","if-match"],
      "ExposeHeaders": ["etag"],
      "MaxAgeSeconds": 3000
    }
]
```

* The CORS can also be set using `aws s3api put-bucket-cors --bucket MY_BUCKET --cors-configuration file:///home/user/cors_rules.json` using the JSON structure shown above for Cloudflare R2.

### Google Cloud

* HTTP/2 supported

* See the [Cloud Storage CORS documentation](https://cloud.google.com/storage/docs/cross-origin)

#### CORS: Google Cloud Shell

```
echo '[{"maxAgeSeconds": 300, "method": ["GET", "HEAD"], "origin": ["https://example.com"], "responseHeader": ["range","etag","if-match"]}]' > cors.json
gsutil cors set cors.json gs://my-bucket-name
```

#### CORS: gsutil tool

Install the [gsutil tool](https://cloud.google.com/storage/docs/gsutil_install)

```json title="cors.json"
[
    {
      "origin": ["https://example.com"],
      "method": ["GET","HEAD"],
      "responseHeader": ["range","etag","if-match"],
      "maxAgeSeconds": 300
    }
]
```

```bash
gsutil cors set gcors.json gs://my-bucket-name
```

### Microsoft Azure

* only HTTP/1.1 supported

* Configuration through Web Portal

* CORS Configuration - in left sidebar **Resource Sharing (CORS)**
    * Set **Allowed Headers** to **range,if-match**
    * Set **Exposed Headers** to **range,accept-ranges,etag**

### DigitalOcean Spaces

* only HTTP/1.1 supported (even with CDN enabled)

* CORS is configured via Web UI.

* use S3Cmd config to expose `etag` header

### Backblaze B2

* Backblaze B2 only supports HTTP/1.1.

* Download the [b2 command line utility](https://www.backblaze.com/b2/docs/quick_command_line.html#download) for advanced CORS settings or use the Bucket web UI for simple settings

* See [B2 CORS Rules](https://www.backblaze.com/b2/docs/cors_rules.html)

Sample CORS Configuration: 

```json title="backblaze_cors.json"
[
    {
      "corsRuleName": "allowHeaders",
      "allowedOrigins": ["https://example.com"],
      "allowedOperations":["b2_download_file_by_name"],
      "allowedHeaders": ["range","if-match"],
      "maxAgeSeconds": 300
    }
]
```

### Supabase Storage

[Supabase Storage](https://supabase.com/storage) makes it simple to upload and serve files of any size, providing a robust framework for file access controls. Supabase Storage is pre-configured for CORS and HTTP Range Requests making it a plug-and-play solution for hosting PMTiles via [public buckets](https://supabase.com/docs/guides/storage/serving/downloads#public-buckets).

#### Restricting Access

All files uploaded in a public bucket are publicly accessible and benefit from a high CDN cache HIT ratio. However you might want to limit access to specific domains. Currently this is only possible by proxying requests through [Supabase Edge Functions](https://supabase.com/edge-functions).

You can create a simple proxy edge functions that validates the request origin and attaches an header with your projects service role key. This allows you to serve files from private buckets while still benefitting from the built in [smart CDN](https://supabase.com/docs/guides/storage/cdn/smart-cdn).

```ts
const ALLOWED_ORIGINS = ["http://localhost:3000"];
const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.join(","),
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, range, if-match",
  "Access-Control-Expose-Headers": "range, accept-ranges, etag",
  "Access-Control-Max-Age": "300",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Validate request origin.
  const origin = req.headers.get("Origin");
  console.log(origin);
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return new Response("Not Allowed", { status: 405 });
  }

  // Construct private bucket storage URL.
  const reqUrl = new URL(req.url);
  const url = `${
    Deno.env.get("SUPABASE_URL")
  }/storage/v1/object/authenticated${reqUrl.pathname}`;
  console.log(url);

  const { method, headers } = req;
  // Add auth header to access file in private bucket.
  const modHeaders = new Headers(headers);
  modHeaders.append(
    "authorization",
    `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
  );
  return fetch(url, { method, headers: modHeaders });
});
```

## Other Platforms

### GitHub Pages

GitHub pages supports repositories up to [1 GB](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits). If your PMTiles file fits, it's an easy way to host.

### Scaleway

[Scaleway Object Storage](https://www.scaleway.com/en/object-storage/) only supports HTTP/1.1.

### HTTP Servers

* [**Caddy**](https://caddyserver.com) is highly recommended for serving PMTiles because of its built-in HTTPS support. Use the `file_server` configuration to serve `.pmtiles` from a static directory.

CORS configuration:

```
  Access-Control-Allow-Methods GET,HEAD
  Access-Control-Expose-Headers ETag
  Access-Control-Allow-Headers Range,If-Match
  Access-Control-Allow-Origin http://example.com
```

As an alternative, consider using the [`pmtiles_proxy` plugin for Caddy](/deploy/server).

* **Nginx** supports HTTP Range Requests. CORS headers should be set by configuration files.

## Next steps

* [Accelerate your maps and serve from private buckets with CDN integration](/deploy/).
* Learn how to customize your map's [Basemap Layers](/basemaps/layers).


