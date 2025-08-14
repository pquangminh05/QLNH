import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderStatus } from "../types";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../services/order.service";
import { MoreHorizontal } from "lucide-react";

export const orderColumns = (reload: () => void): ColumnDef<Order>[] => [
  {
    accessorKey: "table.name",
    header: "Bàn",
    cell: ({ row }) => row.original.table?.name || row.original.table_id,
  },
  {
    accessorKey: "items",
    header: "Món ăn",
    cell: ({ row }) => (
      <ul className="list-disc pl-4 text-sm">
        {row.original.items.map((item, i) => (
          <li key={i}>
            {item.menu_item?.name || "Món"} × {item.quantity}
          </li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const color: Record<OrderStatus, string> = {
        pending: "bg-yellow-500",
        preparing: "bg-blue-500",
        done: "bg-green-600",
        served: "bg-teal-600",
        paid: "bg-gray-600",
      };

      return (
        <Badge className={`capitalize text-white ${color[status]}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Hành động",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      const update = async (status: OrderStatus) => {
        const toastId = toast.loading("Đang cập nhật...");
        try {
          await updateOrderStatus(order.id, status);
          toast.success("Thành công", { id: toastId });
          reload();
        } catch {
          toast.error("Lỗi cập nhật", { id: toastId });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(["preparing", "done", "served", "paid"] as OrderStatus[]).map(
              (s) => (
                <DropdownMenuItem key={s} onClick={() => update(s)}>
                  <p className="capitalize">{s}</p>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
