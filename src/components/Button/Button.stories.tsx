import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const description = `
Кнопка для дій на сторінці: надіслати, відкрити, перейти.

## Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`variant\` | \`primary\`, \`secondary\`, \`text\` | \`primary\` |
| \`size\` | \`md\`, \`lg\` | \`md\` |
| \`disabled\` | \`true\`, \`false\` | \`false\` |
| \`disabledReason\` | текст пояснення під вимкненою кнопкою | немає |

Решта атрибутів \`<button>\` (\`onClick\`, \`type\`, \`aria-*\`) передаються далі.

## Варіанти

- **primary** (основна): заливка \`accent\`, текст \`ink\`. Контраст тексту ink на accent: 5,10:1 (вимога 4,5:1). Текст \`canvas\` на accent дає лише 3,01:1, тому його не брати.
- **secondary** (другорядна): без заливки, межа \`ink-muted\`, текст \`ink\`. Контраст межі з фоном canvas: 6,16:1 (вимога 3:1).
- **text** (текстова): без заливки й межі, підкреслений текст \`primary\`. Контраст на canvas: 11,24:1.

## Стани

- **default**: як у варіанті.
- **hover**: основна стає \`primary\` з текстом \`canvas\` (11,24:1); другорядна й текстова отримують заливку \`line\` (текст на ній не нижче 8,67:1).
- **focus** (клавіша Tab): контур \`ink\` завтовшки 2 px з відступом, контраст з фоном 15,34:1 (вимога 3:1).
- **disabled**: заливка \`line\` і текст \`ink-muted\` (4,75:1), курсор «заборонено», hover вимкнено. Кнопка зроблена через \`aria-disabled\`, тож лишається у фокусі, а клік нічого не робить. Пояснення під нею (\`disabledReason\`) прив'язане через \`aria-describedby\`: скрінрідер читає його разом із кнопкою.

## Токени

Кольори: \`accent\`, \`primary\`, \`ink\`, \`ink-muted\`, \`line\`, \`canvas\`. Радіус: \`rounded-control\`. Текст: \`text-caption\` (звичайна), \`text-body\` (велика), шрифт \`font-sans\`. Відступи: звичайна \`px-4 py-3\`, велика \`px-8 py-4\`, проміжок до пояснення \`gap-2\`.

## Коли використовувати

- Основна: одна головна дія в блоці (наприклад, «Написати мені»).
- Другорядна: додаткова дія поруч з основною.
- Текстова: легка дія в тексті або третьорядна.
- Для переходу на іншу сторінку краще посилання, а не кнопка.
- Вимикай кнопку лише з поясненням, чому дія недоступна.

## Як брати в код

\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button variant="primary" size="lg" onClick={send}>
  Написати мені
</Button>

<Button disabled disabledReason="Заповніть імʼя та пошту, щоб надіслати.">
  Надіслати
</Button>
\`\`\`
`;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "text"] },
    size: { control: "select", options: ["md", "lg"] },
    disabled: { control: "boolean" },
    disabledReason: { control: "text" },
  },
  args: {
    children: "Написати мені",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledReason: "Заповніть форму, щоб надіслати повідомлення.",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
