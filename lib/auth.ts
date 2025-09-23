"use client"

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  const isAuth = localStorage.getItem("adminAuth") === "true"
  const adminPhone = localStorage.getItem("adminPhone")

  return isAuth && adminPhone === "+221777461097"
}

export const adminLogout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminPhone")
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

export const getAdminPhone = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminPhone")
}
