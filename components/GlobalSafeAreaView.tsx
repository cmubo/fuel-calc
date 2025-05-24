import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "./Themed";

export default function GlobalSafeAreaView({ ...props }: ViewProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                paddingBottom: insets.bottom + 80,
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
            {...props}
        ></View>
    );
}
