import DBProvider from "@/components/providers/DBProvider";
import { useColorScheme } from "@/components/useColorScheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
                <BottomSheetModalProvider>
                    <ThemeProvider
                        value={
                            colorScheme === "dark" ? DarkTheme : DefaultTheme
                        }
                    >
                        {children}
                    </ThemeProvider>
                </BottomSheetModalProvider>
            </QueryClientProvider>
        </DBProvider>
    );
}
