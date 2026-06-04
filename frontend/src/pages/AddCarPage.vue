<template>
  <div class="add-car-page">
    <div class="container py-5">

      <div class="form-card">

        <h2 class="mb-4 text-center">
          Add New Car
        </h2>

        <div class="mb-3">
          <label class="form-label">Owner Name</label>
          <input
            v-model="ownerName"
            class="form-control"
            placeholder="Enter owner name"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Flat Name</label>
          <input
            v-model="flatName"
            class="form-control"
            placeholder="Enter flat name"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Car Number</label>
          <input
            v-model="carNumber"
            class="form-control"
            placeholder="TN01AB1234"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Phone Number</label>
          <input
            v-model="phoneNumber"
            class="form-control"
            placeholder="9876543210"
          />
        </div>

        <div class="mb-4">
          <label class="form-label">Monthly Amount</label>
          <input
            v-model="monthlyAmount"
            type="number"
            class="form-control"
            placeholder="1500"
          />
        </div>

        <button
          class="btn btn-primary w-100"
          @click="addCar"
        >
          Add Car
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useToast } from "vue-toastification"

const router = useRouter()

const ownerName = ref("")
const flatName = ref("")
const carNumber = ref("")
const phoneNumber = ref("")
const monthlyAmount = ref("")

const toast = useToast()

const addCar = async () => {
  try {
    const token = localStorage.getItem("token")

    await axios.post(
      "http://localhost:5000/api/cars",
      {
        ownerName: ownerName.value,
        flatName: flatName.value,
        carNumber: carNumber.value,
        phoneNumber: phoneNumber.value,
        monthlyAmount: monthlyAmount.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    toast.success("Car Added Successfully")

    router.push("/cars")
  } catch (error) {
    console.log(error)

    toast.error("Failed To Add Car")
  }
}
</script>

<style scoped>
.form-card {
  max-width: 600px;

  margin: auto;

  background: rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);

  border-radius: 20px;

  padding: 30px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  color: white;
}

.form-control {
  height: 50px;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.08);

  border: 1px solid rgba(255,255,255,0.15);

  color: white;
}

.form-control::placeholder {
  color: rgba(255,255,255,0.6);
}

.form-label {
  color: white;

  font-weight: 500;
}

.btn {
  height: 50px;
  border-radius: 12px;
  font-weight: 600;
}
</style>
