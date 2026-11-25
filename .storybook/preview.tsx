import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Сторінки docs (MDX) не проходять через декоратор історій, тому
// змінні шрифтів вішаємо на <html>, як це робить layout сайту
// (токен --font-sans обчислюється на :root).
if (typeof document !== "undefined") {
  document.documentElement.classList.add(...fontVariables.split(" "));
  document.body.classList.add("font-sans");
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
