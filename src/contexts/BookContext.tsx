import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"
import { api } from "../lib/axios"

export interface Book {
  abbrev: {
    [key: string]: string
  }
  author: string
  chapters: number
  group: string
  name: string
  testament: string
}

export interface Chapter {
  book: Book
  chapter: {
    number: number
    verses: number
  }
  verses: {
    number: number
    text: string
  }[]
}

interface BookContextData {
  loading: boolean
  books: Book[]
  chapter: Chapter | null
  fetchChapter: (version: string, book: Book, chapter: number) => Promise<void>
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

      // TODO: Caching with React Query
      const response = await api.get<Book[]>("/books")
      const chapter = localStorage.getItem("@biblia:chapter")

      if (chapter) {
        setChapter(JSON.parse(chapter))
      }

      setBooks(response.data)
      setLoading(false)
    })()
  }, [])

  async function fetchChapter(version: string, book: Book, chapter: number) {
    setLoading(true)

    // TODO: Caching with React Query
    const response = await api.get<Chapter>(
      `/verses/${version}/${book.abbrev.pt}/${chapter}`
    )

    // This is necessary because the book property of the chapter object
    // returned by the endpoint above doesn't contain the number of chapters.
    const chapters = books.find(b => b.abbrev.pt === book.abbrev.pt)!.chapters

    const data = {
      ...response.data,
      book: {
        ...response.data.book,
        chapters
      }
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
