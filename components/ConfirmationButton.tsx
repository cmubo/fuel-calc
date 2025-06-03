import { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Modal, ModalContent, ModalTrigger } from "./Modal";
import {
    GroteskTextBold,
    GroteskTextMedium,
    GroteskTextSemiBold,
} from "./StyledText";

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
                        <GroteskTextBold className="text-2xl text-white">
                            {title || "Are you sure?"}
                        </GroteskTextBold>
                        <GroteskTextSemiBold className="font-medium text-lg text-white">
                            {subtitle || "This action cannot be undone"}
                        </GroteskTextSemiBold>
                    </View>
                    <View className="flex items-center justify-center gap-4 flex-row">
                        <TouchableOpacity
                            onPress={performAction}
                            className="bg-cyan-500 rounded-lg p-3 flex-1"
                        >
                            <GroteskTextMedium className="text-center">
                                Yes
                            </GroteskTextMedium>
                        </TouchableOpacity>
                        <ModalTrigger asChild>
                            <TouchableOpacity className="bg-red-500 rounded-lg p-3 flex-1">
                                <GroteskTextMedium className="text-center">
                                    No
                                </GroteskTextMedium>
                            </TouchableOpacity>
                        </ModalTrigger>
                    </View>
                </View>
            </ModalContent>
        </Modal>
    );
}
