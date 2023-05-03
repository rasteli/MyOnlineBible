import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"
import { api } from "../lib/axios"

export interface Book {
  id: number
  abbrev: {
    [key: string]: string
  }
  author: string
  chapters: number
  group: string
  name: string
  testament: string
}

interface Chapter {
  book: Book
  chapter: {
    number: number
    verses: number
  }
  verses: {
    number: number
    text: string
  }[]
  totalChapters: number
}

interface BookContextData {
  loading: boolean
  books: Book[]
  chapter: Chapter | null
  fetchChapter: (
    version: string,
    book: string,
    chapter: number
  ) => Promise<void>
}

const BookContext = createContext({} as BookContextData)

export function useBook() {
  return useContext(BookContext)
}

interface BookProviderProps {
  children: ReactNode
}

export function BookProvider({ children }: BookProviderProps) {
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [chapter, setChapter] = useState<Chapter | null>(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await api.get<Book[]>("/books")

      setLoading(false)
      setBooks(response.data)
    })()
    ;(async () => {
      const chapter = localStorage.getItem("@biblia:chapter")

      if (chapter) {
        setChapter(JSON.parse(chapter))
      }
    })()
  }, [])

  async function fetchChapter(version: string, book: string, chapter: number) {
    setLoading(true)

    const response = await api.get<Chapter>(
      `/verses/${version}/${book}/${chapter}`
    )

    const totalChapters = books.find(b => b.abbrev.pt === book)?.chapters!

    const data = {
      ...response.data,
      totalChapters
    }

    setLoading(false)
    setChapter(data)

    localStorage.setItem("@biblia:chapter", JSON.stringify(data))
  }

  const value: BookContextData = {
    books,
    chapter,
    loading,
    fetchChapter
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}
