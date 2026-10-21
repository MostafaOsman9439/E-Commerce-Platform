export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface CartItem extends Product {
  quantity: number;
}