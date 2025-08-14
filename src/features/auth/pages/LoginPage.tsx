/* eslint-disable @typescript-eslint/no-explicit-any */
// 📁 src/pages/LoginPage.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/share/context/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError("Sai email hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 bg-[url('https://manwah.com.vn/images/seo_default_image/manwah.png')] bg-cover bg-center">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            <img
              className="w-12 h-12 mx-auto mb-2"
              src="/images/manwah-logo.svg"
              alt=""
            />
            Đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={loading || !email || !password}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
