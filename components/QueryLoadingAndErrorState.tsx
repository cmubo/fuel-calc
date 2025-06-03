import { ActivityIndicator, View } from "react-native";
import { GroteskTextMedium } from "./StyledText";

export default function QueryLoadingAndErrorState({
    isPending,
    isError,
}: {
    isPending: boolean;
    isError: boolean;
}) {
    if (isPending) {
        return (
            <View className="flex items-center justify-center w-full h-full flex-col">
                <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#0000ff"
                    className="my-3"
                />
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex items-center justify-center w-full h-full flex-col">
                <GroteskTextMedium>There was an error</GroteskTextMedium>
            </View>
        );
    }

    return null;
}
