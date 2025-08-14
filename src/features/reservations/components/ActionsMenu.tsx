import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteReservation,
  updateReservationStatus,
} from "../services/reservation.service";
import { Reservation, ReservationStatus } from "../types";

interface Props {
  reservation: Reservation;
}

const statusLabels: Record<ReservationStatus, string> = {
  pending: "Đang chờ",
  confirmed: "Đã xác nhận",
  cancelled: "Đã huỷ",
};

export default function ActionsMenu({ reservation }: Props) {
  const handleUpdate = async (status: ReservationStatus) => {
    if (status === reservation.status) return;
    await updateReservationStatus(reservation.id, status);
    toast.success("Đã cập nhật trạng thái");
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Bạn chắc chắn muốn huỷ đặt bàn?");
    if (!confirm) return;

    await deleteReservation(reservation.id);
    toast.success("Huỷ đặt bàn thành công");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete}>
          🗑️ Huỷ đặt bàn
        </DropdownMenuItem>
        <DropdownMenuItem disabled>—</DropdownMenuItem>
        {(["pending", "confirmed", "cancelled"] as ReservationStatus[]).map(
          (s) => (
            <DropdownMenuItem key={s} onClick={() => handleUpdate(s)}>
              {statusLabels[s]}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
