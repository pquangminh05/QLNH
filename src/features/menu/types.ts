export interface MenuItem {
  id: string;
  name: string;
  price: number;
  status: "available" | "unavailable";
  description?: string;
  image_url?: string;
}
