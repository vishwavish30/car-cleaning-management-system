<template>
  <div class="container py-4">

    <div class="mb-4">
      <h2 class="text-white fw-bold">
        Payments
      </h2>

      <p class="text-light opacity-75">
        Manage monthly payments
      </p>
    </div>

    <div
      v-if="loading"
      class="text-center text-white"
    >
      Loading...
    </div>

    <div
      v-else
      class="row g-4"
    >

      <div class="row g-3 mb-4">
        <div class="col-12 col-md-4">
          <div class="summary-card">
            <div class="summary-content">
              <span class="summary-label">
                💰 Revenue
              </span>

              <span class="summary-value">
                ₹{{ paymentSummary.totalRevenue }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="summary-card">
            <div class="summary-content">
              <span class="summary-label">
                ✅ Paid
              </span>

              <span class="summary-value">
                {{ paymentSummary.paidCustomers }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="summary-card">
            <div class="summary-content">
              <span class="summary-label">
                ❌ Pending
              </span>

              <span class="summary-value">
                {{
                  cars.length -
                  paymentSummary.paidCustomers
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <input
          v-model="search"
          class="form-control"
          placeholder="Search customer..."
        />
      </div>

      <div class="d-flex gap-2 mb-4">
        <button
          class="btn"
          :class="
            filter === 'all'
              ? 'btn-primary'
              : 'btn-outline-primary'
          "
          @click="filter = 'all'"
        >
          All
        </button>

        <button
          class="btn"
          :class="
            filter === 'paid'
              ? 'btn-success'
              : 'btn-outline-success'
          "
          @click="filter = 'paid'"
        >
          Paid
        </button>

        <button
          class="btn"
          :class="
            filter === 'pending'
              ? 'btn-danger'
              : 'btn-outline-danger'
          "
          @click="filter = 'pending'"
        >
          Pending
        </button>
      </div>

      <div
        v-for="car in filteredCars"
        :key="car._id"
        class="col-md-6 col-lg-4"
      >
        <div class="payment-card">

          <h5 class="fw-bold">
            {{ car.ownerName }}
          </h5>

          <p>
            <strong>Car Number:</strong>
            {{ car.carNumber }}
          </p>

          <p>
            <strong>Monthly Amount:</strong>
            ₹{{ car.monthlyAmount }}
          </p>

          <div class="mb-3">

            <span
              v-if="
                paidCarIds.includes(
                  String(car._id)
                )
              "
              class="badge bg-success"
            >
              Paid This Month 💰
            </span>

            <span
              v-else
              class="badge bg-danger"
            >
              Payment Pending
            </span>

          </div>

          <div
            v-if="getPaymentDate(car._id)"
            class="payment-date"
          >
            📅 Paid:
            {{ getPaymentDate(car._id) }}
          </div>

          <button
            v-if="
              !paidCarIds.includes(
                String(car._id)
              )
            "
            class="btn btn-success w-100"
            @click="handleMarkPaid(car._id)"
          >
            💰 Mark Paid
          </button>

          <button
            v-else
            class="btn btn-secondary w-100"
            disabled
          >
            ✔ Payment Received
          </button>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"

import { getCars }
from "../services/carService"

import {
  markPaymentReceived,
  getCurrentMonthPayments,
  getPaymentSummary
}
from "../services/paymentService"

import { useToast }
from "vue-toastification"


const paymentSummary = ref({
  totalRevenue: 0,
  paidCustomers: 0,
})

const toast = useToast()

const cars = ref([])
const loading = ref(true)

const paidCarIds = ref([])

const search = ref("")
const filter = ref("all")

const payments = ref([])

const filteredCars = computed(() => {
  let result = cars.value.filter((car) =>
    car.ownerName
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )

  if (filter.value === "paid") {
    result = result.filter((car) =>
      paidCarIds.value.includes(String(car._id))
    )
  }

  if (filter.value === "pending") {
    result = result.filter((car) =>
      !paidCarIds.value.includes(String(car._id))
    )
  }

  return result
})

onMounted(() => {
  fetchCars()
  fetchPaidCars()
  fetchPaymentSummary()
})

const fetchCars = async () => {
  try {
    cars.value = await getCars()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const fetchPaidCars = async () => {
  try {
    payments.value =
      await getCurrentMonthPayments()

    paidCarIds.value =
      payments.value.map(
        payment =>
          String(payment.car._id)
      )
  } catch (error) {
    console.log(error)
  }
}

const fetchPaymentSummary = async () => {
  try {
    paymentSummary.value =
      await getPaymentSummary()
  } catch (error) {
    console.log(error)
  }
}

const handleMarkPaid = async (carId) => {
  try {
    await markPaymentReceived(carId)

    toast.success(
      "Payment Recorded"
    )

    await fetchPaidCars()

  } catch (error) {
    console.log(error)

    toast.error(
      error.response?.data?.message ||
      "Failed"
    )
  }
}

const getPaymentDate = (carId) => {
  const payment = payments.value.find(
    payment =>
      String(payment.car._id) === String(carId)
  )

  if (!payment) return null

  return new Date(
    payment.paidDate
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
</script>

<style scoped>
.payment-card {
  background: rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);

  border-radius: 20px;

  padding: 20px;

  color: white;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  transition: 0.3s;
}

.payment-card:hover {
  transform: translateY(-5px);
}

.payment-date {
  color: #cbd5e1;

  font-size: 14px;

  margin-bottom: 12px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.08);

  border-radius: 16px;

  padding: 16px 20px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.summary-content {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.summary-label {
  font-size: 15px;

  font-weight: 600;

  color: #ffffff;
}

.summary-value {
  font-size: 24px;

  font-weight: bold;

  color: #ffffff;
}
</style>
