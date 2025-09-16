import Link from 'next/link'
import { STRINGS } from '@/strings'
import { ROUTES } from '@/routes'

export default function NotAuthorizedPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">{STRINGS.notAuthorized.title}</h1>
        <p className="text-muted-foreground">{STRINGS.notAuthorized.message}</p>
        <p>
          <Link className="underline" href={ROUTES.LOGIN}>
            {STRINGS.notAuthorized.cta}
          </Link>
        </p>
      </div>
    </main>
  )
}

