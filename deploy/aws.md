---
title: AWS Integration
outline: deep
---

# AWS Integration

The AWS Deployment option is based on [CloudFormation](https://aws.amazon.com/cloudformation/), which automates the creation and deletion of all resources.  You don't need to install anything; simply upload a YAML to the AWS Console.

At the end of this walkthrough, you'll have a CDN-cached ZXY API, compatible with all major map renderers, serving  tiles from a private S3 bucket.

## Installation

### 1. Upload to S3

The CloudFormation template is designed to work with an existing S3 bucket.

If you need to create a new one:

* Open the [S3 Console](https://s3.console.aws.amazon.com/s3/home) and choose **Create Bucket**.
* Choose a globally unique bucket name, and any region, just remember the **region name.**
    * We'll use `protomaps-example`  as a placeholder bucket name.
    * Leave the default *ACLs disabled* and *Block all public access* setting.
    * Leave other options as the default and proceed with **Create Bucket.**
* **Upload** a PMTiles archive. For example, save [this file](https://pmtiles.io/protomaps(vector)ODbL_firenze.pmtiles) as `example.pmtiles`. Upload to your bucket via the Web Console or [a tool like rclone.](/pmtiles/cloud-storage#uploading)

### 2. CloudFormation Template

1. In the CloudFormation console for your AWS region, choose **Create Stack > With new resources (standard)**.

2. Choose **Specify Template > Upload a template file** and upload the file [cloudformation-stack.yaml](http://pmtiles.io/cloudformation-stack.yaml).

3. Provide a stack name of your choice.

4. for **Parameters**, specify:

  * The allowed CORS origins. By default, all sites (`*`) are authorized to make requests. Specify a comma-separated allowlist of sites e.g. `example.com,example.io`.

  * The name of the bucket from step 1.

  * The CloudFront cache TTL, which is how long tiles will be cached at the edge. Default 1 day.

  * (Optional) the public hostname for TileJSON. If you plan to add a custom domain like `tiles.example.com`, enter that here. Otherwise leave this blank for the default `*.cloudfront.net` hostname.


5. Proceed with **Next > Submit**, acknowledging that it might create IAM resources.

This may take a few minutes to create the CDN distribution. When that's complete, you will have a URL like `AAAA.cloudfront.net` that can be accessed directly from browsers:

```
https://SUBDOMAIN.cloudfront.net/TILESET.json # TileJSON for MapLibre
https://SUBDOMAIN.cloudfront.net/TILESET/{z}/{x}/{y}.{ext}
```

Accessing your Distribution from a web map should verify that tiles are cached on second request. Tile headers should include:

```
x-cache: Hit from cloudfront
```

You may next want to assign a custom domain name to your distribution through Route 53 and Certificate Manager and update the public hostname in step 4 above.

::: warning
AWS Lambda limits response sizes to 6 MB. This is more than enough for typical web mapping applications; you should optimize your tilesets to fit well under this limit.
:::

## Monitoring

* CloudFront will transmit metrics to the [CloudWatch us-east-1 region](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1).
* Lambda will transmit metrics to the region matching the Lambda function.

### Recommended Metrics

* **Cache Hit Rate**: All Metrics > Cloudfront > Per-Distribution Metrics > Requests
* **Lambda Invocations**: All Metrics > Lambda > By Function Name > Invocations

* **Lambda Execution Time**: All Metrics > Lambda > By Funcion Name > Duration

::: info
Typical execution times for a properly configured AWS install are 125 ms p50 (mean), 800 ms p99.
:::

## Cleanup

Deleting the CloudFormation stack will delete the CloudFront distribution, Lambda function and all associated resources, but leave the bucket untouched.

## Cache Invalidation

* For AWS Cloudfront, issue prefix-based invalidations at the [Cloudfront Console](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home). The first 1000 invalidations per month are free (a prefix = 1 invalidation).
* A cache purge will result in new billable events in Lambda and reads from the origin S3 object.

## Lambda Configuration

The raw Lambda function embedded in the CloudFormation template is also available at [lambda_function.zip](https://pmtiles.io/lambda_function.zip). Note that this must be uploaded as a `.zip` file containing the single file `index.js`.

Lambda environment variables:

* `BUCKET`: the S3 bucket name.
* `PMTILES_PATH`: optional, define how a tileset name is translated into an S3 key. Default `{name}.pmtiles`
  * Example path setting for objects in a directory: `my_folder/{name}/file.pmtiles`
* `CORS`: optional, set the value of the `Access-Control-Allow-Origin` response header. Examples: `https://example.com`, `*`. Only supports one origin, so useful for development or staging environments only. For production use you should use CloudFront CORS configuration.
* ~~`CACHE_MAX_AGE`: max age in the CloudFront cache, in seconds. default 86400, or 1 day.~~
* `CACHE_CONTROL`: HTTP header value to control caching, default `public, max-age=86400` (1 day).

