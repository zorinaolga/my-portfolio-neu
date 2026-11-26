"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type Ref,
} from "react";

export type FormFieldVariant =
  | "name"
  | "email"
  | "interest"
  | "project"
  | "company";

type FormFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface Preset {
  control: "input" | "textarea" | "select";
  label: string;
  placeholder: string;
  /** Немає тексту: поле не має стану помилки. */
  errorText?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  required: boolean;
  maxLength?: number;
}

/** Поля форми запиту з плану сайту. */
const presets: Record<FormFieldVariant, Preset> = {
  name: {
    control: "input",
    label: "Ваше імʼя",
    placeholder: "Наприклад, Олена",
    errorText: "Вкажіть ваше імʼя.",
    autoComplete: "name",
    required: true,
  },
  email: {
    control: "input",
    type: "email",
    label: "Електронна пошта",
    placeholder: "name@example.com",
    errorText: "Введіть пошту у форматі name@example.com.",
    autoComplete: "email",
    required: true,
  },
  interest: {
    control: "select",
    label: "Що вас цікавить?",
    placeholder: "Оберіть напрям",
    errorText: "Оберіть, що вас цікавить.",
    required: true,
  },
  project: {
    control: "textarea",
    label: "Коротко про ваш проєкт (необовʼязково)",
    placeholder: "Розкажіть про ваш бізнес і завдання, яке хочете вирішити",
    required: false,
    maxLength: 1000,
  },
  company: {
    control: "input",
    label: "Назва компанії або сайт (необовʼязково)",
    placeholder: "Назва або адреса сайту",
    autoComplete: "organization",
    required: false,
    maxLength: 250,
  },
};

const interestOptions = [
  "Лендінг",
  "Багатосторінковий сайт",
  "Редизайн сайту",
  "Створення зображень",
  "Створення відео",
  "Комплексне рішення",
  "Інше завдання",
  "Потрібна консультація",
];

export interface FormFieldProps
  extends Omit<InputHTMLAttributes<FormFieldElement>, "type"> {
  /** Яке це поле форми запиту: задає тип, підпис, підказку й текст помилки. */
  variant?: FormFieldVariant;
  /** Підпис над полем; порожній означає підпис варіанта. */
  label?: string;
  /** Підказка в порожньому полі; порожня означає підказку варіанта. */
  placeholder?: string;
  /**
   * Поле з помилкою: межа `danger`, під полем іконка й текст.
   * У `project` і `company` стану помилки немає: їх захищає ліміт символів.
   */
  error?: boolean;
  /** Текст помилки; порожній означає текст варіанта. */
  errorText?: string;
  /** Вимкнене поле (атрибут `disabled`); помилка тоді не показується. */
  disabled?: boolean;
  /** Пункти списку для варіанта `interest`. */
  options?: string[];
  /** Тип `<input>`; за замовчуванням з варіанта. */
  type?: HTMLInputTypeAttribute;
  ref?: Ref<FormFieldElement>;
}

const base =
  "w-full border-2 rounded-control px-4 py-3 font-sans text-caption " +
  "placeholder:text-ink-muted outline-offset-2 " +
  "focus-visible:outline-2 focus-visible:outline-ink";

const states = {
  default:
    "border-ink-muted bg-surface text-ink " +
    "hover:border-ink hover:placeholder:text-ink",
  error: "border-danger bg-surface text-ink",
  disabled:
    "border-ink-muted bg-transparent text-ink-muted cursor-not-allowed",
};

// Список без вибору (:invalid) показує підказку приглушеним кольором.
const selectStates = {
  default: "invalid:text-ink-muted hover:invalid:text-ink",
  error: "invalid:text-ink-muted",
  disabled: "",
};

/**
 * Поле форми з підписом: пʼять варіантів і стани default, hover, focus,
 * заповнене, помилка і disabled.
 */
export function FormField({
  variant = "name",
  label,
  placeholder,
  error = false,
  errorText,
  disabled = false,
  options = interestOptions,
  id,
  type,
  required,
  autoComplete,
  value,
  defaultValue,
  maxLength,
  onChange,
  className,
  ref,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}: FormFieldProps) {
  const preset = presets[variant];
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const showError = error && !disabled && preset.errorText !== undefined;
  const state = disabled ? "disabled" : showError ? "error" : "default";
  const hint = placeholder || preset.placeholder;
  const limit = maxLength ?? preset.maxLength;
  const counterId = `${inputId}-counter`;
  const showCounter = limit !== undefined;
  // Браузер обмежує лише введення, тому задане з коду значення обрізаємо.
  const clip = (text: FormFieldProps["value"]) =>
    limit === undefined || text === undefined
      ? text
      : String(text).slice(0, limit);
  const clippedValue = clip(value);
  const clippedDefault = clip(defaultValue);
  // Довжина для лічильника; у керованому полі береться з value.
  const [typedLength, setTypedLength] = useState(
    String(clippedDefault ?? "").length,
  );
  const length =
    value === undefined ? typedLength : String(clippedValue).length;

  const shared = {
    ...rest,
    id: inputId,
    disabled,
    required: required ?? preset.required,
    autoComplete: autoComplete ?? preset.autoComplete,
    value: clippedValue,
    defaultValue: clippedDefault,
    maxLength: limit,
    onChange: (event: ChangeEvent<FormFieldElement>) => {
      setTypedLength(event.target.value.length);
      onChange?.(event);
    },
    "aria-invalid": showError || ariaInvalid,
    "aria-describedby":
      [describedBy, showError && errorId, showCounter && counterId]
        .filter(Boolean)
        .join(" ") || undefined,
  };
  const classes = (...extra: string[]) =>
    [base, states[state], ...extra, className].filter(Boolean).join(" ");

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={inputId}
        className={`font-sans text-caption tracking-label ${
          disabled ? "text-ink-muted" : "text-ink"
        }`}
      >
        {label || preset.label}
      </label>

      {preset.control === "select" ? (
        <select
          {...shared}
          ref={ref as Ref<HTMLSelectElement>}
          defaultValue={
            value === undefined ? (defaultValue ?? "") : undefined
          }
          className={classes(selectStates[state])}
        >
          <option value="" disabled>
            {hint}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
      ) : preset.control === "textarea" ? (
        <textarea
          rows={4}
          {...shared}
          ref={ref as Ref<HTMLTextAreaElement>}
          placeholder={hint}
          className={classes("resize-y")}
        />
      ) : (
        <input
          {...shared}
          ref={ref as Ref<HTMLInputElement>}
          type={type ?? preset.type ?? "text"}
          placeholder={hint}
          className={classes()}
        />
      )}

      {showError && (
        <p
          id={errorId}
          className="flex items-start gap-2 font-sans text-caption text-danger"
        >
          {/* h-lh: іконка по центру першого рядка тексту */}
          <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <circle cx="8" cy="8" r="7" />
              <path d="M8 4v5M8 11v1.5" />
            </svg>
          </span>
          <span>{errorText || preset.errorText}</span>
        </p>
      )}

      {showCounter && (
        <p
          id={counterId}
          className="self-end font-sans text-caption text-ink-muted"
        >
          {length} з {limit} символів
        </p>
      )}
    </div>
  );
}
