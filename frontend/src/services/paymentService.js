import api from "./api"

export const getPaymentSummary = async () => {
  const token = localStorage.getItem("token")

  const response = await api.get(
    "/payments/summary",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}


export const markPaymentReceived = async (carId) => {
  const token = localStorage.getItem("token")

  const response = await api.post(
    "/payments",
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


export const getCurrentMonthPayments = async () => {
  const token = localStorage.getItem("token")

  const response = await api.get(
    "/payments/current-month",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
