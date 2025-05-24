import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import { twColors } from "@/constants/Colors";
import { GLOBAL_BOTTOM_PADDING } from "@/constants/layout";
import FuelPricesForm from "@/features/fuel-prices/components/FuelPricesForm";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function fuelPricesFormModal() {
    const [modalVisible, setModalVisible] = useState(false);
    const insets = useSafeAreaInsets();

    return (
        <Modal open={modalVisible} setOpen={setModalVisible}>
            <ModalTrigger asChild>
                <TouchableOpacity
                    className="bg-cyan-500 rounded-full shadow p-3 absolute right-6 w-12 h-12 flex items-center justify-center"
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
            </ModalTrigger>

            <ModalContent>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: 24,
                    }}
                >
                    <FuelPricesForm
                        onSuccessfulSubmitCallback={() =>
                            setModalVisible(!modalVisible)
                        }
                    />
                </ScrollView>
            </ModalContent>
        </Modal>
    );
}
