"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { createReservation } from "../services/reservation.service";
import { getAvailableTables } from "../services/table.service";
import { Reservation } from "../types";
import { DateTimePicker } from "@/components/DateTimePicker";

interface Table {
  id: string;
  name: string;
}

export function ReservationForm() {
  const [form, setForm] = useState<Partial<Reservation>>({
    customer_name: "",
    phone: "",
    reservation_time: "",
    note: "",
    table_id: "",
  });

  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getAvailableTables();
        setTables(data);
      } catch {
        toast.error("Không thể tải danh sách bàn");
      }
    };

    fetchTables();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !form.customer_name ||
      !form.phone ||
      !form.reservation_time ||
      !form.table_id
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const toastId = toast.loading("Đang gửi yêu cầu...");
    setLoading(true);

    try {
      await createReservation(form as Reservation);
      toast.success("Đặt bàn thành công", { id: toastId });
      setForm({
        customer_name: "",
        phone: "",
        reservation_time: "",
        note: "",
        table_id: "",
      });
    } catch (err: any) {
      toast.error(err?.message || "Có lỗi xảy ra", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen fixed top-0 w-full -z-10 flex items-center justify-center bg-muted px-4 bg-[url('https://manwah.com.vn/images/seo_default_image/manwah.png')] bg-cover bg-center">
      <Card className="w-[420px] mx-auto shadow-md border border-muted">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">
            Đặt bàn mới
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Tên khách hàng</Label>
            <Input
              name="customer_name"
              id="customer_name"
              value={form.customer_name}
              placeholder="Nhập tên khách"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              name="phone"
              id="phone"
              value={form.phone}
              placeholder="Nhập số điện thoại"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reservation_time">Thời gian đặt</Label>
            <DateTimePicker
              value={
                form.reservation_time
                  ? new Date(form.reservation_time)
                  : undefined
              }
              onChange={(date) =>
                setForm({
                  ...form,
                  reservation_time: date?.toISOString().slice(0, 16) ?? "",
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Ghi chú</Label>
            <Input
              name="note"
              id="note"
              value={form.note}
              placeholder="Ghi chú thêm (nếu có)"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="table_id">Chọn bàn</Label>
            <Select
              value={form.table_id}
              onValueChange={(value) => setForm({ ...form, table_id: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn bàn khả dụng" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {tables.map((table) => (
                  <SelectItem key={table.id} value={table.id}>
                    {table.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full font-medium"
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt bàn"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
