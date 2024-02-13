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

* **Affordable costs at scale.** There are no servers to maintain for AWS and Cloudflare deployments, and you pay nothing if there's no traffic.

## Components

A CDN deployment of Protomaps has three parts:

* The data: **a storage bucket** containing PMTiles archives.

* A **serverless function** that decodes incoming URLs into ranges and returns the tile bytes.

* A **edge network** that caches the responses from serverless functions.

## Next steps

* [Deploy PMTiles on Cloudflare](/deploy/cloudflare)
* [Deploy PMTiles on AWS](/deploy/aws)
* [Deploy PMTiles with the Caddy web server](/deploy/server)

## Deployement Comparison Chart

_Cloudflare is recommended for budget minded beginners. AWS is recommended for advanced developers who are monetizing their map to offset increased marginal tile serving costs or require a faster map._

| feature | static pmtiles | Cloudflare |  AWS | [Caddy](/deploy/server#caddy) | `pmtiles serve` |
| - | :-: | :-:| :-: | :-: | - | 
| Z/X/Y compatible | ✖️    | ✅        | ✅    | ✅       | ✅                  |
| Edge caching     | ✖️    |  ✅       |  ✅   | With CDN | With CDN           |
| SSL              |  ✅  |  ✅       |  ✅   |  ✅       | With reverse proxy |
| Scale to zero    | ✅   |  $5 (USD) |  ✅   | ✖️        |  ✖️                 |
| Setup effort     | 😓   | 😓        | 😓    | 😓😓     | 😓😓😓               |
| Latency          | 🚀   |  🚀       |  🚀🚀🚀 | 🚀🚀     | 🚀🚀🚀              |
| Cost             | 💰   |  💰       |  💰💰💰 | 💰💰     | 💰💰                |

### Feature explanation

- **Z/X/Y compatible**: Can tiles be requested as standard web mapping zoom, x, y tile coordinates?
- **Edge caching**: Includes easy to configure edge network for content distribution (or manually paired with CDN) to achieve faster latency?
- **SSL**: Supports encrypted link between tile server and client map library?
- **Scale to zero**: Does the serverless function scale to zero cost during periods of low usage?
- **Setup effort**: Developer time to configure complete cloud tile serving solution, less effort 😓 is better than more 😓😓😓 effort
- **Latency**: Speedy maps tiles 🚀🚀🚀 load in ≤ 200 ms in the client for customers, slow tiles 🚀 load ≥ 500 ms
- **Cost**: Total cost to run tile serving system, with 💰 being cheaper at $5 USD and 💰💰💰 more expensive options that including storage egress and/or CDN bandwidth costs to achieve lower latency

### Coming soon

- **Azure** support is in development and planned for 2024.
