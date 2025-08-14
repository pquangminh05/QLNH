import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { Reservation, ReservationStatus } from "../types";
import {
  deleteReservation,
  updateReservationStatus,
} from "../services/reservation.service";

export const columns = (reload: () => void): ColumnDef<Reservation>[] => [
  {
    accessorKey: "customer_name",
    header: "Khách",
  },
  {
    accessorKey: "phone",
    header: "Điện thoại",
  },
  {
    accessorKey: "reservation_time",
    header: "Thời gian",
    cell: ({ row }) => new Date(row.original.reservation_time).toLocaleString(),
  },
  {
    accessorKey: "table.name",
    header: "Bàn",
    cell: ({ row }) => row.original.table?.name || row.original.table?.id,
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "confirmed"
          ? "bg-green-600"
          : status === "pending"
          ? "bg-yellow-500"
          : "bg-red-600";

      const label =
        status === "confirmed"
          ? "Đã xác nhận"
          : status === "pending"
          ? "Đang chờ"
          : "Đã huỷ";

      return (
        <Badge className={`text-white capitalize ${color}`}>{label}</Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;

      const handleUpdateStatus = async (status: ReservationStatus) => {
        const toastId = toast.loading("Đang cập nhật...");
        try {
          await updateReservationStatus(reservation.id, status);
          toast.success("Đã cập nhật", { id: toastId });
          reload(); // ⬅️ gọi lại dữ liệu sau action
        } catch {
          toast.error("Lỗi cập nhật", { id: toastId });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(reservation.id);
                toast.success("ID đã được sao chép");
              }}
            >
              Sao chép ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleUpdateStatus("pending")}>
              Chuyển trạng thái chờ
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleUpdateStatus("confirmed")}>
              Xác nhận đặt bàn
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                const ok = confirm("Bạn chắc chắn muốn huỷ đặt bàn?");
                if (ok) handleUpdateStatus("cancelled");
              }}
            >
              Huỷ đặt bàn
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
