import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import cover from "@/assets/work-cover-example.png";
import { WorkCard } from "./WorkCard";

const description = `
Картка роботи: обкладинка, назва й короткий опис. Уся картка є посиланням на сторінку кейсу.

## Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`cover\` | картинка, імпортована з \`src/assets\` | обовʼязковий |
| \`title\` | назва роботи | обовʼязковий |
| \`description\` | одне речення про роботу | обовʼязковий |
| \`href\` | адреса сторінки кейсу | обовʼязковий |

Картка займає всю ширину свого контейнера: ширину задає сітка сторінки.

## Варіанти

Варіант один. Обкладинка будь-яких розмірів обрізається по центру під пропорцію \`aspect-cover\`.

## Стани

- **default**: фон \`surface\`, рамка \`line\`.
- **hover**: рамка стає \`accent\`, назва підкреслюється.
- **focus** (клавіша Tab): контур \`ink\` завтовшки 2 px з відступом, контраст з фоном \`canvas\` 15,34:1 (вимога 3:1).

Обкладинка декоративна (порожній \`alt\`). Скрінрідер називає посилання за назвою роботи, а опис читає як пояснення.

## Токени

Кольори: \`surface\`, \`line\`, \`accent\`, \`primary\`, \`ink\`, \`ink-muted\`. Радіус: \`rounded-card\`. Пропорція: \`aspect-cover\`. Текст: \`text-lead\` (назва), \`text-caption\` (опис), шрифт \`font-sans\`. Відступи: \`p-4\`, \`gap-2\`.

## Коли використовувати

- У списку або сітці робіт, коли кожна веде на свою сторінку кейсу.
- Не для блоків без переходу: картка виглядає й поводиться як посилання.
- Усередину не кладуть інші кнопки чи посилання.

## Як брати в код

\`\`\`tsx
import cover from "@/assets/work-cover-example.png";
import { WorkCard } from "@/components/WorkCard/WorkCard";

<WorkCard
  cover={cover}
  title="Miorra"
  description="Навчальний веб-сервіс: UX/UI-дизайн."
  href="/work/miorra"
/>
\`\`\`
`;

const meta = {
  title: "Components/WorkCard",
  component: WorkCard,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-2">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cover: { control: false },
    title: { control: "text" },
    description: { control: "text" },
    href: { control: "text" },
  },
  args: {
    cover,
    title: "Miorra",
    description: "Навчальний веб-сервіс: UX/UI-дизайн.",
    href: "#",
  },
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
