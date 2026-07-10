import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import "./assets/toast.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
  position: "top-center",
  timeout: 2500,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
  maxToasts: 1,
  newestOnTop: true,
})

app.mount('#app')
