import { api } from "@/lib/axios";

export const getAvailableTables = async () => {
  const res = await api.get("/tables?status=available");
  return res.data;
};

export const updateTableStatus = async (tableId: string, status: string) => {
  const res = await api.patch(`/tables/${tableId}`, { status });
  return res.data;
};
