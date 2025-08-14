import { useAuth } from "@/share/context/useAuth";
import OrderManagementPage from "./pages/OrderManagementPage";
import OrderPage from "./pages/OrderPage";

export default function OrdersPage() {
  const { user } = useAuth();

  const userRole = user?.role;
  console.log("userRole", userRole);

  if (!userRole) return <OrderPage />;
  if (["admin", "staff"].includes(user.role)) return <OrderManagementPage />;

  return (
    <div className="p-4 text-red-600 font-semibold">
      Bạn không có quyền truy cập trang này.
    </div>
  );
}
