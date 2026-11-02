// The Shape Of One Product Matches What Fake Store API Returns
export interface Product {
  id: number
  title: string
  price: number
  description?: string // "?" Means Optional: It May Be Missing
  stock?: number
  category: string
  image: string
}

// Defined Once Here So The Store And The Pages Always Agree On Its Shape
export interface CartItem {
  product: Product
  quantity: number
}
