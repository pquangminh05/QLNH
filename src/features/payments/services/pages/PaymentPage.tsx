"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/features/orders/services/order.service";
import {
  createPayment,
  getPayments,
} from "@/features/payments/services/payment.service";
import { Order } from "@/features/orders/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import FullScreenLoader from "@/components/FullScreenLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { updateTableStatus } from "@/features/reservations/services/table.service";

export default function PaymentPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [orderId, setOrderId] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [method, setMethod] = useState<"cash" | "card" | "e-wallet">("cash");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, paymentsRes] = await Promise.all([
        getOrders(),
        getPayments(),
      ]);

      const unpaidOrders = ordersRes.filter(
        (o: any) =>
          o.status !== "paid" && (o.status === "done" || o.status === "served")
      );

      setOrders(unpaidOrders);
      setPayments(paymentsRes);

      if (orderId) {
        const matched = unpaidOrders.find((o: any) => o.id === orderId);
        setSelectedOrder(matched || null);
      }
    } catch (err) {
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const matched = orders.find((o: any) => o.id === orderId);
    setSelectedOrder(matched || null);
  }, [orderId, orders]);

  const handlePayment = async () => {
    if (!orderId || !selectedOrder) return;
    const toastId = toast.loading("Đang xử lý...");

    try {
      // 1. Tạo payment
      await createPayment({ order_id: orderId, method });

      // 2. Cập nhật trạng thái bàn về "available"
      const tableId = selectedOrder.table?.id || selectedOrder.table_id;
      if (tableId) {
        await updateTableStatus(tableId, "available");
      }

      toast.success("Thanh toán thành công", { id: toastId });
      setOrderId("");
      setSelectedOrder(null);
      fetchData();
    } catch (err) {
      toast.error("Thanh toán thất bại", { id: toastId });
    }
  };

  const calculateTotal = (order: Order) => {
    return order.items.reduce(
      (sum, item) => sum + Number(item.price || 0) * item.quantity,
      0
    );
  };

  const filteredPayments = payments.filter((p) => {
    const matchSearch = p.order_id.toLowerCase().includes(search.toLowerCase());
    const matchMethod = filterMethod === "all" || p.method === filterMethod;
    return matchSearch && matchMethod;
  });

  if (loading) return <FullScreenLoader />;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Quản lý Thanh Toán</h1>

      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-3">
            <Label>Chọn đơn hàng chưa thanh toán</Label>
            <Select onValueChange={setOrderId} value={orderId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn đơn hàng..." />
              </SelectTrigger>
              <SelectContent>
                {orders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.table?.name || order.table_id} -{" "}
                    {order.id.slice(0, 6)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedOrder && (
            <div className="space-y-2">
              <Label>Tổng tiền</Label>
              <p className="text-lg font-bold text-green-600">
                {calculateTotal(selectedOrder).toLocaleString()} đ
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Label>Phương thức thanh toán</Label>
            <Select
              value={method}
              onValueChange={(val) => setMethod(val as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phương thức" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tiền mặt</SelectItem>
                <SelectItem value="card">Thẻ</SelectItem>
                <SelectItem value="e-wallet">Ví điện tử</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handlePayment} disabled={!orderId}>
            Xác nhận Thanh Toán
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Lịch sử giao dịch</h2>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Input
            placeholder="Tìm theo mã đơn hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2"
          />

          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-full sm:w-52">
              <SelectValue placeholder="Lọc phương thức" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="cash">Tiền mặt</SelectItem>
              <SelectItem value="card">Thẻ</SelectItem>
              <SelectItem value="e-wallet">Ví điện tử</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.order_id.slice(0, 6)}</TableCell>
                  <TableCell className="capitalize">{p.method}</TableCell>
                  <TableCell>{Number(p.amount).toLocaleString()} đ</TableCell>
                  <TableCell>{new Date(p.paid_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    Không có kết quả phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
