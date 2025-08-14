"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import { CreateOrder } from "../types";
import { createOrder } from "../services/order.service";
import { getAvailableTables } from "../../reservations/services/table.service";
import { getMenuItems } from "../../reservations/services/menu.service";
import FullScreenLoader from "@/components/FullScreenLoader";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

export function OrderForm() {
  const [form, setForm] = useState<CreateOrder>({
    table_id: "",
    items: [],
  });

  const [tables, setTables] = useState<
    { id: string; name: string; status: string }[]
  >([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // filter states
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<
    "all" | "lt50" | "50to100" | "gt100"
  >("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tableData, menuData] = await Promise.all([
          getAvailableTables(),
          getMenuItems(),
        ]);

        console.log("Tables:", tableData);
        setTables(tableData);
        setMenuItems(menuData);
      } catch {
        toast.error("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMenus = useMemo(() => {
    return menuItems.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchPrice =
        priceFilter === "all"
          ? true
          : priceFilter === "lt50"
          ? item.price < 50000
          : priceFilter === "50to100"
          ? item.price >= 50000 && item.price <= 100000
          : item.price > 100000;

      return matchSearch && matchPrice;
    });
  }, [menuItems, search, priceFilter]);

  const updateItemQuantity = (menu_item_id: string, delta: number) => {
    const existing = form.items.find(
      (item) => item.menu_item_id === menu_item_id
    );
    let newItems;

    if (existing) {
      newItems = form.items
        .map((item) =>
          item.menu_item_id === menu_item_id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
    } else if (delta > 0) {
      newItems = [...form.items, { menu_item_id, quantity: delta }];
    } else {
      newItems = [...form.items];
    }

    setForm({ ...form, items: newItems });
  };

  const getQuantity = (menu_id: string) =>
    form.items.find((item) => item.menu_item_id === menu_id)?.quantity || 0;

  const totalPrice = useMemo(() => {
    return form.items.reduce((total, item) => {
      const menu = menuItems.find((m) => m.id === item.menu_item_id);
      return total + (menu ? menu.price * item.quantity : 0);
    }, 0);
  }, [form.items, menuItems]);

  const handleSubmit = async () => {
    if (!form.table_id || form.items.length === 0) {
      toast.error("Vui lòng chọn bàn và món ăn");
      return;
    }

    const toastId = toast.loading("Đang gửi đơn hàng...");
    try {
      await createOrder(form);
      toast.success("Đã tạo đơn hàng", { id: toastId });
      setForm({ table_id: "", items: [] });
    } catch {
      toast.error("Lỗi khi tạo đơn hàng", { id: toastId });
    }
  };

  if (loading) return <FullScreenLoader />;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2 max-w-md">
        <Label>Bàn đã xác nhận</Label>
        <Select
          value={form.table_id}
          onValueChange={(val) => setForm({ ...form, table_id: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn bàn" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
        <Input
          placeholder="Tìm món ăn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={priceFilter}
          onValueChange={(val) => setPriceFilter(val as any)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Lọc theo giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="lt50">Dưới 50.000đ</SelectItem>
            <SelectItem value="50to100">50.000 - 100.000đ</SelectItem>
            <SelectItem value="gt100">Trên 100.000đ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Danh sách món: 3/4 */}
        <div className="md:col-span-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {filteredMenus.map((item) => {
            const qty = getQuantity(item.id);
            return (
              <Card key={item.id} className="overflow-hidden h-fit p-0 gap-1">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-3 space-y-1">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.price.toLocaleString()}đ
                  </p>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-6 h-6"
                      onClick={() => updateItemQuantity(item.id, -1)}
                    >
                      −
                    </Button>
                    <span className="text-sm w-5 text-center">{qty}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-6 h-6"
                      onClick={() => updateItemQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Giỏ hàng: 1/4 */}
        <div className="md:col-span-1 space-y-4 border rounded-lg p-4 h-fit bg-muted/50">
          <h3 className="text-lg font-semibold mb-2"> Các món đã chọn</h3>
          {form.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có món nào</p>
          ) : (
            <div className="space-y-3">
              {form.items.map((item) => {
                const menu = menuItems.find((m) => m.id === item.menu_item_id);
                if (!menu) return null;

                return (
                  <div
                    key={item.menu_item_id}
                    className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm"
                  >
                    {menu.image_url && (
                      <img
                        src={menu.image_url}
                        alt={menu.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{menu.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {menu.price.toLocaleString()}đ × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-right whitespace-nowrap">
                      {(menu.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                );
              })}
              <div className="flex justify-between border-t pt-3 text-sm font-medium">
                <span>Tổng cộng:</span>
                <span>{totalPrice.toLocaleString()}đ</span>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Xác nhận đặt món
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
