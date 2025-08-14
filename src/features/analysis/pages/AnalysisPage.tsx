"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import FullScreenLoader from "@/components/FullScreenLoader";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getPayments } from "@/features/payments/services/payment.service";
import { AnalysisChartCard } from "../components/AnalysisChartCard";
import AnalysisBarChart from "../components/AnalysisBarChart";

export default function AnalysisPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPayments();
      setPayments(res);
    } catch (err) {
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = payments.filter((p) => {
    const matchSearch = p.order_id.toLowerCase().includes(search.toLowerCase());
    const matchMethod = filterMethod === "all" || p.method === filterMethod;
    return matchSearch && matchMethod;
  });

  const chartData = filtered.reduce((acc: Record<string, number>, p) => {
    const month = new Date(p.paid_at).toLocaleDateString("vi-VN", {
      month: "2-digit",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + p.amount;
    return acc;
  }, {});

  const barChartData = Object.entries(chartData).map(([month, value]) => ({
    month,
    revenue: value,
  }));

  if (loading) return <FullScreenLoader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Thống kê & Phân tích</h1>

      <div className="grid grid-cols-2 gap-4">
        <AnalysisChartCard />
        <AnalysisBarChart />
      </div>

      <Card>
        <CardContent className="space-y-4 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Ngày thanh toán</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.order_id.slice(0, 6)}</TableCell>
                    <TableCell className="capitalize">{p.method}</TableCell>
                    <TableCell>{Number(p.amount).toLocaleString()} đ</TableCell>
                    <TableCell>
                      {new Date(p.paid_at).toLocaleDateString("vi-VN")}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      Không có dữ liệu phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
