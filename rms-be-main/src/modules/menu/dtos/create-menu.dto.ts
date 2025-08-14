export class CreateMenuItemDto {
  name: string;
  price: number;
  status?: 'available' | 'unavailable';
  description?: string;
  image_url?: string;
}
