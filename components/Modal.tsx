import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { createContext, useContext, useState } from "react";
import {
    Pressable,
    PressableProps,
    Modal as RNModal,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Slot from "./Slot";

interface ModalContextType {
    open: boolean;
    setOpen: (value: boolean | ((value: boolean) => boolean)) => void;
}
export const modalContext = createContext<ModalContextType>(
    {} as ModalContextType,
);

export function Modal({
    children,
    open,
    setOpen,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: (value: boolean | ((value: boolean) => boolean)) => void;
}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <modalContext.Provider
            value={{
                open: open === undefined ? modalVisible : open,
                setOpen: setOpen === undefined ? setModalVisible : setOpen,
            }}
        >
            {children}
        </modalContext.Provider>
    );
}

// TODO: this needs to extends from a pressable component but needs to cover buttons, touchableOpacity, Pressable etc
interface ModalTriggerProps extends PressableProps {
    children: React.ReactNode;
    asChild?: boolean;
}
export function ModalTrigger({ asChild, ...props }: ModalTriggerProps) {
    const { setOpen } = useContext(modalContext);

    const handlePress = () => setOpen((prev) => !prev);

    return asChild ? (
        <Slot onPress={handlePress} {...props} />
    ) : (
        <Pressable onPress={handlePress} {...props} />
    );
}

export function ModalContent({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useContext(modalContext);

    return (
        <RNModal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {
                setOpen(!open);
            }}
        >
            <View className="flex-1 items-center justify-center m-6 my-12">
                <View
                    style={styles.modalView}
                    className=" bg-slate-950 border-slate-800 border rounded-2xl w-full flex-none flex-col"
                >
                    <View className="w-full flex-auto items-end p-4">
                        <TouchableOpacity onPress={() => setOpen(!open)}>
                            <FontAwesome name="close" color="#fff" size={24} />
                        </TouchableOpacity>
                    </View>

                    {children}
                </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});
