<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="title">Car Cleaning System</h2>
      <p class="subtitle">Login to continue</p>

      <div class="mb-3">
        <label class="form-label">Email</label>

        <input
          v-model="email"
          type="email"
          class="form-control custom-input"
          placeholder="Enter your email"
        />
      </div>

      <div class="mb-4">
        <label class="form-label">Password</label>

        <div class="input-group">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control custom-input"
            placeholder="Enter your password"
          />

          <span
            class="input-group-text eye-icon"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </span>
        </div>
      </div>

      <button class="btn login-btn w-100" @click="login">
        Login
      </button>

      <p class="text-center text-light opacity-75 mt-3">
        Don't have an account?
        <br> Ask your administrator to create one for you.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()

const email = ref("")
const password = ref("")
const showPassword = ref(false)

const login = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: email.value,
        password: password.value,
      }
    )

    localStorage.setItem("token", res.data.token)

    localStorage.setItem("role", res.data.user.role)

    toast.success("Login Successful")

    router.push("/dashboard")
  } catch (error) {
    console.log(error)

    toast.error(
    error.response?.data?.message ||
    "Login Failed"
  )
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(to right, #141e30, #243b55);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;

  background: rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(10px);

  border-radius: 20px;

  padding: 35px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

  color: white;
}

.title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  text-align: center;
  color: #d1d1d1;
  margin-bottom: 30px;
}

.form-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.custom-input {
  height: 50px;
  border-radius: 12px;
  border: none;
}

.custom-input:focus {
  box-shadow: none;
  border: 2px solid #4da3ff;
}

.eye-icon {
  cursor: pointer;
  border-radius: 0 12px 12px 0;
}

.login-btn {
  height: 50px;

  border: none;
  border-radius: 12px;

  background: #4da3ff;

  font-weight: bold;
  transition: 0.3s;
}

.login-btn:hover {
  background: #2388f5;
}

.bottom-text {
  text-align: center;
  margin-top: 20px;
  color: #ddd;
}

.bottom-text a {
  color: #4da3ff;
  text-decoration: none;
  font-weight: 600;
}
</style>
