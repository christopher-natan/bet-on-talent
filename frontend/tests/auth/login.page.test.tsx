import { render, screen } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'

describe('LoginPage', () => {
  it('renders the Sign in title and Login button', () => {
    render(<LoginPage />)
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })
})

