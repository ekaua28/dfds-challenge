import React from "react"

/**
 * Custom hook to manage a forwarded ref.
 * 
 * This hook allows a component to use a forwarded ref, ensuring the ref is correctly assigned
 * to an internal ref and forwarded ref. The ref can be a function ref or an object ref.
 * 
 * @template T
 * @param {React.ForwardedRef<T>} ref - The forwarded ref from the parent component.
 * @returns {React.RefObject<T>} The internal ref object.
 */
export function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
    const innerRef = React.useRef<T>(null)

    React.useEffect(() => {
        if (!ref) return
        if (typeof ref === "function") {
            ref(innerRef.current)
        } else {
            ref.current = innerRef.current
        }
    })

    return innerRef
}