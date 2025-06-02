import { useState } from "react";
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import { Modal, ModalContent, ModalTrigger } from "./Modal";

interface ConfirmationButtonProps
    extends Omit<TouchableOpacityProps, "onPress"> {
    action: () => void;
    title?: string;
    subtitle?: string;
}

export default function ConfirmationButton({
    action,
    title,
    subtitle,
    ...props
}: ConfirmationButtonProps) {
    const [open, setOpen] = useState(false);

    function performAction() {
        action();
        setOpen(false);
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <ModalTrigger asChild>
                <TouchableOpacity {...props} />
            </ModalTrigger>

            <ModalContent>
                <View className="gap-8 p-4">
                    <View>
                        <Text className="text-2xl font-bold text-white">
                            {title || "Are you sure?"}
                        </Text>
                        <Text className="font-medium text-lg text-white">
                            {subtitle || "This action cannot be undone"}
                        </Text>
                    </View>
                    <View className="flex items-center justify-center gap-4 flex-row">
                        <TouchableOpacity
                            onPress={performAction}
                            className="bg-cyan-500 rounded-lg p-3 flex-1"
                        >
                            <Text className="text-center">Yes</Text>
                        </TouchableOpacity>
                        <ModalTrigger asChild>
                            <TouchableOpacity className="bg-red-500 rounded-lg p-3 flex-1">
                                <Text className="text-center">No</Text>
                            </TouchableOpacity>
                        </ModalTrigger>
                    </View>
                </View>
            </ModalContent>
        </Modal>
    );
}
