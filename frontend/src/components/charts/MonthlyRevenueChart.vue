<template>
  <div class="bg-white rounded-4 p-4">
    <h4 class="mb-3">Monthly Revenue</h4>

    <VueApexCharts
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>


<script setup>
import { computed } from "vue"
import VueApexCharts from "vue3-apexcharts"

const props = defineProps({
  monthlyRevenue: {
    type: Array,
    default: () => [],
  },
})

const categories = computed(() =>
  props.monthlyRevenue.map((item) => item.month)
)

const series = computed(() => [
  {
    name: "Revenue",
    data: props.monthlyRevenue.map((item) => item.revenue),
  },
])

const chartOptions = computed(() => ({
  chart: {
    type: "line",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: categories.value,
  },

  stroke: {
    curve: "smooth",
    width: 4,
  },

  markers: {
    size: 5,
  },

  grid: {
    borderColor: "#e5e7eb",
  },

  yaxis: {
    min: 0,
    labels: {
      formatter: (value) => `₹${value}`,
    },
  },

  dataLabels: {
    enabled: false,
  },
}))
</script>

