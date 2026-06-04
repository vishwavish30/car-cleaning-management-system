import api from "./api"

export const getTodaySummary = async () => {
  const token = localStorage.getItem("token")

  const response = await api.get(
    "/cleaning/summary",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}


export const getTodayCleanedCars = async () => {
  const token = localStorage.getItem("token")

  const response = await api.get(
    "/cleaning/today",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}


export const markCarCleaned = async (carId) => {
  const token = localStorage.getItem("token")

  const response = await api.post(
    "/cleaning",
    {
      carId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
