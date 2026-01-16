export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface ApiOptions extends RequestInit {
  token?: string;
}
export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  console.log(BASE_URL);
  const { headers, ...rest } = options;
  const isFormData = rest.body instanceof FormData;
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    ...rest,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ? headers : {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || res.statusText);
  }

  return res.json() as Promise<T>;
}
