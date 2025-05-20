import { ActivityIndicator, Text, View } from "react-native";

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
                <Text>There was an error</Text>
            </View>
        );
    }

    return null;
}
