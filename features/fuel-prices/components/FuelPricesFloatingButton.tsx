import { twColors } from "@/constants/Colors";
import { GLOBAL_BOTTOM_PADDING } from "@/constants/layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function fuelPricesFloatingButton() {
    const insets = useSafeAreaInsets();

    return (
        <Link href="/(modals)/newFuelPrice" asChild>
            <TouchableOpacity
                className="bg-sky-600 rounded-full shadow p-3 absolute right-6 w-12 h-12 flex items-center justify-center"
                style={{
                    bottom: insets.bottom + GLOBAL_BOTTOM_PADDING,
                }}
            >
                <FontAwesome
                    color={twColors.slate["200"]}
                    size={20}
                    name="plus"
                />
            </TouchableOpacity>
        </Link>
    );
}
