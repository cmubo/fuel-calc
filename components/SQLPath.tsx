// This file is only used for debugging purposes.

import { twColors } from "@/constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";

export const SQLPath = () => {
    const db = useSQLiteContext();

    return (
        <View>
            <Text
                style={{
                    backgroundColor: twColors.slate[950],
                    color: "white",
                    padding: 4,
                }}
                selectable={true}
            >
                {db.databasePath}
            </Text>
        </View>
    );
};
