<template>
  <div class="layout">

    <button
      class="mobile-menu-btn"
      @click="sidebarOpen = !sidebarOpen"
    >
      ☰
    </button>

    <aside class="sidebar"
      :class="{ active: sidebarOpen }">
      <h3 class="logo">Kumar Car Care</h3>

      <router-link to="/dashboard" class="nav-link">
        Dashboard
      </router-link>

      <router-link to="/cars" class="nav-link">
        Cars
      </router-link>

      <router-link
        v-if="role === 'admin'"
        to="/add-car"
        class="nav-link"
      >
        Add Car
      </router-link>

      <router-link
        v-if="role === 'admin'"
        to="/workers"
        class="nav-link"
      >
        Workers
      </router-link>

      <router-link
        v-if="role === 'admin'"
        to="/payments"
        class="nav-link"
      >
        Payments
      </router-link>

      <button
        class="nav-link logout-btn logout"
        @click="logout"
      >
        Logout
      </button>

    </aside>

    <main class="content">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)

watch(route, () => {
  sidebarOpen.value = false
})

const role = localStorage.getItem("role")

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")

  router.push("/")
}

</script>


<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;

  background: #141e30;

  padding: 25px;

  color: white;

  display: flex;
  flex-direction: column;
}

.logo {
  margin-bottom: 30px;
  /* margin-left: 45px; */
  font-weight: bold;
}

.nav-link {
  color: white;

  text-decoration: none;

  padding: 12px;

  border-radius: 10px;

  margin-bottom: 10px;

  transition: 0.3s;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
}

.router-link-active {
  background: #4da3ff;
}

.logout {
  margin-top: auto;
}

.content {
  flex: 1;

  background: linear-gradient(
    to right,
    #141e30,
    #243b55
  );

  padding: 20px;
}

.mobile-menu-btn {
  display: none;
}

.logout-btn {
  background: none;

  border: none;

  text-align: left;

  color: white;

  width: 100%;

  padding: 12px;

  border-radius: 10px;

  cursor: pointer;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.1);
}

@media (max-width: 768px) {

  .mobile-menu-btn {
    display: block;

    position: fixed;

    top: 15px;
    left: 15px;

    z-index: 2000;

    background: #4da3ff;

    border: none;

    color: white;

    padding: 10px 15px;

    border-radius: 10px;
  }

  .sidebar {
    position: fixed;

    top: 0;
    left: -260px;

    width: 250px;

    height: 100vh;

    z-index: 1000;

    transition: 0.3s;
  }

  .sidebar.active {
    left: 0;
  }

  .content {
    width: 100%;

    padding-top: 70px;
  }

  .logo {
    font-size: 22px;
    margin-left: 45px;
    white-space: nowrap;
  }
}
</style>
