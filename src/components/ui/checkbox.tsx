import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "cn"

type CheckboxProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "size"> & {
  label?: React.ReactNode
  size?: "sm" | "default" | "lg"
  containerClassName?: string
}

const boxSizes = { sm: "size-[18px]", default: "size-5", lg: "size-6" }

function Checkbox({ id, label, size = "default", className, containerClassName, disabled, ...props }: CheckboxProps) {
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId
  const control = (
    <CheckboxPrimitive.Root
      id={checkboxId}
      disabled={disabled}
      className={cn(
        "peer inline-flex shrink-0 items-center justify-center rounded-[4px] border border-input bg-background text-primary-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/30 data-checked:border-primary data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:opacity-60",
        boxSizes[size], className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid size-full place-items-center" aria-hidden="true">
        <svg
          aria-hidden="true"
          width={size === "sm" ? 7 : size === "lg" ? 10 : 8}
          height={size === "sm" ? 7 : size === "lg" ? 10 : 8}
          viewBox="0 0 12 12"
          fill="none"
          className="-translate-y-px"
        >
          <path d="m2.5 6.2 2.2 2.1 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
  if (!label) return control
  return <div className={cn("flex items-center gap-2", containerClassName)}>{control}<label htmlFor={checkboxId} className={cn("cursor-pointer text-foreground peer-data-disabled:cursor-not-allowed peer-data-disabled:text-muted-foreground", size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm", disabled && "cursor-not-allowed text-muted-foreground")}>{label}</label></div>
}

export { Checkbox }
export type { CheckboxProps }
