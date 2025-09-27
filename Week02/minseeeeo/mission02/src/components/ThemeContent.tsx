import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return <div className={clsx('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}>
        <h1
            className={clsx(
                'text-wxl font-bold',
                isLightMode ? 'text-black' : 'text-white'
            )}>
                Theme Content
            </h1>

            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                class Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non dolorum corrupti debitis fugiat accusamus, quia impedit beatae ullam iste hic asperiores. Dolores pariatur ratione libero nulla. Voluptate beatae quod pariatur.
            </p>
    </div>
}