import BottomSheetModal from "@/components/BottomSheetModal";
import { GroteskText } from "@/components/StyledText";
import { twColors } from "@/constants/Colors";
import FuelPriceQuickSelect from "@/features/journeys/components/FuelPriceQuickSelect";
import {
    type BottomSheetModal as BottomSheetModalType,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";

export default function CalculatorWizardSelectFuelPriceModal({
    onFuelPriceSelect,
}: {
    onFuelPriceSelect: (price: number) => void;
}) {
    const bottomSheetModalRef = useRef<BottomSheetModalType>(null);

    const handlePresentModalPress = () =>
        bottomSheetModalRef.current?.present();

    return (
        <>
            <TouchableOpacity onPress={handlePresentModalPress}>
                <GroteskText style={{ color: twColors.sky[200], fontSize: 16 }}>
                    Select a saved fuel price?
                </GroteskText>
            </TouchableOpacity>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                backgroundStyle={{ backgroundColor: twColors.slate[800] }}
                enableDynamicSizing={false}
                snapPoints={["60%"]}
                handleIndicatorStyle={{ backgroundColor: "#fff" }}
            >
                <BottomSheetView>
                    <FuelPriceQuickSelect
                        onFuelPriceSelect={onFuelPriceSelect}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    );
}
