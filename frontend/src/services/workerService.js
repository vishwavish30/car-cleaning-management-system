import api from "./api"

export const getWorkers = async () => {
  const token = localStorage.getItem("token")

  const response = await api.get("/users/workers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
