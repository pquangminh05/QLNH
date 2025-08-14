import { useAuth } from "@/share/context/useAuth";

const allNavLinks = [
  { to: "/uu-dai", label: "Ưu đãi" },
  { to: "/reservations", label: "Đặt bàn" },
  { to: "/orders", label: "Order" },
  //   { to: "/quan-ly-don-hang", label: "Quản lý đơn hàng", roles: ["admin"] },
  { to: "/menu", label: "Menu" },
  //   { to: "/thanh-toan", label: "Thanh toán", roles: ["admin"] },
];

export function useNavLinksByRole() {
  const { user } = useAuth();

  const filteredLinks = allNavLinks.filter((link) => {
    // Nếu không có giới hạn role nào, ai cũng thấy được
    if (!link.roles) return true;

    // Nếu có roles, chỉ hiển thị nếu vai trò của user nằm trong danh sách
    return user && link.roles.includes(user.role);
  });

  return filteredLinks;
}
