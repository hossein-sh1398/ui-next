"use server"
import axios from "axios";
export const api = axios.create({
  baseURL: `${process.env.API_BASE_RUL}`,
  timeout: 5000,
  headers: {
    ContentType: "application/json",
    Accept: "application/json",
  }
});




