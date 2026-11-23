import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "cn"

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  label?: string
  helperText?: string
  error?: string
  containerClassName?: string
  /** Renders a password field with an accessible show/hide control. */
  showPasswordToggle?: boolean
  size?: "sm" | "default" | "lg"
  validate?: (value: string) => string | undefined
  validateOn?: "change" | "blur" | "both"
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const inputSizeClass = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
}

function Input({
  id,
  label,
  helperText,
  error,
  className,
  containerClassName,
  showPasswordToggle = false,
  type = "text",
  size = "default",
  disabled,
  style,
  validate,
  validateOn = "change",
  onChange,
  onBlur,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [validationError, setValidationError] = React.useState<string>()
  const isPassword = type === "password" || showPasswordToggle
  const isSearch = type === "search"
  const visibleError = error ?? validationError

  const validateValue = (value: string) => {
    setValidationError(validate?.(value))
  }

  return (
    <div className={cn("grid w-full gap-2", containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-base font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Native type="search" adds a browser-specific clear button; render text with search styling instead. */}
        <input
          id={inputId}
          type={isPassword ? (passwordVisible ? "text" : "password") : isSearch ? "text" : type}
          role={isSearch ? "searchbox" : undefined}
          disabled={disabled}
          aria-invalid={Boolean(visibleError)}
          aria-describedby={visibleError || helperText ? messageId : undefined}
          className={cn(
            "flex w-full rounded-md border border-input bg-background font-mono text-foreground shadow-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/30 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70",
            inputSizeClass[size],
            (isPassword || isSearch) && "pr-11",
            isSearch && "pl-10",
            className
          )}
          style={{ fontFamily: '"D2 Coding", "D2Coding", monospace', ...style }}
          onChange={(event) => {
            if (validate && (validateOn === "change" || validateOn === "both")) {
              validateValue(event.currentTarget.value)
            }
            onChange?.(event)
          }}
          onBlur={(event) => {
            if (validate && (validateOn === "blur" || validateOn === "both")) {
              validateValue(event.currentTarget.value)
            }
            onBlur?.(event)
          }}
          {...props}
        />
        {isSearch && <Search aria-hidden="true" size={18} className="absolute inset-y-0 left-3 my-auto text-muted-foreground" />}
        {isPassword && (
          <button
            type="button"
            aria-label={passwordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
            aria-pressed={passwordVisible}
            disabled={disabled}
            onClick={() => setPasswordVisible((visible) => !visible)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
          >
            <span className="text-xs font-medium text-primary">{passwordVisible ? "숨김" : "표시"}</span>
          </button>
        )}
      </div>
      {(visibleError || helperText) && (
        <p id={messageId} className={cn("text-xs transition-colors", visibleError ? "text-destructive" : "text-muted-foreground")}>
          {visibleError ?? helperText}
        </p>
      )}
    </div>
  )
}

export { Input }
export type { InputProps }
