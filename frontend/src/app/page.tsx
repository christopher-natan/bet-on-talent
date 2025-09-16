import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="text-muted-foreground"></p>
        <div className="flex gap-4 justify-center">
          <Link className="underline" href="/login">Login</Link>
        </div>
      </div>
    </main>
  )
}
