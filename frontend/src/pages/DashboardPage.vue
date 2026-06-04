<template>
  <div class="dashboard-page">
    <div class="container-fluid p-4">
      <div class="mb-4">
        <h2 class="fw-bold text-white">Dashboard</h2>
        <p class="text-light opacity-75">Welcome back 👋</p>
      </div>

      <div class="row g-4">

        <div class="col-md-6 col-xl-3">
          <div class="stat-card">
            <h6>Total Cars</h6>
            <h2>{{ stats.totalCars }}</h2>
          </div>
        </div>

        <template v-if="role === 'admin'">

          <div class="col-md-6 col-xl-3">
            <div class="stat-card">
              <h6>Revenue This Month</h6>
              <h2>
                ₹{{ paymentSummary.totalRevenue }}
              </h2>
            </div>
          </div>

          <div class="col-md-6 col-xl-3">
            <div class="stat-card">
              <h6>Paid Customers</h6>
              <h2>
                {{ paymentSummary.paidCustomers }}
              </h2>
            </div>
          </div>

          <div class="col-md-6 col-xl-3">
            <div class="stat-card">
              <h6>Pending Customers</h6>
              <h2>
                {{
                  stats.totalCars -
                  paymentSummary.paidCustomers
                }}
              </h2>
            </div>
          </div>

        </template>

      </div>

      <div class="row mt-4 g-4">
        <div class="col-lg-8">
          <div class="content-card">
            <h5 class="mb-3">Today's Summary</h5>

            <ul class="list-group">
              <li class="list-group-item">
                Cars Cleaned Today:
                {{ summary.cleanedToday }}
              </li>

              <li class="list-group-item">Pending Cars: Coming Soon</li>

              <li class="list-group-item">Daily Tracking Active ✅</li>
            </ul>
          </div>
        </div>

        <div
          v-if="role === 'admin'"
          class="col-lg-4">

          <div class="content-card">
            <h5 class="mb-3">Quick Actions</h5>

            <button
              class="btn btn-primary w-100 mb-2"
              @click="goToAddCar"
            >
              Add New Car
            </button>

            <button
              class="btn btn-success w-100 mb-2"
              @click="goToCars"
            >
              View Cars
            </button>

            <button
              class="btn btn-warning w-100"
              @click="goToWorkers"
            >
              Manage Workers
            </button>

          </div>
        </div>

      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="content-card">
            <h5 class="mb-3">Today's Cleaned Cars</h5>

            <div v-if="cleanedCars.length === 0">No cars cleaned today.</div>

            <ul v-else class="list-group">
              <li v-for="record in cleanedCars" :key="record._id" class="list-group-item">
                ✅ {{ record.car.ownerName }}
                -
                {{ record.car.carNumber }}

                <br />

                <small>
                  Cleaned By:
                  {{ record.worker.name }}
                </small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDashboardStats } from "../services/dashboardService";
import { useRouter } from "vue-router";

import { getTodaySummary, getTodayCleanedCars } from "../services/cleaningService";

import { getPaymentSummary } from "../services/paymentService"

const router = useRouter();

const cleanedCars = ref([]);

const stats = ref({
  totalCars: 0,
  totalWorkers: 0,
  activeCars: 0,
  inactiveCars: 0,
});

const summary = ref({
  cleanedToday: 0,
});

const paymentSummary = ref({
  totalRevenue: 0,
  paidCustomers: 0,
});

const role = localStorage.getItem("role")

onMounted(() => {
  fetchStats();
  fetchSummary();
  fetchCleanedCars();
  fetchPaymentSummary()
});

const fetchStats = async () => {
  try {
    stats.value = await getDashboardStats();
  } catch (error) {
    console.log(error);
  }
};

const fetchSummary = async () => {
  try {
    summary.value = await getTodaySummary();
  } catch (error) {
    console.log(error);
  }
};

const fetchCleanedCars = async () => {
  try {
    cleanedCars.value = await getTodayCleanedCars();
  } catch (error) {
    console.log(error);
  }
};

const fetchPaymentSummary = async () => {
  try {
    paymentSummary.value =
      await getPaymentSummary()
  } catch (error) {
    console.log(error)
  }
}

const goToAddCar = () => {
  router.push("/add-car");
};

const goToCars = () => {
  router.push("/cars");
};

const goToWorkers = () => {
  router.push("/workers")
};
</script>

<style scoped>
.stat-card {
  background: rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);

  border-radius: 20px;

  padding: 25px;

  color: white;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

  transition: 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h6 {
  color: #d9d9d9;
}

.stat-card h2 {
  margin-top: 10px;
  font-weight: bold;
}

.content-card {
  background: white;

  border-radius: 20px;

  padding: 25px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #eee;
}
</style>
