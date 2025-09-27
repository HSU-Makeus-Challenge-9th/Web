import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx("p-4 h-dvh", isLightMode ? "bg-white" : "bg-gray-800")}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        ThemeContent
      </h1>
      <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis deserunt possimus quaerat iure magnam consequatur repellat culpa rerum eius itaque. Adipisci hic debitis provident sapiente ratione unde fugit, perspiciatis esse.</p>
    </div>
  );
}
