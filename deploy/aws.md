---
title: AWS Integration
outline: deep
---

# AWS Integration

## Installation

### 1. Upload to S3

* Open the [S3 Console](https://s3.console.aws.amazon.com/s3/home) and choose **Create Bucket**.
* The name must be globally unique. Choose any region, just remember the **region name.**
    * We'll use `protomaps-example`  as a placeholder bucket name.
    * Leave the default *ACLs disabled* and *Block all public access* setting.
    * Leave other options as the default and proceed with Create Bucket.
* **Upload** a PMTiles archive: we'll use `my_file.pmtiles` as an example: to your bucket via the Web Console or a tool like `pmtiles` or `rclone`.

### 2. Lambda function

* Open the **Lambda** dashboard in the **same region as your bucket.**
* Choose **Create Function**.
    * Name your function `protomaps`.
    * For Runtime, leave the default choice `Node.js 18.x`.
    * For Architecture, choose `arm64`.
    * Under Change Default Execution Role, leave the default `Create a new role with basic Lambda Permissions`.
        * This will auto-generate a role name.
    * Under Advanced Settings, Choose **Enable Function URL.**
        * Under **Auth Type**, choose `NONE`.
    * Proceed with Create Function.
* On the Configuration tab, choose **General Configuration** > **Edit**.
    * set `Memory` to **512 MB**. This is required, and more cost effective than the default of 128.
* On the Configuration tab, choose **Environment Variables** > **Edit**.
    * set `BUCKET` to your unique **bucket name** from Step 1.
    * set `PUBLIC_HOSTNAME` to the **public custom domain name you'll assign to your CloudFront distribution.** *TileJSON responses won't work without setting this.* Example: `tiles.example.com`
* In the **Code** tab, replace the code contents with the bundled [index.mjs](https://pmtiles.io/lambda_function.zip) from [PMTiles/serverless/aws](https://github.com/protomaps/PMTiles/tree/main/serverless/aws).
* Choose **Deploy** to deploy the function.

### 3. Lambda role permissions

* In the **Configuration** > **Permissions** tab, follow the link under **Execution Role > Role Name** to navigate to the function's IAM role.
* On the right side, choose **Add Permissions > Create Inline Policy**.
* Choose the **JSON** tab and paste in the following:

(Replace `protomaps-example` with your bucket created in Step 1)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::protomaps-example/*"
        }
    ]
} 
```

* Give this policy any name eg `protomaps-lambda` and **Create Policy**.
* Return to your Lambda function's **Configuration** and **Function URL**  page.

The Function URL that looks like `https://AAAA.lambda-url.region-name.on.aws/` is now active.

Make a test request for the `/my_file/0/0/0.mvt` (or `.png`, `.jpg` - whatever matches your data) path in your browser. This should succeed with your tile data!

::: warning
This Public Lambda URL should not be used directly by browsers because it lacks caching and CORS headers, which we'll configure next.
:::

### 4. CloudFront

* Navigate to the CloudFront Dashboard and choose **Create Distribution**.

* Enter your Lambda Function URL under **Origin Domain**.

* for Cache Policy, choose **CachingOptimized** which sets a default TTL of 86400 seconds.

* for Viewer Protocol Policy, choose **Redirect HTTP to HTTPS**.

* Under Response Headers Policy, choose **Create Policy**.

    * enter a name `protomaps-cors`

    * Enable the slider **Configure CORS**.

    * Choose **Customize** under Access-Control-Allow-Origin and enter full allowed origins e.g. `https://example.com`

    * Leave other settings as the default and proceed with **Create**.

    * Return to the CloudFront Configuration and choose `protomaps-cors` in the **Response headers policy** dropdown (you might need to refresh).

* Under Settings, check **HTTP/3** in addition to HTTP/2.

* Enter a **Description** like `protomaps`.

* Proceed with Create Distribution.

This may take a few minutes, where the `Last modified` value will display `... Deploying`. When that's complete, you will have a working CloudFront distribution at a URL like `AAAA.cloudfront.net` that can be accessed directly from browsers.

Accessing your Distribution from a web map should verify that tiles are cached on second request. Tile headers should include:

```
x-cache: Hit from cloudfront
```

You may next want to assign a custom domain name to your distribution through Route 53 and Certificate Manager.

## Configuration

Configure these Lambda environment variables:

* `BUCKET`: the S3 bucket name.
* `PMTILES_PATH`: optional, define how a tileset name is translated into an S3 key. Default `{name}.pmtiles`
  * Example path setting for objects in a directory: `my_folder/{name}/file.pmtiles`
* `CORS`: optional, set the value of the `Access-Control-Allow-Origin` response header. Examples: `https://example.com`, `*`. Only supports one origin, so useful for development or staging environments only. For production use you should use CloudFront CORS configuration.
* ~~`CACHE_MAX_AGE`: max age in the CloudFront cache, in seconds. default 86400, or 1 day.~~
* `CACHE_CONTROL`: HTTP header value to control caching, default `public, max-age=86400` (1 day).

## Accessing your Tiles

The default Cloudfront URL for your tiles:

```
https://SUBDOMAIN.cloudfront.net/ARCHIVE_NAME/{z}/{x}/{y}.{ext}
```

where `{ext}` is the file extension - `mvt`, `jpg`, or `png` - matching your tileset, and `SUBDOMAIN` is found at the **Distribution Domain Name** in the [CloudFront Console](https://us-east-1.console.aws.amazon.com/cloudfront/v3/).

If you're using [MapLibre](/pmtiles/maplibre), it's more convenient to fetch [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/3.0.0), which will detect the tileset `minzoom` and `maxzoom`:

```
https://SUBDOMAIN.cloudfront.net/ARCHIVE_NAME.json
```

## TileJSON

You can access a [TileJSON](https://github.com/mapbox/tilejson-spec) document for each tileset:

```
https://PUBLIC_HOSTNAME/ARCHIVE_NAME.json
```

These endpoints will return a 404 unless the `PUBLIC_HOSTNAME` environment variable is set.


## Cache Invalidation

* For AWS Cloudfront, issue prefix-based invalidations at the [Cloudfront Console](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home). The first 1000 invalidations per month are free (a prefix = 1 invalidation).
* A cache purge will result in new billable events in Lambda and reads from the origin S3 object.

## Monitoring

* CloudFront will transmit metrics to the [CloudWatch us-east-1 region](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1).
* Lambda will transmit metrics to the region matching the Lambda function.

### Recommended Metrics

* **Cache Hit Rate**: All Metrics > Cloudfront > Per-Distribution Metrics > Requests
* **Lambda Invocations**: All Metrics > Lambda > By Function Name (protomaps) > Invocations

* **Lambda Execution Time**: All Metrics > Lambda > By Funcion Name (protomaps) > Duration

::: info
Typical execution times for a properly configured AWS install are 125 ms p50 (mean), 800 ms p99.
:::


## Cleanup


* **Disable** and then **Delete** the **CloudFront Distribution**.
* Delete the **Lambda function and associated policy**
* Delete the **S3 Bucket.**
* Delete the **IAM role.**
* (Custom domain name) **Delete** the certificate in **Certificate Manager.**
* (Custom domain name) **Delete** the A and AAAA entries in **Route 53**.


## Other Deployment Options

### Lambda@Edge

Lambda@Edge's multi-region features have little benefit when fetching data from S3 in a single region, and Lambda@Edge [doesn't support](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html) environment variables or responses over 1 MB. For globally distributed caching, use CloudFront in combination with Lambda Function URLs.

### API Gateway

* your Lambda Proxy Integration route will need to specify a greedy capturing parameter called `proxy` e.g. `/{proxy+}` (the default).
* API Gateway responses will always be GZIP-encoded, to work around binary content detection problems.
