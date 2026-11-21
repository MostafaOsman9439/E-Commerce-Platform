import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { Product } from '../types'

// The auth store imports the Supabase client, which needs real keys.
// Tests should not need keys or a network, so we replace it with an empty fake.
vi.mock('../lib/supabase', () => ({ supabase: {} }))

const shirt: Product = {
  id: 1,
  title: 'Shirt',
  price: 20,
  category: 'clothes',
  image: 'shirt.png',
}

// ProductCard contains a <Link>, which only works inside a router.
// MemoryRouter is a fake router made for tests.
const renderCard = (onAddToCart = vi.fn()) => {
  render(
    <MemoryRouter>
      <ProductCard product={shirt} onAddToCart={onAddToCart} />
    </MemoryRouter>
  )
  return onAddToCart
}

describe('ProductCard', () => {
  it('shows the title and the formatted price', () => {
    renderCard()

    expect(screen.getByText('Shirt')).toBeInTheDocument()
    expect(screen.getByText('$20.00')).toBeInTheDocument()
  })

  it('calls onAddToCart with the product when the button is clicked', async () => {
    const onAddToCart = renderCard()

    await userEvent.click(screen.getByRole('button', { name: 'Add to cart' }))

    expect(onAddToCart).toHaveBeenCalledWith(shirt)
  })
})
