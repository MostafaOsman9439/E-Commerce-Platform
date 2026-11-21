import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Remove rendered components after each test so they don't pile up on the screen
afterEach(() => {
  cleanup()
})
