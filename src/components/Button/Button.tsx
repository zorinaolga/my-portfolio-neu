import { useId, type ComponentPropsWithoutRef, type MouseEvent } from "react";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "md" | "lg";

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "disabled"> {
  /** Вигляд кнопки: основна, другорядна або текстова. */
  variant?: ButtonVariant;
  /** Розмір: звичайний або великий. */
  size?: ButtonSize;
  /**
   * Вимкнена кнопка. Це `aria-disabled`, а не атрибут `disabled`:
   * кнопка лишається у фокусі, клік не спрацьовує.
   */
  disabled?: boolean;
  /** Пояснення під вимкненою кнопкою; зв'язується через `aria-describedby`. */
  disabledReason?: string;
}

const base =
  "inline-flex items-center justify-center font-sans text-ink rounded-control " +
  "outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink";

const sizes: Record<ButtonSize, string> = {
  md: "px-4 py-3 text-caption",
  lg: "px-8 py-4 text-body",
};

const variants: Record<ButtonVariant, { active: string; disabled: string }> = {
  primary: {
    active: "bg-accent hover:bg-primary hover:text-canvas",
    disabled: "bg-line text-ink-muted cursor-not-allowed",
  },
  secondary: {
    active: "border-2 border-ink-muted bg-transparent hover:bg-line",
    disabled: "border-2 border-line bg-transparent text-ink-muted cursor-not-allowed",
  },
  text: {
    active: "bg-transparent text-primary underline hover:bg-line",
    disabled: "bg-transparent text-ink-muted underline cursor-not-allowed",
  },
};

/**
 * Кнопка дизайн-системи: три варіанти, два розміри, стани default,
 * hover, focus і disabled.
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  disabledReason,
  className,
  onClick,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const reasonId = useId();
  const hasReason = disabled && Boolean(disabledReason);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const classes = [
    base,
    sizes[size],
    disabled ? variants[variant].disabled : variants[variant].active,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const button = (
    <button
      {...rest}
      type={type}
      aria-disabled={disabled || undefined}
      aria-describedby={hasReason ? reasonId : rest["aria-describedby"]}
      onClick={handleClick}
      className={classes}
    >
      {children}
    </button>
  );

  if (!hasReason) return button;

  return (
    <div className="inline-flex flex-col items-start gap-2">
      {button}
      <p id={reasonId} className="font-sans text-caption text-ink-muted">
        {disabledReason}
      </p>
    </div>
  );
}
