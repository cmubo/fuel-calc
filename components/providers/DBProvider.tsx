import { DATABASE_NAME, db, expoDb } from "@/db/db";
import migrations from "@/db/migrations/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
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
    useDrizzleStudio(expoDb);

    if (error) {
        return (
            <View>
                <GroteskTextMedium>
                    Migration error: {error.message}
                </GroteskTextMedium>
            </View>
        );
    }

    if (!success) {
        return (
            <View>
                <GroteskTextMedium>
                    Migration is in progress...
                </GroteskTextMedium>
            </View>
        );
    }

    return (
        <Suspense fallback={<ActivityIndicator size="large" />}>
            <SQLiteProvider
                databaseName={DATABASE_NAME}
                options={{ enableChangeListener: true }}
                useSuspense
            >
                {children}
            </SQLiteProvider>
        </Suspense>
    );
}
