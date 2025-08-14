export interface Table {
  id: string;
  name: string;
  status: "available" | "reserved" | "occupied";
}

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface Reservation {
  id: string;
  customer_name: string;
  phone: string;
  reservation_time: string;
  note?: string;
  status: ReservationStatus;
  table: Table;
}

export interface CreateReservationPayload {
  customer_name: string;
  phone: string;
  reservation_time: string;
  table_id: string;
  note?: string;
}
