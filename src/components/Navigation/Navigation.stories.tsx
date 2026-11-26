import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navigation, defaultNavigationItems } from "./Navigation";

const description = `
Меню сайту: пункти для переходу між напрямами й до контактів.

## Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`items\` | список \`{ label, href }\` | UX/UI Дизайн (\`/design\`), ШІ Контент (\`/ai-content\`), Контакти (\`/#contacts\`) |
| \`activeHref\` | \`href\` пункту поточної сторінки | немає активного |
| \`menuLabel\` | напис кнопки на вузькому екрані | «Меню» |
| \`ariaLabel\` | назва меню для скрінрідера | «Головне меню» |

## Варіанти

Вигляд залежить від ширини екрана (поріг Tailwind \`md\`), окремого параметра немає.

- **Широкий екран:** пункти в ряд, кнопки меню немає.
- **Вузький екран:** є лише кнопка (другорядна \`Button\`). Меню відкривається поверх контенту й не зсуває сторінку. Закривається клавішею Escape (фокус повертається на кнопку), повторним натисканням кнопки або вибором пункту.

## Стани пункту

- **default**: текст \`ink\`, без заливки.
- **hover**: заливка \`line\`.
- **focus** (клавіша Tab): контур \`ink\` завтовшки 2 px з відступом, контраст з фоном canvas 15,34:1 (вимога 3:1).
- **активний**: текст \`primary\` і лінія \`accent\` знизу (контраст лінії з canvas 3,01:1). Має \`aria-current="page"\`.

## Токени

Кольори: \`ink\`, \`primary\`, \`accent\`, \`line\`, \`surface\`, а також ті, що має другорядна \`Button\`. Радіуси: \`rounded-control\`, \`rounded-card\`. Текст: \`text-caption\`, шрифт \`font-sans\`. Відступи: пункт \`px-4 py-3\`, між пунктами \`gap-2\`, панель \`p-2\` і \`mt-2\`.

## Коли використовувати

- Один раз на сторінці, у шапці, праворуч.
- Не для посилань у тексті чи підвалі (Impressum, Datenschutz).
- Перемикачі мови та теми в компонент не входять.

## Як брати в код

\`\`\`tsx
import { Navigation } from "@/components/Navigation/Navigation";

<Navigation activeHref="/design" />
\`\`\`
`;

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: description } },
    nextjs: { appDirectory: true },
  },
  argTypes: {
    activeHref: {
      name: "Активний пункт",
      control: {
        type: "select",
        labels: {
          "": "немає",
          ...Object.fromEntries(
            defaultNavigationItems.map((item) => [item.href, item.label]),
          ),
        },
      },
      options: ["", ...defaultNavigationItems.map((item) => item.href)],
    },
    items: { control: false },
    menuLabel: { control: "text" },
    ariaLabel: { control: "text" },
  },
  args: {
    activeHref: "/design",
    menuLabel: "Меню",
    ariaLabel: "Головне меню",
  },
  // Текст під меню показує, що відкрита панель лягає поверх нього.
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4 pb-8">
        <Story />
        <p className="font-sans text-body text-ink">
          Створюю сайти та візуальний контент для вашого бізнесу в єдиному
          стилі.
        </p>
        <p className="font-sans text-caption text-ink-muted">
          Це приклад контенту сторінки під меню.
        </p>
      </div>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
