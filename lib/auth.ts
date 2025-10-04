"use client"

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export const adminLogout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminAuth")
    window.location.href = "/admin/login"
  }
}

export const requireAdminAuth = (): boolean => {
  const isAuth = isAdminAuthenticated()
  if (!isAuth && typeof window !== "undefined") {
    window.location.href = "/admin/login"
    return false
  }
  return isAuth
}
