import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { CaretDown, CaretUp } from 'phosphor-react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import * as ColPrimitive from '@radix-ui/react-collapsible'

import { useViewport } from '../../hooks/useViewport'
import { Book, useBook } from '../../contexts/BookContext'

interface CollapsibleProps {
  books: Book[]
  from: string
  open: boolean
  toggle: () => void
}

export function Collapsible({ books, from, open, toggle }: CollapsibleProps) {
  const parent = useRef(null)
  const { fetchChapter } = useBook()
  const { aboveThreshold } = useViewport()

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current)
    }
  }, [parent])

  return (
    <ColPrimitive.Root open={open} onOpenChange={toggle}>
      <ColPrimitive.Trigger
        className={clsx(
          'text-md flex items-center justify-between w-full rounded-xl p-3 font-bold transition-all duration-200',
          {
            'bg-gray-300 text-gray-700': open,
            'text-gray-500 hover:text-gray-700': !open
          }
        )}
      >
        {from}
        {open ? <CaretUp size={24} /> : <CaretDown size={24} />}
      </ColPrimitive.Trigger>
      <ColPrimitive.Content ref={parent}>
        <ScrollArea.Root className="w-full h-96 overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full">
            {books.map(book => (
              <Dropdown.Root key={book.name}>
                <Dropdown.Trigger className="block ml-5 text-md text-gray-500 hover:text-gray-700 transition-colors duration 200ms py-1">
                  {book.name}
                </Dropdown.Trigger>

                <Dropdown.Portal>
                  <Dropdown.Content
                    align="start"
                    className="grid grid-cols-6 gap-3 bg-gray-300 p-3 rounded-xl shadow-mob max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-300"
                  >
                    {[...Array(book.chapters).keys()].map(chapter => (
                      <Dropdown.Item
                        key={chapter}
                        className={clsx(
                          'text-gray-500 text-center hover:text-gray-700 transition-colors duration 200ms cursor-pointer',
                          {
                            'text-md': aboveThreshold,
                            'text-lg': !aboveThreshold
                          }
                        )}
                        onSelect={() => fetchChapter('nvi', book, chapter + 1)}
                      >
                        {chapter + 1}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Arrow className="fill-gray-300" />
                  </Dropdown.Content>
                </Dropdown.Portal>
              </Dropdown.Root>
            ))}
            <ScrollArea.Scrollbar orientation="vertical" className="w-1">
              <ScrollArea.Thumb className="w-1 rounded-lg bg-gray-300" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </ColPrimitive.Content>
    </ColPrimitive.Root>
  )
}
