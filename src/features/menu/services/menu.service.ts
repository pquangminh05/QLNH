import { api } from "@/lib/axios";
import { MenuItem } from "../types";

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const res = await api.get("/menu-items");
  return res.data;
};

export const createMenuItem = async (data: Partial<MenuItem>) => {
  const res = await api.post("/menu-items", data);
  return res.data;
};

export const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
  const res = await api.patch(`/menu-items/${id}`, data);
  return res.data;
};

export const deleteMenuItem = async (id: string) => {
  const res = await api.delete(`/menu-items/${id}`);
  return res.data;
};
