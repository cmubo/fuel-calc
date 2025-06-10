import { twColors } from "@/constants/Colors";
import { DATABASE_NAME, db } from "@/db/db";
import migrations from "@/db/migrations/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";
import { GroteskTextMedium } from "../StyledText";

export default function DBProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { success, error } = useMigrations(db, migrations);

    if (error) {
        return (
            <View style={{ backgroundColor: twColors.slate["900"], flex: 1 }}>
                <GroteskTextMedium>
                    Migration error: {error.message}
                </GroteskTextMedium>
            </View>
        );
    }

    if (!success) {
        return (
            <View style={{ backgroundColor: twColors.slate["900"], flex: 1 }}>
                <GroteskTextMedium>
                    Migration is in progress...
                </GroteskTextMedium>
            </View>
        );
    }

    return (
        <Suspense fallback={<ActivityIndicator size="large" />}>
            <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
                {children}
            </SQLiteProvider>
        </Suspense>
    );
}
