import DBProvider from "@/components/providers/DBProvider";
import { useColorScheme } from "@/components/useColorScheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
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
