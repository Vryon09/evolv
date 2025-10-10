import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function handleGetHabits() {
  const token = localStorage.getItem("evolv_token");

  try {
    const res = await axios.get(`${API_BASE_URL}/api/habits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data || [];
  } catch (error) {
    console.log(error);
  }
}

async function handleAddHabit({
  title,
  description = "",
  frequency,
  tags = [],
}: {
  title: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  tags?: string[];
}) {
  const token = localStorage.getItem("evolv_token");

  try {
    const newHabit = { title, description, frequency, tags };
    const res = await axios.post(`${API_BASE_URL}/api/habits`, newHabit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export function useAddHabit() {
  return useMutation({ mutationFn: handleAddHabit });
}
