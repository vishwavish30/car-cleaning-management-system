export const authGuard = () => {
  const token = localStorage.getItem("token")

  if (!token) {
    return "/"
  }

  return true
}
