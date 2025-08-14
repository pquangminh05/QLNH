"use client";

import { useEffect, useState } from "react";
import { getMenuItems } from "@/features/menu/services/menu.service";
import { MenuItem } from "@/features/menu/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MenuPublicPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMenuItems();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Thực đơn</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-4 space-y-2">
                <Skeleton className="h-24 w-full rounded" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))
          : items.map((item) => (
              <Card key={item.id} className="overflow-hidden p-0 gap-1">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="text-sm font-semibold text-right">
                    {Number(item.price).toLocaleString()}đ
                  </p>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}
