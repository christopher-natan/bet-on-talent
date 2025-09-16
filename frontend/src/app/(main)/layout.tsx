import { TopFormWidget } from './widgets/top-form/top-form-widget'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopFormWidget />
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  )
}
