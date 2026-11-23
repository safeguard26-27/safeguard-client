import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"
import { cn } from "cn"

type SelectOption = { value: string; label: React.ReactNode; disabled?: boolean }

type SelectProps = {
  label?: string
  helperText?: string
  error?: string
  placeholder?: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  required?: boolean
  className?: string
  size?: "sm" | "default" | "lg"
}

const sizes = { sm: "h-9", default: "h-10", lg: "h-12" }

function Select({
  label,
  helperText,
  error,
  placeholder = "선택해 주세요",
  options,
  className,
  size = "default",
  ...props
}: SelectProps) {
  const id = React.useId()
  const descriptionId = `${id}-description`

  return (
    <div className="grid w-full gap-2">
      {label && <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>}
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? descriptionId : undefined}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-4 text-left text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 data-placeholder:text-muted-foreground aria-invalid:border-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70",
            sizes[size], className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="mr-1.5"><ChevronDown size={16} aria-hidden="true" /></SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content position="popper" sideOffset={4} align="start" className="z-50 max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg">
              <SelectPrimitive.Viewport>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="relative flex cursor-default select-none items-center rounded-md py-2 pl-3 pr-9 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="absolute right-3"><Check size={16} aria-hidden="true" /></SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {(error || helperText) && <p id={descriptionId} className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>{error ?? helperText}</p>}
    </div>
  )
}

export { Select }
export type { SelectOption, SelectProps }
