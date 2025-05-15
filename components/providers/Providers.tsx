import DBProvider from "@/components/providers/DBProvider";
import { useColorScheme } from "@/components/useColorScheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";

export default function Providers({ children }: { children: React.ReactNode }) {
    const colorScheme = useColorScheme();

    return (
        <DBProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                {children}
            </ThemeProvider>
        </DBProvider>
    );
}
