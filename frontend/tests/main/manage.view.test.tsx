import { render, screen } from '@testing-library/react'
import { ManageView } from '@/app/(main)/manage/components/manage-view'

describe('ManageView', () => {
  it('renders the header', () => {
    render(<ManageView />)
    expect(screen.getByText(/User Participation/i)).toBeInTheDocument()
  })
})

