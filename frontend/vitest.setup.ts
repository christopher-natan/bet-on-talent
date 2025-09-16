import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js navigation for components using useRouter()
vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      replace: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
    }),
  }
})

