import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface IUser {
  name: string;
  email: string;
  password: string;
}

async function handleAddUser({ name, email, password }: IUser) {
  try {
    const newUser = { name, email, password };
    const res = await axios.post(`${API_BASE_URL}/api/auth`, newUser);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export function useAddUser() {
  return useMutation({
    mutationFn: handleAddUser,
  });
}

async function handleLoginUser({ email, password }: Omit<IUser, "name">) {
  try {
    const user = { email, password };
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, user);
    return res.data || {};
  } catch (error) {
    console.log(error);
  }
}

export function useLoginUser() {
  return useMutation({
    mutationFn: handleLoginUser,
  });
}
