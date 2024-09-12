# Google Cloud

PMTiles can be served from a [Cloud Run container](https://console.cloud.google.com/run) using the [go-pmtiles Docker image](https://hub.docker.com/repository/docker/protomaps/go-pmtiles/general).

## Cloud Storage

The Cloud Run container is designed to work with existing Cloud Storage buckets.

If you need to create a new Bucket:

1. Choose **+ Create** in the [Cloud Storage console](https://console.cloud.google.com/storage).

2. Pick a globally unique name for your bucket.

3. For **Location Type**, choose **Region: Lowest latency within a single region** and make a region choice.

4. Leave **Storage Class** and **Prevent Public Access** as the defaults.

5. Uncheck **Data Protection > Soft Delete Policy**.

6. Upload a sample PMTiles into your bucket.

## Creating a Cloud Run container

1. In the [Cloud Run console](https://console.cloud.google.com/run), choose **Create Service**.

2. Choose **Deploy one revision from an existing container image.**

3. Specify the Container image URL `protomaps/go-pmtiles:v1.21.0`.

4. Choose a descriptive **Service name** like `protomaps-demo`.

5. Select the same **Region** as your Cloud Storage bucket.

6. Select **Allow unauthenticated invocations.**

7. For CPU Allocation **Service Autoscaling**, leave the defaults (only allocated during processing + 0 minimum instances).

8. Under **Container(s), Volumes, Networking, Security**:
  
  1. Leave the default container port (8080).

  2. Leave the container command blank (default entry point)

  3. Specify the arguments: `serve . --bucket=gs://BUCKET --cache-size=500 --public-url=https://example.com` replacing `BUCKET` with the name of your bucket and `https://example.com` with your custom domain. (You may need to enter this manually in the Console for it to interpret spaces correctly.)

  4. Set `Memory` to 1 GiB.

  5. Change **Execution Environment** to **2nd Generation**.

  6. Set **Maximum Number of Instances** to 1.

By default, Cloud Run projects in the same Project as the Storage bucket will create a Service Account to authenticate to the bucket.

You should now be able to access your tileset at these URLs:

```
https://EXAMPLE.REGION.run.app/TILESET/0/0/0.mvt
https://EXAMPLE.REGION.run.app/TILESET.json # TileJSON,requires --public-url to be set
```

Edge caching can be configured through [Google Cloud CDN](https://cloud.google.com/cdn?hl=en) in front of this Cloud Run URL.
