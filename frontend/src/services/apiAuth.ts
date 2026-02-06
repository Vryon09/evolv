import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IUser {
  name: string;
  email: string;
  password: string;
}

async function handleAddUser({ name, email, password }: IUser) {
  try {
    const newUser = { name, email, password };

    const res = await api.post(`/api/auth`, newUser);

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

    const res = await api.post(`/api/auth/login`, user);
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

export async function fetchCurrentUser() {
  try {
    const res = await api.get(`/api/auth/me`);
    return res.data || {};
  } catch (error) {
    console.log(error);
  }
}
