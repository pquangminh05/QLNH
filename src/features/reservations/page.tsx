import { useAuth } from "@/share/context/useAuth";
import AdminReservationPage from "./ManageReservationPage";
import { ReservationForm } from "./components/ReservationForm";

export default function ReservationPage() {
  const { user } = useAuth();

  const userRole = user?.role;
  console.log("userRole", userRole);

  if (!userRole) return <ReservationForm />;
  if (["admin", "staff"].includes(user.role)) return <AdminReservationPage />;

  return (
    <div className="p-4 text-red-600 font-semibold">
      Bạn không có quyền truy cập trang này.
    </div>
  );
}
