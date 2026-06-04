<template>
  <div class="container py-5">

    <div class="form-card">

      <h2 class="text-center text-white fw-bold">
        Register Worker
      </h2>
      <p
        class="text-center text-light opacity-75 mb-4"
      >
        Create a new worker account
      </p>

      <div class="mb-3">
        <label class="form-label">
          Name
        </label>

        <input
          v-model="name"
          class="form-control"
          placeholder="Enter worker name"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">
          Email
        </label>

        <input
          v-model="email"
          class="form-control"
          placeholder="Enter worker email"
        />
      </div>

      <div class="mb-4">
        <label class="form-label">
          Password
        </label>

        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter password"
        />
      </div>

      <button
        class="btn btn-primary w-100"
        @click="registerWorker"
      >
        Register Worker
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

const name = ref("")
const email = ref("")
const password = ref("")

const registerWorker = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: name.value,
        email: email.value,
        password: password.value,
        role: "worker",
      }
    )

    alert("Worker Registered Successfully")

    name.value = ""
    email.value = ""
    password.value = ""
  } catch (error) {
    console.log(error)

    alert("Registration Failed")
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

  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
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

.form-control:focus {
  background: rgba(255,255,255,0.12);

  border-color: #4da3ff;

  color: white;

  box-shadow:
    0 0 0 0.2rem
    rgba(77,163,255,0.25);
}

.btn {
  height: 50px;

  border-radius: 12px;

  font-weight: 600;

  transition: 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: white !important;

  -webkit-box-shadow:
    0 0 0px 1000px
    rgba(255, 255, 255, 0.08)
    inset !important;

  transition:
    background-color 5000s ease-in-out 0s;
}

@media (max-width: 768px) {
  .form-card {
    padding: 20px;
  }
}
</style>
