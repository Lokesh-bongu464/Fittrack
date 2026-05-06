const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("fittrack-token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

// Auth API
export const api = {
  register: (body: {
    fullName: string;
    email: string;
    password: string;
    profile?: Record<string, unknown>;
  }) =>
    request<{ user: Record<string, unknown>; token: string }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify(body) }
    ),

  login: (body: { email: string; password: string }) =>
    request<{ user: Record<string, unknown>; token: string }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify(body) }
    ),

  getMe: () =>
    request<{ user: Record<string, unknown> }>("/api/auth/me"),
};

// Token helpers
export function setToken(token: string) {
  localStorage.setItem("fittrack-token", token);
  // Also set a cookie so Next.js middleware can read it
  document.cookie = `fittrack-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function removeToken() {
  localStorage.removeItem("fittrack-token");
  document.cookie = "fittrack-token=; path=/; max-age=0";
}

export function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("fittrack-token")
    : null;
}
