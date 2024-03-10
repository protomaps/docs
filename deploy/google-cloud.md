# Google Cloud

PMTiles can be served from a [Cloud Run container](https://console.cloud.google.com/run) using the [go-pmtiles Docker image](https://hub.docker.com/repository/docker/protomaps/go-pmtiles/general).

## Cloud Storage

## Service Account

## Creating a Cloud Run container

1. In the [Cloud Run console](https://console.cloud.google.com/run), choose **Create Service**.

2. Choose **Deploy one revision from an existing container image.**

3. Specify the Container image URL `protomaps/go-pmtiles:latest`.

4. Choose a descriptive **Service name** like `protomaps-demo`.

5. Select the same **Region** as your Cloud Storage bucket.

6. Select **Allow unauthenticated invocations.**

7. For CPU Allocation **Service Autoscaling**, leave the defaults (only allocated during processing + 0 minimum instances).

8. Under **Container(s), Volumes, Networking, Security**:
  
  1. Leave the default container port (8080).

  2. Leave the container command blank (default entry point)

  3. Specify the arguments: `serve . --bucket=gs://BUCKET --cache-size=500 --public-url=https://example.com` replacing `BUCKET` with the name of your bucket and `https://example.com` with your custom domain.

  4. Set `Memory` to 1 GiB.

  5. Change **Execution Environment** to **2nd Generation**.

  6. Set **Maximum Number of Instances** to 1.


