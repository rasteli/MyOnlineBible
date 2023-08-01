import clsx from "clsx"

import { Chapter } from "./components/Chapter"
import { Sidebar } from "./components/Sidebar"

import { useViewport } from "./hooks/useViewport"

export function App() {
  const { aboveThreshold } = useViewport()

  return (
    <div
      className={clsx({
        "grid grid-cols-269-1fr": aboveThreshold,
        "flex flex-col": !aboveThreshold
      })}
    >
      <Sidebar />
      <Chapter />
    </div>
  )
}
