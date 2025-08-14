"use client";

import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../types";
import { getOrders } from "../services/order.service";
import { orderColumns } from "../components/columns";
import { OrderManagementTable } from "../components/OrderManagementTable";
import toast from "react-hot-toast";
import FullScreenLoader from "@/components/FullScreenLoader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res);
    } catch {
      toast.error("Lỗi khi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchName = order.table?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchName && matchStatus;
  });

  if (loading) return <FullScreenLoader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">📋 Quản lý đơn hàng</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Tìm theo tên bàn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}
        >
          <SelectTrigger className="sm:w-1/3">
            <SelectValue placeholder="Lọc trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="pending">Chờ xử lý</SelectItem>
            <SelectItem value="preparing">Đang nấu</SelectItem>
            <SelectItem value="done">Hoàn tất</SelectItem>
            <SelectItem value="served">Đã phục vụ</SelectItem>
            <SelectItem value="paid">Đã thanh toán</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <OrderManagementTable
        data={filteredOrders}
        columns={orderColumns(load)}
      />
    </div>
  );
}
