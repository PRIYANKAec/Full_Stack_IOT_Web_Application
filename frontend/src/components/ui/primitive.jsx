import * as React from "react"

import { clsx } from "clsx"
import { composeRenderProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

const cn = (...inputs) => twMerge(clsx(inputs))

function composeTailwindRenderProps(
  className,
  tw
) {
  return composeRenderProps(className, (className) => twMerge(tw, className))
}

const focusRing = tv({
  base: "outline-none focus:outline-none forced-colors:outline-1 forced-colors:outline-[Highlight]",
  variants: {
    isFocused: { true: "ring-4 ring-ring/20" },
    isInvalid: { true: "ring-4 ring-danger/20" }
  }
})

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: "border-ring/85" },
    isInvalid: { true: "border-danger" }
  }
})

const focusButtonStyles = tv({
  base: "outline outline-ring forced-colors:outline-[Highlight] outline-offset-2",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2"
    }
  }
})

const useMediaQuery = (query) => {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    const onChange = (event) => {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}

export {
  cn,
  composeTailwindRenderProps,
  composeTailwindRenderProps as ctr,
  composeRenderProps as cr,
  focusRing,
  focusStyles,
  focusButtonStyles,
  useMediaQuery
}
