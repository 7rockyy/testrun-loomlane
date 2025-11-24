// Mock authentication system for testing without Supabase
// This provides demo credentials and localStorage-based session management

export const TEST_CREDENTIALS = {
  student: {
    email: "student@university.edu",
    password: "demo123456",
    role: "student",
    university: "Stanford University",
  },
  admin: {
    email: "admin@loomlane.com",
    password: "admin123456",
    role: "admin",
    university: "Loomlane HQ",
  },
  superadmin: {
    email: "superadmin@loomlane.com",
    password: "super123456",
    role: "superadmin",
    university: "Loomlane HQ",
  },
}

export interface MockUser {
  id: string
  email: string
  role: "student" | "admin" | "superadmin"
  university: string
  createdAt: string
}

export function setMockSession(user: MockUser) {
  localStorage.setItem("mock_user", JSON.stringify(user))
  localStorage.setItem("mock_session_token", `token_${Date.now()}`)
}

export function getMockSession(): MockUser | null {
  const user = localStorage.getItem("mock_user")
  const token = localStorage.getItem("mock_session_token")
  if (user && token) {
    return JSON.parse(user)
  }
  return null
}

export function clearMockSession() {
  localStorage.removeItem("mock_user")
  localStorage.removeItem("mock_session_token")
}

export function validateMockCredentials(email: string, password: string): MockUser | null {
  const credentials = Object.values(TEST_CREDENTIALS)
  const found = credentials.find((cred) => cred.email === email && cred.password === password)

  if (found) {
    return {
      id: `user_${Date.now()}`,
      email: found.email,
      role: found.role as "student" | "admin" | "superadmin",
      university: found.university,
      createdAt: new Date().toISOString(),
    }
  }
  return null
}
