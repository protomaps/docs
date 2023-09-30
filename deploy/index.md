---
title: Why deploy Protomaps on a CDN?
description: Accelerating Protomaps for high performance
---


Protomaps is designed for simple CDN deployment, to turn your tilesets from these URLs:

```
https://s3.mycloudstorage.com/world.pmtiles
```

To these URLs:

```
https://tiles.myglobalcdn.com/myvectordata/{z}/{x}/{y}.mvt
https://tiles.myglobalcdn.com/myrasterdata/{z}/{x}/{y}.png
```

These installation guides should take **less than one hour** to deploy.

## Advantages

* Serve tilesets to the web **securely from private storage buckets.**

* **Cache tiles at the edge** for the fastest response to users, taking advantage of global CDN presence. Single-region buckets can have multi-second latencies for users far away; CDN cache hits can respond in 100 millisconds or less.

* **Backwards compatibility** with existing map clients that use Z/X/Y map URLs.

* **Affordable costs at scale.** There are no servers to maintain, and you pay nothing if there's no traffic.


## Components

A CDN deployment of Protomaps has three parts:

* The data: **a storage bucket** containing PMTiles archives.

* A **serverless function** that decodes incoming URLs into ranges and returns the tile bytes.

* A **edge network** that caches the responses from serverless functions.

## Next steps

* [Deploy Protomaps on Cloudflare.](/docs/cdn/cloudflare)
* [Deploy Protomaps on AWS.](/docs/cdn/aws)



## Comparison

| feature | static pmtiles | Cloudflare |  AWS | [Caddy](/deploy/server#caddy) | `pmtiles serve` |
| - | - | :-| -: | - | - | 
| Z/X/Y compatible | | ✅ | ✅ |✅ | ✅ |
|  edge caching | |  ✅ |  ✅ |   With CDN | With CDN |
|  SSL |  ✅ |  ✅ |  ✅ |  ✅ | With reverse proxy |
| scale to zero |  ✅ |  5 USD |  ✅ | | |
