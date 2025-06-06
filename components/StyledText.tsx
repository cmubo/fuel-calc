import { Text, TextProps } from "./Themed";

export function GroteskText(props: TextProps) {
    return (
        <Text
            {...props}
            style={[props.style, { fontFamily: "SpaceGrotesk" }]}
        />
    );
}

export function GroteskTextBold(props: TextProps) {
    return (
        <Text
            {...props}
            style={[props.style, { fontFamily: "SpaceGrotesk-Bold" }]}
        />
    );
}

export function GroteskTextLight(props: TextProps) {
    return (
        <Text
            {...props}
            style={[props.style, { fontFamily: "SpaceGrotesk-Light" }]}
        />
    );
}

export function GroteskTextMedium(props: TextProps) {
    return (
        <Text
            {...props}
            style={[props.style, { fontFamily: "SpaceGrotesk-Medium" }]}
        />
    );
}

export function GroteskTextSemiBold(props: TextProps) {
    return (
        <Text
            {...props}
            style={[props.style, { fontFamily: "SpaceGrotesk-SemiBold" }]}
        />
    );
}
