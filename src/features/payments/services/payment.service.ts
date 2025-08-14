// 📁 src/features/payments/services/payment.service.ts
import { api } from "@/lib/axios";

export const createPayment = async (data: {
  order_id: string;
  method: string;
}) => {
  const res = await api.post("/payments", data);
  return res.data;
};

export const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};
