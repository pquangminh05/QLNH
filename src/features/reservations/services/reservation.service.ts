import { api } from "@/lib/axios";
import {
  Reservation,
  CreateReservationPayload,
  ReservationStatus,
} from "../types";

export const getReservations = async (): Promise<Reservation[]> => {
  const res = await api.get("/reservations");
  return res.data;
};

export const createReservation = async (data: CreateReservationPayload) => {
  const res = await api.post("/reservations", data);
  return res.data;
};

export const deleteReservation = async (id: string) => {
  await api.delete(`/reservations/${id}`);
};

export const updateReservationStatus = async (
  id: string,
  status: ReservationStatus
) => {
  const res = await api.patch(`/reservations/${id}`, { status });
  return res.data;
};
