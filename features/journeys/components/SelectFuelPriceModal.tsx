import { Modal, ModalContent, ModalTrigger } from "@/components/Modal";
import { twColors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import FuelPriceQuickSelect from "./FuelPriceQuickSelect";

export default function SelectFuelPriceModal({
    onFuelPriceSelect,
}: {
    onFuelPriceSelect: (price: number) => void;
}) {
    return (
        <Modal>
            <ModalTrigger asChild>
                <TouchableOpacity className="h-full w-16 border-2 rounded-lg bg-slate-800 flex-none items-center justify-center border-slate-700 ">
                    <FontAwesome
                        name="plus"
                        size={20}
                        color={twColors.slate[100]}
                    />
                </TouchableOpacity>
            </ModalTrigger>

            <ModalContent>
                <FuelPriceQuickSelect onFuelPriceSelect={onFuelPriceSelect} />
            </ModalContent>
        </Modal>
    );
}
