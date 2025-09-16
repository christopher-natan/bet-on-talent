import { LoginView } from './components/login-view'

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <LoginView />
      </div>
    </main>
  )
}

