@AGENTS.md

# Olha Zorina — сайт-портфоліо

## Стек

- Next.js (App Router), код у `src/app`
- TypeScript
- Tailwind CSS
- Аліас імпортів: `@/*` → `src/*`

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки користувач прямо не попросить.
- Пуш у `main` публікує сайт (Vercel), тому перед пушем завжди питай користувача.

## Токени

Єдине джерело значень — блок `@theme` у `src/app/globals.css`. Стандартні палітра, розміри тексту й радіуси Tailwind скинуто: класи на кшталт `bg-blue-600`, `text-sm`, `text-white` не працюють і не повідомляють про помилку. Hex, rgb і значення в квадратних дужках (`p-[13px]`) у компонентах заборонені.

- **Кольори:** `canvas` (фон), `surface` (картки, поля), `line` (лінії й рамки карток), `primary` (імʼя, ключові заголовки), `accent` (лише заливки й лінії, не текст: контраст 3,01), `ink` (текст), `ink-muted` (приглушений текст, межі полів), `danger` (помилка). Класи: `bg-canvas`, `text-ink`, `border-line` тощо. На акцентній заливці текст `ink`, не `canvas`.
- **Шрифти:** `font-sans` (Manrope, весь текст) і `font-display` (Aboreto, лише імʼя). Підключені в `src/app/fonts.ts`.
- **Текст:** `text-caption` (16), `text-body` (20), `text-lead` (24), `text-heading` (32), `text-display` (64). Висота рядка, трекінг і жирність задані парами в `@theme`. Додатково: `tracking-label` (напівжирні підписи), `tracking-caps` (великі літери).
- **Радіуси:** `rounded-control`, `rounded-card` (зараз обидва 0: кути прямі).
- **Пропорції:** `aspect-hero`, `aspect-logo`, `aspect-cover`, `aspect-portrait`.
- **Відступи:** тільки 8, 12, 16, 24, 32 px (числа 2, 3, 4, 6, 8: `p-2`, `gap-4`).
- **Розкладка (лише для сторінок, не для компонентів):** `max-w-page` (1240), `px-page` (100), `py-section` / `gap-section` (40).
- **Запропоновано, не з макета:** `surface`, `ink-muted`, `danger`, радіуси, `aspect-cover`, `aspect-portrait`, `py-section` для інших секцій. Темної теми в токенах поки немає.

## Компоненти

- **Button** (`src/components/Button/Button.tsx`): варіанти `primary`, `secondary`, `text`; розміри `md`, `lg`; `disabled` через `aria-disabled` + `disabledReason` (`aria-describedby`). Докладно: Storybook → Components/Button → Docs.
- **FormField** (`src/components/FormField/FormField.tsx`): поле форми запиту; варіанти `name`, `email`, `interest` (список), `project` (до 1000 символів), `company` (до 250); `error` + `errorText` лише в `name`, `email`, `interest`; `disabled`. Докладно: Storybook → Components/FormField → Docs.
- **WorkCard** (`src/components/WorkCard/WorkCard.tsx`): картка роботи: `cover` (імпорт з `src/assets`), `title`, `description`, `href`; уся картка є посиланням, стани default, hover, focus. Докладно: Storybook → Components/WorkCard → Docs.
- **Navigation** (`src/components/Navigation/Navigation.tsx`): меню сайту: `activeHref` (активний пункт, `aria-current="page"`), `items`, `menuLabel`, `ariaLabel`; стани пункту default, hover, focus, активний; на вузькому екрані (нижче `md`) згортається в кнопку, меню відкривається поверх контенту й закривається клавішею Escape. Докладно: Storybook → Components/Navigation → Docs.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [План сайту-портфоліо — Olha Zorina (v2).md](<./План сайту-портфоліо — Olha Zorina (v2).md>)
