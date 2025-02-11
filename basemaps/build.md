# Building a custom basemap

## Advantages

* Clipping - build a custom, focused area map.
* Data - Build tiles from older or more frequent OpenStreetMap instead of the daily build.
* Customization - modify the Java code to include custom tags.

## Input data

* a OSM PBF extract. Ways you can get this:

* planet.openstreetmap.org or mirrors.
* A static download site like Geofabrik.
* A Custom area download ste like SliceOSM.

## Example: a city-sized extract

The build process requires Maven and Java version 21+ to be installed.

`--clip`: A provided JSON.


## Planet Build

### System Requirements

For generating the entire planet:

* CPU: More CPU cores are better. Recommended: Intel Core i9 series, AMD Ryzen 9 series, e.g. (intel Core i9-13900, AMD Ryzen 7950X)
* RAM: At least 64GB of RAM.
* Storage: At least 512GB of NVMe SSD storage.

