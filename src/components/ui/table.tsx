import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "cn"

type Column<T> = {
  key: string
  header: React.ReactNode
  cell: (row: T, index: number) => React.ReactNode
  /** Plain text used to size the column against every row, including other pages. */
  text?: (row: T) => string
  /** Relative width weight. Text columns are sized from their longest value when omitted. */
  width?: number
  minChars?: number
  maxChars?: number
  className?: string
}

type DataTableProps<T> = {
  title?: React.ReactNode
  columns: Column<T>[]
  data: T[]
  getRowKey: (row: T, index: number) => React.Key
  pageSize?: number
  maxCellChars?: number
  minTableWidth?: string
  maxTableWidth?: string
  page?: number
  onPageChange?: (page: number) => void
  emptyMessage?: React.ReactNode
  className?: string
}

function DataTable<T>({ title, columns, data, getRowKey, pageSize = 10, maxCellChars = 32, minTableWidth = "900px", maxTableWidth = "100%", page, onPageChange, emptyMessage = "표시할 데이터가 없습니다.", className }: DataTableProps<T>) {
  const [internalPage, setInternalPage] = React.useState(1)
  const controlled = page !== undefined
  const pageCount = Math.max(1, Math.ceil(data.length / Math.max(1, pageSize)))
  const currentPage = Math.min(controlled ? page : internalPage, pageCount)
  const setPage = (next: number) => {
    const bounded = Math.max(1, Math.min(next, pageCount))
    if (!controlled) setInternalPage(bounded)
    onPageChange?.(bounded)
  }
  const pageRows = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const columnWeights = columns.map((column) => {
    if (column.width !== undefined) return column.width
    const lengths = column.text ? data.map((row) => column.text?.(row).length ?? 0) : []
    const longest = Math.max(column.minChars ?? 8, ...lengths)
    return Math.min(column.maxChars ?? maxCellChars, longest)
  })
  const totalWidthWeight = columnWeights.reduce((total, weight) => total + weight, 0) || 1

  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card", className)}>
      {title !== undefined && <div className="flex h-12 items-center border-b border-border px-5 text-base font-semibold text-foreground">{title}</div>}
      <div className="overflow-x-auto" style={{ maxWidth: maxTableWidth }}>
        <table className="w-full table-fixed border-collapse text-left text-sm" style={{ minWidth: minTableWidth }}>
          <colgroup>{columns.map((column, index) => <col key={column.key} style={{ width: `${(columnWeights[index] / totalWidthWeight) * 100}%` }} />)}</colgroup>
          <thead className="bg-muted/70 text-muted-foreground">
            <tr>{columns.map((column) => <th key={column.key} scope="col" title={typeof column.header === "string" ? column.header : undefined} className={cn("h-[60px] overflow-hidden text-ellipsis whitespace-nowrap px-4 text-xs font-medium", column.className)}>{column.header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pageRows.length ? pageRows.map((row, rowIndex) => <tr key={getRowKey(row, (currentPage - 1) * pageSize + rowIndex)} className="h-[60px] transition-colors hover:bg-muted/40">{columns.map((column) => {
              const rowIndexInData = (currentPage - 1) * pageSize + rowIndex
              const content = column.cell(row, rowIndexInData)
              const rawText = column.text?.(row) ?? (typeof content === "string" || typeof content === "number" ? String(content) : undefined)
              const limit = column.maxChars ?? maxCellChars
              const rendered = rawText && rawText.length > limit ? `${rawText.slice(0, limit)}…` : content
              return <td key={column.key} title={rawText} className={cn("overflow-hidden text-ellipsis whitespace-nowrap px-4 text-foreground", column.className)}><div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{rendered}</div></td>
            })}</tr>) : <tr><td colSpan={columns.length} className="h-24 px-4 text-center text-muted-foreground">{emptyMessage}</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3">
      <p className="text-xs text-muted-foreground">{data.length === 0 ? "0건" : `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, data.length)}개 표시 · 전체 ${data.length}건`}</p>
      <nav aria-label="테이블 페이지" className="flex items-center justify-end gap-2">
        <button type="button" aria-label="이전 페이지" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)} className="grid size-9 place-items-center rounded-md text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"><ChevronLeft size={18} /></button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" aria-current={pageNumber === currentPage ? "page" : undefined} onClick={() => setPage(pageNumber)} className={cn("grid size-9 place-items-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", pageNumber === currentPage ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted")}>{pageNumber}</button>)}
        <button type="button" aria-label="다음 페이지" disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)} className="grid size-9 place-items-center rounded-md text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"><ChevronRight size={18} /></button>
      </nav>
      </div>
    </div>
  )
}

export { DataTable }
export type { Column, DataTableProps }
