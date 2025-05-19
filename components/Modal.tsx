import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { createContext, useContext, useState } from "react";
import {
    Pressable,
    PressableProps,
    Modal as RNModal,
    ScrollView,
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
                open: open ? open : modalVisible,
                setOpen: setOpen ? setOpen : setModalVisible,
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
    const { open, setOpen } = useContext(modalContext);

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
            <View className="flex-1 items-center justify-center mx-6">
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        padding: 24,
                    }}
                    style={styles.modalView}
                    className="m-5 bg-slate-950 border-slate-800 border rounded-2xl w-full flex-none flex-col gap-4"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="w-full flex-auto items-end">
                        <TouchableOpacity onPress={() => setOpen(!open)}>
                            <FontAwesome name="close" color="#fff" size={24} />
                        </TouchableOpacity>
                    </View>

                    {children}
                </ScrollView>
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
