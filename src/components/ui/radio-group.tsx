import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "cn"

type RadioOption = { value: string; label: React.ReactNode; disabled?: boolean }
type RadioGroupProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, "children"> & {
  options: RadioOption[]
  label?: string
  size?: "sm" | "default" | "lg"
}

const radioSizes = { sm: "size-[18px]", default: "size-[22px]", lg: "size-6" }

function RadioGroup({ options, label, className, size = "default", ...props }: RadioGroupProps) {
  const id = React.useId()
  return (
    <fieldset className="grid gap-3">
      {label && <legend className="mb-1 text-sm font-medium text-foreground">{label}</legend>}
      <RadioGroupPrimitive.Root className={cn("flex flex-wrap gap-4", className)} {...props}>
        {options.map((option, index) => {
          const optionId = `${id}-${index}`
          return (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupPrimitive.Item id={optionId} value={option.value} disabled={option.disabled} className={cn("grid shrink-0 place-items-center rounded-full border-[1.5px] border-input bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring/30 data-checked:border-primary data-checked:bg-primary data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:opacity-60", radioSizes[size])}>
                <RadioGroupPrimitive.Indicator className="size-2 rounded-full bg-background" />
              </RadioGroupPrimitive.Item>
              <label htmlFor={optionId} className={cn("cursor-pointer", size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm", option.disabled && "cursor-not-allowed text-muted-foreground")}>{option.label}</label>
            </div>
          )
        })}
      </RadioGroupPrimitive.Root>
    </fieldset>
  )
}

export { RadioGroup }
export type { RadioGroupProps, RadioOption }
