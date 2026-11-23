import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "cn"

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: React.ReactNode
  containerClassName?: string
  size?: "sm" | "default"
}

function Switch({ id, label, className, containerClassName, disabled, size = "sm", ...props }: SwitchProps) {
  const generatedId = React.useId()
  const switchId = id ?? generatedId
  const control = (
    <SwitchPrimitive.Root id={switchId} disabled={disabled} className={cn("peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full bg-input p-0.5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/30 data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50", size === "sm" ? "h-6 w-11" : "h-[26px] w-12", className)} {...props}>
      <SwitchPrimitive.Thumb className={cn("pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform duration-200", size === "sm" ? "size-5 data-checked:translate-x-5" : "size-[22px] data-checked:translate-x-[22px]")} />
    </SwitchPrimitive.Root>
  )
  if (!label) return control
  return <div className={cn("flex items-center gap-2", containerClassName)}>{control}<label htmlFor={switchId} className={cn("cursor-pointer text-sm", disabled && "cursor-not-allowed text-muted-foreground")}>{label}</label></div>
}

export { Switch }
export type { SwitchProps }
