import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const description = `
Поле форми запиту з підписом над ним. Пʼять варіантів відповідають полям із плану сайту, і кожен має свій тип і підказку. Поля з лімітом символів стану помилки не мають.

## Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`variant\` | \`name\`, \`email\`, \`interest\`, \`project\`, \`company\` | \`name\` |
| \`label\` | текст підпису | з варіанта |
| \`placeholder\` | підказка в порожньому полі | з варіанта |
| \`defaultValue\` | початкове значення поля | порожнє |
| \`error\` | \`true\`, \`false\` (не діє для \`project\` і \`company\`) | \`false\` |
| \`errorText\` | текст помилки під полем | з варіанта |
| \`disabled\` | \`true\`, \`false\` | \`false\` |
| \`maxLength\` | найбільша кількість символів | 1000 для \`project\`, 250 для \`company\`, інакше без обмеження |
| \`options\` | пункти списку для \`interest\` | вісім пунктів нижче |

Решта атрибутів поля (\`name\`, \`value\`, \`onChange\`, \`required\`, \`autoComplete\`, \`ref\`, \`aria-*\`) передаються далі.

## Варіанти

| Варіант | Елемент | Підпис | Підказка | Текст помилки |
| --- | --- | --- | --- | --- |
| \`name\` | рядок | Ваше імʼя | Наприклад, Олена | Вкажіть ваше імʼя. |
| \`email\` | рядок, тип \`email\` | Електронна пошта | name@example.com | Введіть пошту у форматі name@example.com. |
| \`interest\` | список | Що вас цікавить? | Оберіть напрям | Оберіть, що вас цікавить. |
| \`project\` | кілька рядків, необовʼязковий, до 1000 символів | Коротко про ваш проєкт (необовʼязково) | Розкажіть про ваш бізнес і завдання, яке хочете вирішити | немає |
| \`company\` | рядок, необовʼязковий, до 250 символів | Назва компанії або сайт (необовʼязково) | Назва або адреса сайту | немає |

Пункти списку \`interest\`: Лендінг, Багатосторінковий сайт, Редизайн сайту, Створення зображень, Створення відео, Комплексне рішення, Інше завдання, Потрібна консультація.

Усі варіанти, крім \`project\` і \`company\`, мають атрибут \`required\`.

Під полями \`project\` і \`company\` є лічильник (наприклад, «0 з 250 символів», \`ink-muted\`), прив’язаний через \`aria-describedby\`. Понад обмеження браузер не дає ввести чи вставити текст, а довше значення з коду обрізається. Тому стану помилки в цих полях немає. Сервер, який прийматиме форму, має перевіряти довжину окремо.

## Стани

- **default**: фон \`surface\`, межа \`ink-muted\` (контраст з фоном canvas 6,16:1; вимога 3:1), підказка \`ink-muted\` (6,39:1 на surface).
- **hover**: межа й підказка темнішають до \`ink\`.
- **focus** (клавіша Tab або клік): контур \`ink\` завтовшки 2 px з відступом, контраст з фоном 15,34:1 (вимога 3:1).
- **заповнене**: значення текстом \`ink\`. У Controls перемикається полем \`defaultValue\` (для списку впишіть пункт точно, наприклад «Редизайн сайту»).
- **помилка** (лише \`name\`, \`email\`, \`interest\`): межа \`danger\`, під полем іконка й текст кольором \`danger\` (7,10:1 на canvas). Поле отримує \`aria-invalid\`, а текст прив'язаний через \`aria-describedby\`.
- **disabled**: без заливки, межа, підпис і текст \`ink-muted\`, курсор «заборонено», hover вимкнено. Це атрибут \`disabled\`: поле не отримує фокус, а його значення не надсилається з формою. Помилка в цьому стані не показується.

## Токени

Кольори: \`surface\`, \`ink\`, \`ink-muted\`, \`danger\`. Радіус: \`rounded-control\`. Текст: \`text-caption\`, трекінг підпису \`tracking-label\`, шрифт \`font-sans\`. Відступи: у полі \`px-4 py-3\`, між підписом, полем і помилкою \`gap-2\`, між іконкою й текстом \`gap-2\`.

## Коли використовувати

- Для форми запиту на сайті: беріть готовий варіант.
- Для іншого поля візьміть найближчий варіант і задайте \`label\`, \`placeholder\`, \`errorText\`.
- Підказка не замінює підпис: вона зникає під час введення.
- Перевірку введеного робить форма: компонент лише показує помилку за \`error\`.

## Як брати в код

\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField variant="name" name="name" />
<FormField variant="email" name="email" error={!isEmailValid} />
<FormField variant="interest" name="interest" />
<FormField variant="project" name="project" />
<FormField variant="company" name="company" />
\`\`\`
`;

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: description } } },
  argTypes: {
    variant: {
      control: "select",
      options: ["name", "email", "interest", "project", "company"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    error: { control: "boolean" },
    errorText: { control: "text" },
    disabled: { control: "boolean" },
    options: { table: { disable: true } },
    type: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    variant: "name",
    label: "",
    placeholder: "",
    defaultValue: "",
    error: false,
    errorText: "",
    disabled: false,
  },
  // key: поле перемальовується, коли варіант чи значення міняють у Controls
  render: (args) => (
    <FormField key={`${args.variant}-${args.defaultValue}`} {...args} />
  ),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
