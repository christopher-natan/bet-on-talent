import { Participant } from '@/models/participants-model'

export function GraphWidget({ data }: { data: Participant[] }) {
  const total = data.reduce((s, d) => s + d.participation, 0)
  const r = 70
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="flex items-center gap-8">
      <svg width="220" height="220" viewBox="0 0 200 200" className="shrink-0">
        <g transform="translate(100,100)">
          <circle r={48} fill="transparent" strokeWidth={0} />
          {data.map((d, idx) => {
            const val = (d.participation / total) * c
            const dash = `${val} ${c - val}`
            const el = (
              <circle
                key={idx}
                r={r}
                cx={0}
                cy={0}
                fill="transparent"
                stroke={d.color}
                strokeWidth={34}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                transform="rotate(-90)"
              />
            )
            offset += val
            return el
          })}
          <circle r={36} fill="transparent" />
        </g>
      </svg>
      <ul className="space-y-2 text-sm">
        {data.map((d, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span>{d.firstName} {d.lastName}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
