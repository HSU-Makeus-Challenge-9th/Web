import { useTheme } from "../../hooks/useTheme";
import { THEME } from "../../context/ThemeProvider";
import clsx from "clsx";
import ThemeToggleButton from "../Button/ThemeToggleButton";

function NavBar(): React.ReactElement {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}

export default NavBar;
