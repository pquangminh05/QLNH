"use client";

import { MenuItem } from "../types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash, Pencil } from "lucide-react";

interface Props {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

export function MenuTable({ items, onEdit, onDelete }: Props) {
  if (!items || items.length === 0)
    return (
      <p className="text-muted-foreground text-sm">Không có món ăn nào.</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden p-0 gap-0">
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-44 object-cover"
            />
          )}
          <div className="p-4 space-y-1">
            <h3 className="text-base font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <p className="text-sm font-medium">
              {Number(item.price).toLocaleString()}đ
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Pencil className="w-4 h-4 mr-1" />
                Sửa
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item)}
              >
                <Trash className="w-4 h-4 mr-1" />
                Xoá
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
