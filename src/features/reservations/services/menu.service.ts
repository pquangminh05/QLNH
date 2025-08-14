import { api } from "@/lib/axios";

export const getMenuItems = async () => {
  const res = await api.get("/menu-items"); // route này do bạn định nghĩa ở BE
  return res.data;
};
