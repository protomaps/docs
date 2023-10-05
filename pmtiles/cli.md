---
title: pmtiles CLI
outline: deep
---

# pmtiles CLI

## CLI Overview

### Buckets

:::warning
This section is under construction.
:::

### Remote archives

:::warning
This section is under construction.
:::

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
