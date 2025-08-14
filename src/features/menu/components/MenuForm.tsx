/* eslint-disable @typescript-eslint/no-explicit-any */
// 📁 src/features/menu/components/MenuForm.tsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createMenuItem, updateMenuItem } from "../services/menu.service";
import { MenuItem } from "../types";

type Props = {
  defaultValues?: Partial<MenuItem>;
  onSuccess?: () => void;
};

export function MenuForm({ defaultValues, onSuccess }: Props) {
  const [form, setForm] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    status: "available",
    image_url: "",
    description: "",
  });

  useEffect(() => {
    if (defaultValues) setForm(defaultValues);
  }, [defaultValues]);

  const handleChange = (key: keyof MenuItem, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      if (form.id) await updateMenuItem(form.id, form);
      else await createMenuItem(form);

      alert("Lưu thành công");
      setForm({
        name: "",
        price: 0,
        status: "available",
        image_url: "",
        description: "",
      });
      onSuccess?.();
    } catch (err: any) {
      alert("Lỗi: " + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Tên món"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <Input
        type="number"
        placeholder="Giá"
        value={form.price}
        onChange={(e) => handleChange("price", Number(e.target.value))}
      />

      <Select
        value={form.status}
        onValueChange={(v) => handleChange("status", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="available">Còn hàng</SelectItem>
          <SelectItem value="unavailable">Hết hàng</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Ảnh (URL)"
        value={form.image_url}
        onChange={(e) => handleChange("image_url", e.target.value)}
      />

      <Textarea
        placeholder="Mô tả món ăn"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Button onClick={handleSubmit}>
        {form.id ? "Cập nhật" : "Thêm món"}
      </Button>
    </div>
  );
}
