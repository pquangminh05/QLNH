"use client";

import { useEffect, useState } from "react";
import { getReservations } from "./services/reservation.service";
import { Reservation } from "./types";
import { ReservationTable } from "./components/ReservationTable";
import toast from "react-hot-toast";
import { columns } from "./components/columns";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function ManageReservationPage() {
  const [data, setData] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getReservations();
      setData(res);
    } catch {
      toast.error("Lỗi khi tải danh sách đặt bàn");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Polling mỗi 10 giây
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📋 Quản lý đặt bàn</h1>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <ReservationTable columns={columns(load)} data={data} />
      )}
    </div>
  );
}
