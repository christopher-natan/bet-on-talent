"use client"
import {ManageController} from '@/app/(main)/manage/components/manage-controller'
import {TableWidget} from '@/app/(main)/manage/widgets/table-widget'
import {GraphWidget} from '@/app/(main)/manage/widgets/graph-widget'
import {STRINGS} from "@/strings";

export function ManageView() {
  const controller = ManageController()

  return (
    <div className="space-y-8">
      <section className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">{STRINGS.manage.header}</h2>
        <p className="text-muted-foreground">{STRINGS.manage.description}</p>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        {controller.hasRecords && (
          <>
            <div>
              <TableWidget data={controller.participants} onDelete={(i) => controller.actions.deleteAt(i)} />
            </div>
            <div className="flex justify-center">
              <GraphWidget data={controller.participants} />
            </div>
          </>
        )}
      </section>
    </div>
  )
}
