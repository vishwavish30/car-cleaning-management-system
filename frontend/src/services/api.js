import axios from "axios"

const api = axios.create({
  baseURL: "https://car-cleaning-management-system.onrender.com/api",
})

export default api
