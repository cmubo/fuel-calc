import BottomSheetModal from "@/components/BottomSheetModal";
import { twColors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    type BottomSheetModal as BottomSheetModalType,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import FuelPriceQuickSelect from "./FuelPriceQuickSelect";

export default function SelectFuelPriceModal({
    onFuelPriceSelect,
}: {
    onFuelPriceSelect: (price: number) => void;
}) {
    const bottomSheetModalRef = useRef<BottomSheetModalType>(null);

    const handlePresentModalPress = () =>
        bottomSheetModalRef.current?.present();

    return (
        <>
            <TouchableOpacity
                className="h-full w-16 border-2 rounded-lg bg-slate-800 flex-none items-center justify-center border-slate-700 "
                onPress={handlePresentModalPress}
            >
                <FontAwesome
                    name="plus"
                    size={20}
                    color={twColors.slate[100]}
                />
            </TouchableOpacity>

            <BottomSheetModal ref={bottomSheetModalRef}>
                <BottomSheetView>
                    <FuelPriceQuickSelect
                        onFuelPriceSelect={onFuelPriceSelect}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    );
}
