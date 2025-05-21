import {
    BottomSheetModal as GorhonBottomSheetModal,
    type BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { ForwardedRef } from "react";

export type Ref = GorhonBottomSheetModal;

export default function BottomSheetModal({
    ref,
    children,
    ...props
}: BottomSheetModalProps & {
    ref: ForwardedRef<Ref>;
}) {
    const snapPoints = ["50%", "75%"];

    return (
        <GorhonBottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            {...props}
        >
            {children}
        </GorhonBottomSheetModal>
    );
}
