import { createRouter, createWebHistory } from "vue-router"

import LoginPage from "../pages/LoginPage.vue"

import MainLayout from "../layouts/MainLayout.vue"

import DashboardPage from "../pages/DashboardPage.vue"
import CarsPage from "../pages/CarsPage.vue"
import AddCarPage from "../pages/AddCarPage.vue"

import { adminGuard } from "./adminGuard"
import { authGuard } from "./authGuard"

import WorkersPage from "../pages/WorkersPage.vue"
import RegisterWorkerPage from "@/pages/RegisterWorkerPage.vue"
import PaymentsPage from "../pages/PaymentsPage.vue"

const routes = [
  {
    path: "/",
    component: LoginPage,
  },

  {
    path: "/",
    component: MainLayout,
    beforeEnter: authGuard,

    children: [
      {
        path: "dashboard",
        component: DashboardPage,
      },

      {
        path: "cars",
        component: CarsPage,
      },

      {
        path: "add-car",
        component: AddCarPage,
        beforeEnter: adminGuard,
      },
      {
        path: "workers",
        component: WorkersPage,
        beforeEnter: adminGuard,
      },
      {
        path: "register-worker",
        component: RegisterWorkerPage,
        beforeEnter: adminGuard,
      },
      {
        path: "payments",
        component: PaymentsPage,
        beforeEnter: adminGuard,
      },
      // {
      //   path: "reports",
      //   component: ReportsPage,
      // }
    ],
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
