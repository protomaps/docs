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

* R2 CORS must be configured through a command-line utility like the `aws` tool:

```json title="cors_rules.json"
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://example.com"],
      "AllowedHeaders": ["range"],
      "AllowedMethods": ["GET","HEAD"],
      "MaxAgeSeconds": 3000,
      "ExposeHeaders": ["ETag"]
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

```json title="s3_cors.json"
{
  "CORSRules": [
      {
          "AllowedHeaders": ["Range"],
          "AllowedMethods": ["GET","HEAD"],
          "AllowedOrigins": ["https://example.com"],
          "ExposeHeaders": ["ETag"]
      }
  ]
}
```

### Google Cloud

* HTTP/2 supported

* See the [Cloud Storage CORS documentation](https://cloud.google.com/storage/docs/cross-origin)

* Install the [gsutil tool](https://cloud.google.com/storage/docs/gsutil_install) to set CORS headers

```json title="google_cloud_cors.json"
[
    {
      "origin": ["https://example.com"],
      "method": ["GET","HEAD"],
      "responseHeader": ["range","etag"],
      "maxAgeSeconds": 300
    }
]
```

```bash
gsutil cors set google_cloud_cors.json gs://my-bucket-name
```

### Microsoft Azure

* only HTTP/1.1 supported

* Configuration through Web Portal

* CORS Configuration - in left sidebar **Resource Sharing (CORS)**
    * Set **Allowed Headers** to **Range**
    * Set **Exposed Headers** to **range,accept-ranges,etag**

### DigitalOcean Spaces

* only HTTP/1.1 supported (even with CDN enabled)

* CORS is configured via Web UI.

* use S3Cmd config to expose `ETag` header

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
      "allowedHeaders": ["range"],
      "maxAgeSeconds": 300
    }
]
```

## Other Platforms

### GitHub Pages

GitHub pages supports repositories up to [1 GB](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits). If your PMTiles file fits, it's an easy way to host.

### Scaleway

[Scaleway Object Storage](https://www.scaleway.com/en/object-storage/) only supports HTTP/1.1.

### HTTP Servers

* [**Caddy**](https://caddyserver.com) is highly recommended for serving PMTiles because of its built-in HTTPS support. Use the `file_server` configuration to serve `.pmtiles` from a static directory.

As an alternative, consider using the [`pmtiles_proxy` plugin for Caddy](/deploy/server).

* **Nginx** supports HTTP Range Requests. CORS headers should be set by configuration files.

## Next steps

* [Accelerate your maps and serve from private buckets with CDN integration](/deploy/).
* Learn how to customize your map's [Basemap Layers](/basemaps/layers).


