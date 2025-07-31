import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export async function listMentors() {
  const output = await api.get("mentors");

  return output.data;
}
