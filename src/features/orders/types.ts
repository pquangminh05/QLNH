export interface OrderItemInput {
  menu_item_id: string;
  quantity: number;
}

export interface CreateOrder {
  table_id: string;
  items: OrderItemInput[];
}

// Định nghĩa type riêng
export type OrderStatus = "pending" | "preparing" | "done" | "served" | "paid";

export interface Order {
  id: string;
  status: OrderStatus; // <-- sử dụng type ở đây
  table_id: string;
  created_at?: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    order_id: string;
    menu_item_id: string;
    menu_item?: {
      id: string;
      name: string;
      price: string;
      status: string;
      description?: string | null;
      image_url?: string;
    };
  }[];
  table?: {
    id: string;
    name: string;
    status: string;
  };
}
