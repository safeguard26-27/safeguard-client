import * as React from "react"
import { cn } from "cn"

type SummaryItem = { id: string; label: React.ReactNode; value: React.ReactNode; color?: string; className?: string }
type SummaryProps = { items: SummaryItem[]; className?: string; columns?: 2 | 3 | 4 | 5 | 6 }

const grids = { 2: "grid-cols-2", 3: "grid-cols-2 md:grid-cols-3", 4: "grid-cols-2 md:grid-cols-4", 5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5", 6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" }

function Summary({ items, className, columns = items.length as SummaryProps["columns"] }: SummaryProps) {
  const count = Math.max(2, Math.min(6, columns ?? 4)) as NonNullable<SummaryProps["columns"]>
  const visibleItems = items.slice(0, count)
  return (
    <div className={cn("grid gap-0 rounded-xl border border-border bg-card px-2 py-5 shadow-sm sm:px-6", grids[count], className)}>
      {visibleItems.map((item) => (
        <article key={item.id} className={cn("min-w-0 border-r border-border px-6 py-1 last:border-r-0", item.className)}>
          <div className="truncate text-xs text-muted-foreground">{item.label}</div>
          <div className="mt-1 text-2xl font-bold tabular-nums" style={item.color ? { color: item.color } : undefined}>{item.value}</div>
        </article>
      ))}
    </div>
  )
}

export { Summary }
export type { SummaryItem, SummaryProps }