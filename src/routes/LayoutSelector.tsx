// 📁 src/routes/LayoutSelector.tsx
import { useAuth } from "@/share/context/useAuth";
import UserLayout from "@/components/layouts/user-layout";
import ManageLayout from "@/components/layouts/manage-layout";

export default function LayoutSelector() {
  const { user } = useAuth();

  // Nếu chưa login → dùng layout gốc
  if (!user) return <UserLayout />;

  // Nếu là staff/admin → dùng layout quản lý
  return <ManageLayout />;
}
