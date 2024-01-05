---
title: pmtiles CLI
outline: deep
---

# pmtiles CLI

## CLI Overview

### Remote archives

Remote buckets are specified in the CLI via URLS. Commands are similar to:

```
pmtiles [COMMAND] [KEY] --bucket=[PROTOCOL]://[BUCKET_NAME]
```

The bucket URL can contain query parameters like:

* `endpoint`: If not using AWS, an S3-compatible HTTPS endpoint.
* `region`: a provider-specific region string, such as `us-west-2` for AWS, and `auto` for all Cloudflare regions.

Example of reading from a private Cloudflare R2 bucket:

Since this command uses URL characters like `?` and `&`, those **must be escaped** by a backslash `\`.

```sh
export AWS_ACCESS_KEY_ID=MY_KEY
export AWS_SECRET_ACCESS_KEY=MY_SECRET
pmtiles show NAME.pmtiles --bucket=s3://R2_BUCKET_NAME\?endpoint=https://R2_ACCOUNT_ID.r2.cloudflarestorage.com\&region=auto
```

Note that S3-compatible storage servers like Minio, Ceph and SeaweedFS may require [additional URL options](https://gocloud.dev/howto/blob/#s3-compatible) like `s3ForcePathStyle=true`.

## Commands

### show

```bash
pmtiles show INPUT.pmtiles
```

Print an archive's header data and metadata.

### tile

```bash
pmtiles tile INPUT.pmtiles 0 0 0
```

Output a single tile to stdout.

### verify

```bash
pmtiles verify INPUT.pmtiles
```

Check that an archive is ordered correctly and has correct header information.

### extract

```bash
pmtiles extract INPUT.pmtiles OUTPUT.pmtiles --bbox=MIN_LON,MIN_LAT,MAX_LON,MAX_LAT
pmtiles extract INPUT.pmtiles OUTPUT.pmtiles --region=REGION.geojson
```

Create a smaller archive from a larger archive.

### serve

```bash
pmtiles serve .
```

Run a Z/X/Y server for a directory or bucket of archives.

### convert

```bash
pmtiles convert INPUT.mbtiles OUTPUT.pmtiles
```

Convert from MBTiles.

### version

```bash
pmtiles version
```

Print the version of the command line tool.
