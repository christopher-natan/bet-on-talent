"use client"
// Top bar widget: shows theme toggle + logout at very top-right and the participant form below.
import { Button } from '@/components/ui/button'
import { LogOut, Moon, Sun } from 'lucide-react'
import { TopFormController } from './top-form-controller'
import { STRINGS } from '@/strings'

export function TopFormWidget() {
  const controller = TopFormController()
  return (
    <div className="relative bg-cyan-500 text-white">
      {/* Global controls at very top-right */}
      <div className="absolute right-4 top-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={STRINGS.common.toggleTheme}
            title={STRINGS.common.toggleTheme}
            onClick={() => controller.actions.toggleTheme()}
            className="text-white hover:bg-cyan-600"
          >
            {controller.state.theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={STRINGS.common.logout}
            title={STRINGS.common.logout}
            onClick={() => controller.actions.logout()}
            className="text-white hover:bg-cyan-600"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <form
          className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault()
            controller.actions.submit().then()
          }}
        >
          <div>
            <input
              placeholder={STRINGS.topForm.placeholders.firstName}
              className="h-10 w-full rounded-md px-3 text-black"
              value={controller.state.first}
              onChange={(e) => controller.actions.setFirst(e.target.value)}
            />
            {controller.state.errors.first && (
              <p className="mt-1 text-xs text-red-100">{controller.state.errors.first}</p>
            )}
          </div>
          <div>
            <input
              placeholder={STRINGS.topForm.placeholders.lastName}
              className="h-10 w-full rounded-md px-3 text-black"
              value={controller.state.last}
              onChange={(e) => controller.actions.setLast(e.target.value)}
            />
            {controller.state.errors.last && (
              <p className="mt-1 text-xs text-red-100">{controller.state.errors.last}</p>
            )}
          </div>
          <div>
            <input
              placeholder={STRINGS.topForm.placeholders.participation}
              className="h-10 w-full rounded-md px-3 text-black"
              value={controller.state.part}
              onChange={(e) => controller.actions.setPart(e.target.value)}
            />
            {controller.state.errors.part && (
              <p className="mt-1 text-xs text-red-100">{controller.state.errors.part}</p>
            )}
          </div>
          <Button type="submit" className="h-10" disabled={controller.state.submitting}>
            {controller.state.submitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {STRINGS.topForm.saving}
              </span>
            ) : (
              STRINGS.topForm.submit
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
