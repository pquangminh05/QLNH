"use client";

import { useEffect, useState } from "react";
import { MenuItem } from "@/features/menu/types";
import {
  getMenuItems,
  deleteMenuItem,
} from "@/features/menu/services/menu.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuForm } from "@/features/menu/components/MenuForm";
import { toast } from "react-hot-toast";
import { MenuTable } from "@/features/menu/components/MenuTable";
import FullScreenLoader from "@/components/FullScreenLoader";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

export default function MenuManagePage() {
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);

  const [search, setSearch] = useState("");
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getMenuItems();
      setMenuItems(res);
    } catch {
      toast.error("❌ Lỗi khi tải thực đơn");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditItem(null);
    setOpenForm(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditItem(item);
    setOpenForm(true);
  };

  const handleDelete = (item: MenuItem) => {
    setDeleteTarget(item);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const toastId = toast.loading("🔄 Đang xoá...");
    try {
      await deleteMenuItem(deleteTarget.id);
      toast.success("🗑️ Đã xoá món ăn", { id: toastId });
      loadData();
    } catch {
      toast.error("❌ Xoá thất bại", { id: toastId });
    } finally {
      setDeleteTarget(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý Thực Đơn
        </h1>
        <Button onClick={handleAdd}>Thêm món</Button>
      </div>
      <Input
        placeholder="Tìm món ăn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <MenuTable
        items={filteredItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Thêm / Sửa */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {editItem ? "Chỉnh sửa món" : "Thêm món mới"}
            </DialogTitle>
          </DialogHeader>
          <MenuForm
            defaultValues={editItem ?? undefined}
            onSuccess={() => {
              setOpenForm(false);
              loadData();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Xác nhận xoá */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn muốn xoá món{" "}
              <span className="font-bold">{deleteTarget?.name}</span>?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-muted-foreground">
            Thao tác này không thể hoàn tác.
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Xoá</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
