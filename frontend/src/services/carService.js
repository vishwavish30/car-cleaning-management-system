import api from "./api"
import { markCarCleaned } from "../services/cleaningService"

export const getCars = async () => {
  const token = localStorage.getItem("token")

  const response = await api.get("/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
