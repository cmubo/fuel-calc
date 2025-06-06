import heroIconPaths, { HeroIconPathType } from "@/constants/HeroIcons";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function HeroIcon({
    size,
    color,
    icon,
    ...props
}: {
    size?: number;
    color?: string;
    icon: HeroIconPathType;
} & SvgProps) {
    return (
        <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={color || "currentColor"}
            width={size || 20}
            height={size || 20}
            {...props}
        >
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={heroIconPaths[icon]}
            />
        </Svg>
    );
}
