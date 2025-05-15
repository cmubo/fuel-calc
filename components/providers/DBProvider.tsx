import { DATABASE_NAME, db, expoDb } from "@/db/db";
import migrations from "@/db/migrations/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";

import { ActivityIndicator, Text, View } from "react-native";

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
                <Text>Migration error: {error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View>
                <Text>Migration is in progress...</Text>
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
