import clsx from "clsx"
import { useState, useRef, useEffect } from "react"
import { List, X } from "phosphor-react"
import autoAnimate from "@formkit/auto-animate"

import { Collapsible } from "./Collapsible"
import { useBook } from "../../contexts/BookContext"
import { useViewport } from "../../hooks/useViewport"

export function Sidebar() {
  const parent = useRef(null)

  const { books, chapter } = useBook()
  const { aboveThreshold } = useViewport()

  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current)
    }
  }, [parent])

  const vt_books = books.filter(book => book.testament === "VT")
  const nt_books = books.filter(book => book.testament === "NT")

  function toggle() {
    setOpen(!open)
  }

  const capAbbrev =
    chapter?.book.abbrev.pt.charAt(0).toUpperCase() +
    chapter?.book.abbrev.pt.slice(1)!

  return (
    <aside
      ref={parent}
      className={clsx("bg-gray-100 px-5 pt-5 shadow-mob sticky top-0", {
        "rounded-tr-xl rounded-br-xl": aboveThreshold,
        "h-20": !aboveThreshold && !menuOpen,
        "h-screen": aboveThreshold || menuOpen
      })}
    >
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-bold text-2xl text-gray-700">
          {chapter ? (
            <>
              {capAbbrev} {chapter?.chapter.number}
            </>
          ) : (
            "Bíblia Sagrada"
          )}
        </h1>

        {!aboveThreshold && (
          <button
            onClick={() => {
              setMenuOpen(!menuOpen)
            }}
          >
            {menuOpen ? <X size={32} /> : <List size={32} />}
          </button>
        )}
      </div>

      {(aboveThreshold || menuOpen) && (
        <>
          <Collapsible
            from="Antigo Testamento"
            books={vt_books}
            open={!open}
            toggle={toggle}
          />
          <Collapsible
            from="Novo Testamento"
            books={nt_books}
            open={open}
            toggle={toggle}
          />
        </>
      )}
    </aside>
  )
}
