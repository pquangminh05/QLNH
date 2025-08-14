import { useAuth } from "@/share/context/useAuth";
import MenuManagePage from "./pages/MenuManagePage";
import MenuPublicPage from "./pages/MenuPublicPage";

export default function MenuPage() {
  const { user } = useAuth();

  const userRole = user?.role;
  console.log("userRole", userRole);

  if (!userRole) return <MenuPublicPage />;
  if (["admin", "staff"].includes(user.role)) return <MenuManagePage />;

  return (
    <div className="p-4 text-red-600 font-semibold">
      Bạn không có quyền truy cập trang này.
    </div>
  );
}
