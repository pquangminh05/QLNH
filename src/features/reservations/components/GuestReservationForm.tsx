"use client";

import { useState } from "react";
import { createReservation } from "../services/reservation.service";
import { CreateReservationPayload } from "../types";

export default function GuestReservationForm() {
  const [form, setForm] = useState<CreateReservationPayload>({
    customer_name: "",
    phone: "",
    reservation_time: "",
    table_id: "",
    note: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReservation(form);
      setSuccess(true);
    } catch (error: any) {
      alert("Lỗi khi đặt bàn: " + error?.message);
    }
  };

  if (success) {
    return (
      <p className="text-green-600 font-semibold">
        ✅ Đặt bàn thành công! Cảm ơn bạn.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 border rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Đặt bàn (khách không cần đăng nhập)</h2>

      <input
        name="customer_name"
        value={form.customer_name}
        onChange={handleChange}
        placeholder="Tên khách hàng"
        className="input"
        required
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Số điện thoại"
        className="input"
        required
      />

      <input
        name="reservation_time"
        value={form.reservation_time}
        onChange={handleChange}
        type="datetime-local"
        className="input"
        required
      />

      <input
        name="table_id"
        value={form.table_id}
        onChange={handleChange}
        placeholder="ID bàn (ví dụ: abc123)"
        className="input"
        required
      />

      <textarea
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Ghi chú (nếu có)"
        className="input"
      />

      <button type="submit" className="btn bg-green-600 text-white w-full">
        Gửi yêu cầu đặt bàn
      </button>
    </form>
  );
}
