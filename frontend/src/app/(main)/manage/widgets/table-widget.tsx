"use client"
import { Participant } from '@/models/participants-model'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { STRINGS } from '@/strings'
import { useState } from 'react'

export function TableWidget({ data, onDelete }: { data: Participant[]; onDelete?: (index: number) => void | Promise<void> }) {
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

  const handleDelete = async (index: number) => {
    // Prevent duplicate clicks on the same row
    if (deletingIndex !== null) return
    setDeletingIndex(index)
    try {
      await Promise.resolve(onDelete?.(index))
    } finally {
      // Reset if the row still exists; if it was removed optimistically, component rerenders anyway
      setDeletingIndex((prev) => (prev === index ? null : prev))
    }
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 pr-4">#</th>
            <th className="py-2 pr-4">First name</th>
            <th className="py-2 pr-4">Last name</th>
            <th className="py-2 pr-4">Participation</th>
            <th className="py-2 pr-4 text-right">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr key={i} className="border-b border-border">
              <td className="py-2 pr-4">{i + 1}</td>
              <td className="py-2 pr-4">{p.firstName}</td>
              <td className="py-2 pr-4">{p.lastName}</td>
              <td className="py-2 pr-4">{p.participation}%</td>
              <td className="py-2 pr-0">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={STRINGS.manage.delete}
                    title={STRINGS.manage.delete}
                    onClick={() => handleDelete(i)}
                    disabled={deletingIndex === i}
                  >
                    {deletingIndex === i ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
