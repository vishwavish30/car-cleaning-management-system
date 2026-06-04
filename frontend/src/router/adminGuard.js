export const adminGuard = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) {
    return "/"
  }

  if (role !== "admin") {
    return "/dashboard"
  }

  return true
}
