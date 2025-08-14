import { OrderForm } from "../components/OrderForm";

export default function OrderPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Tạo đơn hàng</h1>
      <OrderForm />
    </div>
  );
}
