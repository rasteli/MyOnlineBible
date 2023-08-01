import { useLayoutEffect, useState } from "react"

export function useViewport(threshold: number = 500) {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)

  useLayoutEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth)
    }

    if (typeof window !== "undefined") {
      handleResize()

      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
    }
  })

  return { innerWidth, aboveThreshold: innerWidth > threshold }
}
