import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_BIBLIA_API_ENDPOINT as string,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_BIBLIA_API_TOKEN as string}`
  }
})
