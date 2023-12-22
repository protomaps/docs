<script setup lang="ts">
import { ref, computed } from "vue";

// inputs
const tileRequests = ref(10000000);
const tilesPerView = ref(16);
const averageTileSizeKB = ref(100);
const cacheHitRate = ref(0.5);
const gbStored = ref(110);

const mapViews = computed(() => {
  return tileRequests.value / tilesPerView.value;
});

const hostedUsdPerKViews = ref(3);

const outgoingGB = computed(() => {
  return (tileRequests.value * averageTileSizeKB.value) / 1000 / 1000;
});

const formattedRequests = computed(() => tileRequests.value.toLocaleString());
const formattedMapViews = computed(() => mapViews.value.toLocaleString());
const formattedGB = computed(() => outgoingGB.value.toLocaleString());

const formattedGoogleMaps = computed(() => {
  const v = mapViews.value;
  if (v < 100000) return (v * 0.007).toLocaleString;
  else return (100000 * 0.007 + (v - 100000) * 0.0056).toLocaleString();
});

const formattedHosted = computed(() => {
  return ((mapViews.value / 1000) * hostedUsdPerKViews.value).toLocaleString();
});

const cf = computed(() => {
  const obj = {
    workerInvocationCost: (tileRequests.value / 1000 / 1000) * 0.5,
    planCost: 5,
    storageRequestCost:
      (tileRequests.value / 1000 / 1000) * (1 - cacheHitRate.value) * 0.36,
    storageCost: gbStored.value * 0.015,
  };
  obj.total =
    obj.workerInvocationCost + obj.planCost + obj.storageCost + obj.storageCost;
  return obj;
});

const aws = computed(() => {
  const obj = {
    cloudfrontGetRequestCost: (tileRequests.value / 10000) * 0.009,
    cloudfrontBandwidthCost: outgoingGB.value * 0.1,
    lambdaInvocationCost:
      (tileRequests.value / 1000 / 1000) * (1 - cacheHitRate.value) * 0.2,
    lambdaDurationCost:
      tileRequests.value * (1 - cacheHitRate.value) * 150 * 0.0000000067, // milliseconds, cost per 1ms on ARM
    s3GetObjectCost:
      (tileRequests.value / 1000) * (1 - cacheHitRate.value) * 0.0004,
    s3StorageCost: 0.023 * gbStored.value,
  };
  obj.total =
    obj.cloudfrontGetRequestCost +
    obj.cloudfrontBandwidthCost +
    obj.lambdaInvocationCost +
    obj.lambdaDurationCost +
    obj.s3GetObjectCost +
    obj.s3StorageCost;
  return obj;
});

const awsShow = ref(false);
const cfShow = ref(false);
</script>

<template>
  <div>
    <h3>Inputs</h3>
    <div>
      <input
        type="range"
        id="range"
        min="0"
        step="1000000"
        v-model.number="tileRequests"
        max="100000000"
      />
    </div>
    <div><input v-model="tileRequests" />monthly tile requests</div>
    <div>
      one viewing session loads <input v-model.number="tilesPerView" />tiles
    </div>
    <div>
      average tile size <input v-model.number="averageTileSizeKB" />kilobytes
    </div>
    <div><input v-model.number="cacheHitRate" />% CDN cache hit rate</div>
    <div><input v-model.number="gbStored" /> gigabytes on cloud storage</div>
  </div>
  <br />
  <div>
    <div>
      <strong>{{ formattedRequests }}</strong> monthly tile requests
    </div>
    <div>
      <strong>{{ formattedMapViews }}</strong> monthly map viewer sessions
    </div>
    <div>
      <strong>{{ formattedGB }} GB</strong> outgoing bandwidth to Internet
    </div>
  </div>
  <div>
    <h3>Google Maps</h3>
    <strong>{{ formattedGoogleMaps }} USD</strong> per month
    <div>
      Reference:
      <a
        href="https://developers.google.com/maps/documentation/javascript/usage-and-billing"
        >SKU: Dynamic Maps</a
      >
    </div>
  </div>
  <div>
    <h3>Hosted Map API</h3>
    <div>
      <input v-model.number="hostedUsdPerKViews" /> USD per 1,000 sessions
    </div>
    <strong>{{ formattedHosted }} USD</strong> per month
  </div>
  <div>
    <h3>Protomaps on AWS</h3>
    <strong>{{ aws.total.toFixed(2) }} USD</strong> per month
    <div class="showBreakdown" v-on:click="awsShow = !awsShow">
      {{ awsShow ? "Hide" : "Show" }} cost breakdown
    </div>
    <table v-show="awsShow">
      <thead>
        <tr>
          <th>Resource</th>
          <th>Unit Cost</th>
          <th>Multiplier</th>
          <th>Units</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CloudFront GET Requests</td>
          <td>
            <a href="https://aws.amazon.com/cloudfront/pricing/">
              0.009 / 10,000 (estimated)
            </a>
          </td>
          <td></td>
          <td>{{ tileRequests.toLocaleString() }}</td>
          <td>{{ aws.cloudfrontGetRequestCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>CloudFront Bandwidth to Internet</td>
          <td>
            <a href="https://aws.amazon.com/cloudfront/pricing/">
              0.10 / GB (estimated)
            </a>
          </td>
          <td></td>
          <td>{{ outgoingGB.toLocaleString() }} GB</td>
          <td>{{ aws.cloudfrontBandwidthCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Lambda Function Invocations</td>
          <td>
            <a href="https://aws.amazon.com/lambda/pricing/">
              0.60 / 1,000,000
            </a>
          </td>
          <td>
            {{ 1 - cacheHitRate }} ({{ cacheHitRate * 100 }}% cache hit rate)
          </td>
          <td>
            {{ (tileRequests * (1 - cacheHitRate)).toLocaleString() }}
          </td>
          <td>{{ aws.lambdaInvocationCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Lambda Compute</td>
          <td>
            <a href="https://aws.amazon.com/lambda/pricing/">
              0.0000000067 / 1ms
            </a>
          </td>
          <td>
            {{ 1 - cacheHitRate }} ({{ cacheHitRate * 100 }}% cache hit rate) *
            4 (512 MB RAM, avg. 200 ms duration)
          </td>
          <td>
            {{ (tileRequests * (1 - cacheHitRate) * 5).toLocaleString() }}
          </td>
          <td>{{ aws.lambdaDurationCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>S3 Bandwidth to CloudFront</td>
          <td>
            <a href="https://aws.amazon.com/cloudfront/pricing/"> 0.00 </a>
          </td>
          <td></td>
          <td>{{ (outgoingGB * (1 - cacheHitRate)).toFixed(2) }} GB</td>
          <td>0.00</td>
        </tr>
        <tr>
          <td>S3 GetObject Requests</td>
          <td>
            <a href="https://aws.amazon.com/s3/pricing/"> 0.0004 / 1000 </a>
          </td>
          <td>{{ 1 - cacheHitRate }}</td>
          <td>
            {{ (tileRequests * (1 - cacheHitRate)).toLocaleString() }}
          </td>
          <td>{{ aws.s3GetObjectCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>S3 Storage Costs</td>
          <td>
            <a href="https://aws.amazon.com/s3/pricing/"> 0.023 / GB </a>
          </td>
          <td></td>
          <td>{{ gbStored }} GB</td>
          <td>{{ aws.s3StorageCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td><strong>Total</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <strong>{{ aws.total.toFixed(2) }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h3>Protomaps on Cloudflare</h3>
    <strong>{{ cf.total.toFixed(2) }} USD</strong> per month
    <div class="showBreakdown" v-on:click="cfShow = !cfShow">
      {{ cfShow ? "Hide" : "Show" }} cost breakdown
    </div>
    <table v-show="cfShow">
      <thead>
        <tr>
          <th>Resource</th>
          <th>Unit Cost</th>
          <th>Multiplier</th>
          <th>Units</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Workers Invocations</td>
          <td>
            <a
              href="https://developers.cloudflare.com/workers/platform/pricing"
            >
              0.50 / million
            </a>
          </td>
          <td></td>
          <td>{{ tileRequests.toLocaleString() }}</td>
          <td>{{ cf.workerInvocationCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Workers Paid Plan</td>
          <td>
            <a
              href="https://developers.cloudflare.com/workers/platform/pricing"
            >
              5.00
            </a>
          </td>
          <td></td>
          <td></td>
          <td>{{ cf.planCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Bandwidth</td>
          <td>0.00</td>
          <td></td>
          <td>{{ outgoingGB }} GB</td>
          <td>0.00</td>
        </tr>
        <tr>
          <td>R2 GetObject Requests</td>
          <td>0.36 / million</td>
          <td>
            {{ 1 - cacheHitRate }} ({{ cacheHitRate * 100 }}% cache hit rate)
          </td>
          <td>
            {{ (tileRequests * (1 - cacheHitRate)).toLocaleString() }}
          </td>
          <td>{{ cf.storageRequestCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td>R2 Storage Costs</td>
          <td>0.015 / GB</td>
          <td>{{ gbStored }} GB</td>
          <td></td>
          <td>{{ cf.storageCost.toFixed(2) }}</td>
        </tr>
        <tr>
          <td><strong>Total</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <strong>{{ cf.total.toFixed(2) }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  width: 5rem;
}

#range {
  width: 100%;
}

#notes {
  color: #777;
}

.showBreakdown {
  cursor: pointer;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
