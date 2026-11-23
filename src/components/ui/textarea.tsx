import * as React from "react"
import { cn } from "cn"

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
}

function Textarea({ id, label, helperText, error, className, containerClassName, disabled, style, ...props }: TextareaProps) {
  const generatedId = React.useId()
  const textareaId = id ?? generatedId
  const messageId = `${textareaId}-message`
  return (
    <div className={cn("grid w-full gap-2", containerClassName)}>
      {label && <label htmlFor={textareaId} className="text-sm font-medium text-foreground">{label}</label>}
      <textarea
        id={textareaId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error || helperText ? messageId : undefined}
        className={cn("min-h-24 w-full resize-y rounded-md border border-input bg-background p-3 font-mono text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground", className)}
        style={{ fontFamily: '"D2 Coding", "D2Coding", monospace', ...style }}
        {...props}
      />
      {(error || helperText) && <p id={messageId} className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>{error ?? helperText}</p>}
    </div>
  )
}

export { Textarea }
export type { TextareaProps }
