"use client"
import { Button } from '@/components/ui/button'
import { LoginController } from './login-controller'
import { STRINGS } from '@/strings'

export function LoginView() {
  const controller = LoginController()

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); controller.actions.submit() }}
      className="space-y-4 max-w-sm w-full"
    >
      <div className="space-y-2">
        <label className="text-sm" htmlFor="email">{STRINGS.login.email}</label>
        <input
          id="email"
          type="email"
          value={controller.state.email}
          onChange={(e) => controller.actions.setEmail(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm" htmlFor="password">{STRINGS.login.password}</label>
        <input
          id="password"
          type="password"
          value={controller.state.password}
          onChange={(e) => controller.actions.setPassword(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          required
        />
      </div>
      {controller.state.errors && controller.state.errors.length > 0 && (
        <ul className="text-xs text-destructive pl-5 space-y-1">
          {controller.state.errors.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
      <Button type="submit" className="w-full" disabled={controller.state.submitting}>
        {controller.state.submitting ? STRINGS.login.submitting ?? 'Logging in...' : STRINGS.login.submit}
      </Button>
    </form>
  )
}
