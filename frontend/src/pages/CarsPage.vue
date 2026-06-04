<template>
  <div class="cars-page">
    <div class="container py-4">

      <div class="cars-header d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 class="text-white fw-bold">Cars</h2>
          <p class="text-light opacity-75">
            Manage all registered cars
          </p>
        </div>

        <!-- search functionalityy -->
        <div class="mb-4">
          <input
            v-model="search"
            class="form-control"
            placeholder="Search by owner name..."
          />
        </div>
      </div>

      <div v-if="loading" class="text-center text-white">
        Loading cars...
      </div>

      <div v-else class="row g-4">

        <div
          v-for="car in filteredCars"
          :key="car._id"
          class="col-md-6 col-lg-4"
        >
          <div class="car-card">

            <h5 class="fw-bold mb-3">
              {{ car.ownerName }}
            </h5>

            <p>
              <strong>Car Number:</strong>
              {{ car.carNumber }}
            </p>

            <p>
              <strong>Flat:</strong>
              {{ car.flatName }}
            </p>

            <p>
              <strong>Phone:</strong>
              {{ car.phoneNumber }}
            </p>

            <p>
              <strong>Monthly Amount:</strong>
              ₹{{ car.monthlyAmount }}
            </p>

        <div class="status-row">
          <span
            class="status-pill"
            :class="
              cleanedCarIds.includes(String(car._id))
                ? 'success-pill'
                : 'warning-pill'
            "
          >
            {{
              cleanedCarIds.includes(String(car._id))
                ? '🧹 Cleaned'
                : '🧹 Pending'
            }}
          </span>

          <span
            class="status-pill"
            :class="
              paidCarIds.includes(String(car._id))
                ? 'success-pill'
                : 'danger-pill'
            "
          >
            {{
              paidCarIds.includes(String(car._id))
                ? '💰 Paid'
                : '💰 Pending'
            }}
          </span>

          <span
            class="status-pill"
            :class="
              car.isActive
                ? 'success-pill'
                : 'danger-pill'
            "
          >
            {{
              car.isActive
                ? '🟢 Active'
                : '🔴 Inactive'
            }}
          </span>
        </div>

          <button
            v-if="
              car.isActive &&
              !cleanedCarIds.includes(car._id)
            "
            class="btn btn-clean w-100 mt-3"
            @click="handleMarkCleaned(car._id)"
          >
            ✅ Mark Cleaned
          </button>

          <button
            v-else-if="!car.isActive"
            class="btn btn-secondary w-100 mt-3"
            disabled
          >
            🚫 Car Inactive
          </button>

          <button
            v-else
            class="btn btn-secondary w-100 mt-3"
            disabled
          >
            ✔ Already Cleaned
          </button>


          <button
            v-if="
              car.isActive &&
              !paidCarIds.includes(String(car._id))
            "
            class="btn btn-paid w-100 mt-2"
            @click="handleMarkPaid(car._id)"
          >
            💰 Mark Paid
          </button>

          <button
            v-else-if="!car.isActive"
            class="btn btn-secondary w-100 mt-2"
            disabled
          >
            🚫 Car Inactive
          </button>

          <button
            v-else
            class="btn btn-secondary w-100 mt-2"
            disabled
          >
            ✔ Payment Received
          </button>

           <div class="d-flex gap-2 mt-3">

            <button
              class="btn btn-edit flex-fill"
              @click="editCar(car)"
            >
              ✏️ Edit
            </button>

            <button
              v-if="car.isActive"
              class="btn btn-deactivate flex-fill"
              @click="deactivateCar(car._id)"
            >
              Deactivate
            </button>

            <button
              v-else
              class="btn btn-secondary flex-fill"
              disabled
            >
              Inactive
            </button>

          </div>

          </div>
        </div>

      </div>
    </div>
  </div>


  <!-- Modal class -->

  <div
    v-if="showEditModal"
    class="modal-overlay"
  >
    <div class="modal-content">
      <div class="modal-header">

        <h4>Edit Car</h4>

        <button
          class="close-btn"
          @click="showEditModal = false"
        >
          ✕
        </button>

      </div>

      <div class="mb-3">
        <label class="form-label">
          Owner Name
        </label>

        <input
          v-model="selectedCar.ownerName"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">
          Phone Number
        </label>

        <input
          v-model="selectedCar.phoneNumber"
          class="form-control"
        />
      </div>

      <div class="mb-4">
        <label class="form-label">
          Monthly Amount
        </label>

        <input
          v-model="selectedCar.monthlyAmount"
          class="form-control"
        />
      </div>

      <div class="d-flex gap-2">

        <button
          class="btn btn-secondary flex-fill"
          @click="showEditModal = false"
        >
          Cancel
        </button>

        <button
          class="btn btn-success flex-fill"
          @click="saveCar"
        >
          Save Changes
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { getCars } from "../services/carService"
import axios from "axios"
import { useToast } from "vue-toastification"

import { markCarCleaned, getTodayCleanedCars } from "../services/cleaningService"

import {
  markPaymentReceived,
  getCurrentMonthPayments
} from "../services/paymentService"
import api from "@/services/api"

const cars = ref([])
const loading = ref(true)

const search = ref("")

const selectedCar = ref(null)
const showEditModal = ref(false)

const cleanedCarIds = ref([])
const paidCarIds = ref([])

// custom toast
const toast = useToast()

const filteredCars = computed(() => {
  return cars.value.filter((car) =>
    car.ownerName
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

onMounted(() => {
  fetchCars()
  fetchCleanedCars()
  fetchPaidCars()
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

const editCar = (car) => {
  selectedCar.value = { ...car }
  showEditModal.value = true
}

const saveCar = async () => {
  try {
    const token = localStorage.getItem("token")

    await api.put(
      `/cars/${selectedCar.value._id}`,
      {
        ownerName: selectedCar.value.ownerName,
        phoneNumber: selectedCar.value.phoneNumber,
        monthlyAmount: selectedCar.value.monthlyAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    showEditModal.value = false

    await fetchCars()

    toast.success("Car Updated Successfully")
  } catch (error) {
    console.log(error)

    toast.error("Failed To Update Car")
  }
}


const deactivateCar = async (id) => {
  try {
    const token = localStorage.getItem("token")

    await axios.patch(
      `/cars/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    toast.success("Car Deactivated")

    await fetchCars()
  } catch (error) {
    console.log(error)

    toast.error("Failed To Deactivate")
  }
}


const handleMarkCleaned = async (carId) => {
  try {
    await markCarCleaned(carId)

    toast.success("Car Marked As Cleaned")

    await fetchCleanedCars()

  } catch (error) {
    console.log(error)

    toast.error(
      error.response?.data?.message ||
      "Failed To Mark Cleaned"
    )
  }
}

const handleMarkPaid = async (carId) => {
  try {
    await markPaymentReceived(carId)

    toast.success(
      "Payment Recorded Successfully"
    )

    await fetchPaidCars()

  } catch (error) {
    console.log(error)

    toast.error(
      error.response?.data?.message ||
      "Failed To Record Payment"
    )
  }
}


const fetchCleanedCars = async () => {
  try {
    const records = await getTodayCleanedCars()

    // console.log("Records:", records)

    cleanedCarIds.value = records.map(
      record => record.car._id
    )

    // console.log("Cleaned IDs:", cleanedCarIds.value)

  } catch (error) {
    console.log(error)
  }
}

const fetchPaidCars = async () => {
  try {
    const payments =
      await getCurrentMonthPayments()

    paidCarIds.value = payments.map(
      payment => String(payment.car)
    )

    // console.log(
    //   "Paid IDs:",
    //   paidCarIds.value
    // )

  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.car-card {
  background: rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);

  border-radius: 20px;

  padding: 20px;

  color: white;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  transition: 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
}


.car-card p {
  color: rgba(255,255,255,0.9);
}


/* for modal class */

.modal-overlay {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  display: flex;

  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgba(255,255,255,0.08);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255,255,255,0.1);

  width: 500px;

  max-width: 90%;

  padding: 25px;

  border-radius: 24px;

  color: white;
}

.modal-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.close-btn {
  background: transparent;

  border: none;

  color: white;

  font-size: 22px;

  cursor: pointer;
}


.modal-content .form-control {
  background: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(255,255,255,0.15);

  color: white;
}

.modal-content .form-control::placeholder {
  color: rgba(255,255,255,0.6);
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.status-pill {
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
}

.success-pill {
  background: #d1fae5;
  color: #065f46;
}

.warning-pill {
  background: #fef3c7;
  color: #92400e;
}

.danger-pill {
  background: #fee2e2;
  color: #991b1b;
}


.btn-clean {
  background: linear-gradient(
    135deg,
    #22c55e,
    #16a34a
  );

  border: none;

  color: white;
}

.btn-paid {
  background: linear-gradient(
    135deg,
    #14b8a6,
    #0f766e
  );

  border: none;

  color: white;
}

.btn-edit {
  background: linear-gradient(
    135deg,
    #fbbf24,
    #f59e0b
  );

  border: none;

  color: white;
}

.btn-deactivate {
  background: linear-gradient(
    135deg,
    #ef4444,
    #dc2626
  );

  border: none;

  color: white;
}

.btn-clean:hover,
.btn-paid:hover,
.btn-edit:hover,
.btn-deactivate:hover {
  transform: translateY(-2px);

  transition: 0.3s;
}

@media (max-width: 768px) {
  .cars-header {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .cars-header > div {
    width: 100%;
  }
}
</style>
