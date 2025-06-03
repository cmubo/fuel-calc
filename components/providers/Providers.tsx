import DBProvider from "@/components/providers/DBProvider";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Appearance, useColorScheme } from "react-native";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    Appearance.setColorScheme("dark");
    const colorScheme = useColorScheme();

    return (
        <DBProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </DBProvider>
    );
}
