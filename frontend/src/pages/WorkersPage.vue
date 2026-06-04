<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 class="text-white fw-bold">
          Workers
        </h2>

        <p class="text-light opacity-75">
          Manage all workers
        </p>
      </div>

      <button
        class="btn btn-primary"
        @click="goToRegisterWorker"
      >
        + Register Worker
      </button>

    </div>

    <div
      v-if="loading"
      class="text-center text-white"
    >
      Loading workers...
    </div>

    <div
      v-else
      class="row g-4"
    >
      <div
        v-for="worker in workers"
        :key="worker._id"
        class="col-md-6 col-lg-4"
      >
        <div class="worker-card">

          <h5 class="fw-bold mb-3">
            {{ worker.name }}
          </h5>

          <p>
            <strong>Email:</strong>
            {{ worker.email }}
          </p>

          <p>
            <strong>Role:</strong>
            {{ worker.role }}
          </p>

          <span
            class="badge"
            :class="
              worker.isActive
                ? 'bg-success'
                : 'bg-danger'
            "
          >
            {{
              worker.isActive
                ? 'Active'
                : 'Inactive'
            }}
          </span>

          <button
            v-if="worker.isActive"
            class="btn btn-danger w-100 mt-3"
            @click="deactivateWorker(worker._id)"
          >
            Deactivate Worker
          </button>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getWorkers } from "../services/workerService"
import { useRouter } from "vue-router"
import axios from "axios"
import { useToast } from "vue-toastification"

const workers = ref([])
const loading = ref(true)

const router = useRouter()
const toast = useToast()

onMounted(() => {
  fetchWorkers()
})


const fetchWorkers = async () => {
  try {
    workers.value = await getWorkers()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const goToRegisterWorker = () => {
  router.push("/register-worker")
}

const deactivateWorker = async (id) => {
  try {
    const token = localStorage.getItem("token")

    await axios.patch(
      `http://localhost:5000/api/users/deactivate/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    toast.success("Worker Deactivated")

    await fetchWorkers()
  } catch (error) {
    console.log(error)

    toast.error("Failed To Deactivate Worker")
  }
}
</script>

<style scoped>
.worker-card {
  background: rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);

  border-radius: 20px;

  padding: 20px;

  color: white;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  transition: 0.3s;
}

.worker-card:hover {
  transform: translateY(-5px);
}
</style>
