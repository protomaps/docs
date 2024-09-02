# Microsoft Azure

PMTiles can be served from a [Azure Container App]() using the [go-pmtiles Docker image](https://hub.docker.com/repository/docker/protomaps/go-pmtiles/general).

## Blob Storage

PMTiles should stored in a [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) container.

Make note of the **Storage Account Name**, region and **container name** (e.g. `main`) for the below steps.

## Creating an Azure Container App

1. In [**Create Container App**](https://portal.azure.com/#browse/Microsoft.App%2FcontainerApps), choose the same Azure region as your storage bucket. Create a new **Container Apps Environment** if necessary.

2. In **Container Details**, name your container and choose **Docker Hub or other registries** as the Image Source.

  * For **Image and Tag** input `protomaps/go-pmtiles:v1.20.1`

  * For **Command Override** input:

```
  /go-pmtiles, serve, ., --bucket=azblob://main?storage_account=account, --public-url=https://example.com
```

  * Substitute `main` for your Blob Storage container name, `account` for your Storage Account name, and `https://example.com` for the final user-facing URL you intended your tiles to be served from. If you leave this blank, TileJSON won't work.

3. In the **Ingress** tab, Enable Ingress and choose **Accepting Traffic from Anywhere**. Enter `8080` for the **Target Port**.

4. After validation runs, create your Container App.

## Service Connector

You Azure Container App needs read access to your Azure Storage Blob.

After it's initially created, choose **Service Connector (preview) > Create**.

1. for **Service Type**, choose **Storage - Blob**.

2. Choose any connection name. 

3. In the **Authentication** tab, choose **Connection String**. Click the **Advanced** tag and rename the `AZURE_STORAGEBLOB_CONNECTIONSTRING` environment variable to `AZURE_STORAGE_CONNECTION_STRING`.

4. After validation runs, create your Service Connector.

Your tiles can now be served through your Container App ingress endpoint, e.g. `https://example.name.region.azurecontainerapps.io/tileset/0/0/0.mvt`.

For TileJSON to work, `tileset.json`, re-configure your Container Command Override with the final user-facing URL for your tiles, such as `tiles.example.com`, `my-tiles.azureedge.net` for Microsoft CDN, etc.

## Cost and Latency

* By setting minimum replicas to 0, Azure Container Apps can scale to 0 when there are no requests to be served. However, cold start requests when there are 0 instances can take 10+ seconds to complete.

* Setting minimum replicas to 1 can eliminate cold starts and only incur [idle usage charges](https://azure.microsoft.com/en-us/pricing/details/container-apps/) when running. 





