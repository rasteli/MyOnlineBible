import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { BookProvider } from "./contexts/BookContext"

import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </React.StrictMode>
)
