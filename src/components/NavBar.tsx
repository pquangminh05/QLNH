import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/share/context/useAuth";
import { useNavLinksByRole } from "@/share/hooks/useNavLinksByRole";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navLinks = useNavLinksByRole(); // 👈 Hook phân quyền ở đây

  return (
    <div className="h-16 w-full bg-white shadow-md py-1 fixed top-0">
      <div className="max-w-[1320px] mx-auto flex justify-between gap-4 px-4">
        <div className="w-fit flex items-center gap-4">
          <Link to="/">
            <img src="./images/manwah.svg" alt="" className="w-36 mr-8" />
          </Link>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button
                variant={location.pathname === link.to ? "default" : "ghost"}
                className={cn("capitalize")}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="w-fit flex items-center gap-2">
          {user ? (
            <div className="w-full flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{user.name}</p>
              <Button variant="ghost" onClick={logout} size={"icon"}>
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button>Đăng nhập</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
