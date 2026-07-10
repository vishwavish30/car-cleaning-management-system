<template>
  <div class="bg-white rounded-4 p-4">
    <h4 class="mb-3">Payment Status</h4>

    <VueApexCharts
      type="donut"
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
  paidCustomers: {
    type: Number,
    default: 0,
  },

  pendingPayments: {
    type: Number,
    default: 0,
  },
})

const series = computed(() => [
  props.paidCustomers,
  props.pendingPayments,
])

const chartOptions = computed(() => ({
  labels: ["Paid", "Pending"],

  colors: ["#06d6a0", "#e85d04"],

  chart: {
    type: "donut",
    toolbar: {
      show: false,
    },
  },

  legend: {
    position: "bottom",
    fontSize: "14px",
    fontWeight: 600,
  },

  plotOptions: {
    pie: {
      donut: {
        size: "60%",

        labels: {
          show: true,

          name: {
            show: true,
          },

          value: {
            show: true,
          },

          total: {
            show: true,
            label: "Customers",

            formatter: () =>
              props.paidCustomers + props.pendingPayments,
          },
        },
      },
    },
  },

  dataLabels: {
    enabled: false,
  },

  tooltip: {
    y: {
      formatter: (value) => `${value} Customers`,
    },
  },
}))
</script>
