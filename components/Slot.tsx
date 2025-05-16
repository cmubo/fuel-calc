import { Children, cloneElement, isValidElement } from "react";

// TODO: types needs to be any type that can be passed to any react native element, similair to React.HTMLAttributes<HTMLElement> but for react native.
export function Slot({ children, ...props }: any) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
        console.error(
            "Slot component expects a single valid React element as a child",
        );
        return null;
    }

    return cloneElement(child, {
        ...props,
    });
}

export default Slot;
