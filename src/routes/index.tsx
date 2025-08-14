import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import LayoutSelector from "./LayoutSelector";

// Auth
import LoginPage from "@/features/auth/pages/LoginPage";

// Pages
import HomePage from "@/features/home/HomePage";

// Orders
import OrderPage from "@/features/orders/page";
import OrderManagementPage from "@/features/orders/pages/OrderManagementPage";

// Reservations
import ReservationPage from "@/features/reservations/page";

// Menu
import MenuPage from "@/features/menu/page";
import MenuCreatePage from "@/features/menu/pages/MenuCreatePage";
import MenuEditPage from "@/features/menu/pages/MenuEditPage";

// Payments
import PaymentPage from "@/features/payments/services/pages/PaymentPage";
// import PaymentDetailPage from "@/features/payments/services/pages/PaymentDetailPage";

// Users
// import UsersPage from "@/features/users/page";
// import UserCreatePage from "@/features/users/pages/UserCreatePage";
// import UserEditPage from "@/features/users/pages/UserEditPage";

// Inventory
import InventoryPage from "@/features/inventory/page";

// Statistics
import StatisticsPage from "@/features/statistics/page";
import AnalysisPage from "@/features/analysis/pages/AnalysisPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔒 Protected - Layout selector */}
        <Route element={<LayoutSelector />}>
          <Route path="/" element={<HomePage />} />

          {/* Orders */}
          <Route path="/orders" element={<OrderPage />} />

          {/* Reservations */}
          <Route path="/reservations" element={<ReservationPage />} />

          {/* Menu */}
          <Route path="/menu" element={<MenuPage />} />

          {/* Payments */}
          <Route path="/payments" element={<PaymentPage />} />
          {/* <Route path="/payments/:id" element={<PaymentDetailPage />} /> */}

          {/* Users */}
          {/* <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/users/edit/:id" element={<UserEditPage />} /> */}

          {/* Inventory / Ingredients */}
          {/* <Route path="/inventory" element={<InventoryPage />} /> */}

          {/* Statistics */}
          <Route path="/analytics" element={<AnalysisPage />} />

          {/* 404 fallback */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
