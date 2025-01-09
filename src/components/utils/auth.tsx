export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  return !!token; // Returns true if token exists
}

export function getUserRole() {
  return localStorage.getItem("userRole");
}