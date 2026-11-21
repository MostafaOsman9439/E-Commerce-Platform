import { beforeEach, describe, expect, it } from 'vitest'
import { selectCartCount, useCartStore } from './useCartStore'
import { Product } from '../types'

// Fake products with only the required fields
const shirt: Product = {
  id: 1,
  title: 'Shirt',
  price: 20,
  category: 'clothes',
  image: 'shirt.png',
}

const hat: Product = {
  id: 2,
  title: 'Hat',
  price: 10,
  category: 'clothes',
  image: 'hat.png',
}

describe('useCartStore', () => {
  // The store lives outside the tests, so we empty it before each one.
  // Otherwise one test could leave items behind and break the next.
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('adds a new product with quantity 1', () => {
    useCartStore.getState().addToCart(shirt)

    expect(useCartStore.getState().items).toEqual([{ product: shirt, quantity: 1 }])
  })

  it('increases quantity when the same product is added twice', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().addToCart(shirt)

    expect(useCartStore.getState().items).toEqual([{ product: shirt, quantity: 2 }])
  })

  it('removes only the chosen product', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().addToCart(hat)
    useCartStore.getState().removeFromCart(1)

    expect(useCartStore.getState().items).toEqual([{ product: hat, quantity: 1 }])
  })

  it('increases the quantity of one product', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().increaseQuantity(1)

    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it('decreases the quantity of one product', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().increaseQuantity(1)
    useCartStore.getState().decreaseQuantity(1)

    expect(useCartStore.getState().items[0].quantity).toBe(1)
  })

  it('removes the product when its quantity reaches 0', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().decreaseQuantity(1)

    expect(useCartStore.getState().items).toEqual([])
  })

  it('empties the cart with clearCart', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().addToCart(hat)
    useCartStore.getState().clearCart()

    expect(useCartStore.getState().items).toEqual([])
  })

  it('counts the total quantity across products', () => {
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().addToCart(shirt)
    useCartStore.getState().addToCart(hat)

    // 2 shirts + 1 hat = 3
    expect(selectCartCount(useCartStore.getState())).toBe(3)
  })
})
