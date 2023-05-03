import colors from "tailwindcss/colors"
import { InfinitySpin } from "react-loader-spinner"
import { useBook } from "../../contexts/BookContext"
import { useViewport } from "../../hooks/useViewport"

export function Chapter() {
  const { aboveThreshold } = useViewport()
  const { chapter, loading, fetchChapter } = useBook()

  if (!chapter) return null

  const paragraphs: { number: number; text: string }[] = []

  for (let i = 0; i < chapter.verses.length; i += 5) {
    paragraphs.push({
      number: chapter.verses[i].number,
      text: chapter.verses
        .slice(i, i + 5)
        .map(verse => verse.text)
        .join(" ")
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <InfinitySpin width="200" color={colors.gray["700"]} />
      </div>
    )
  }

  async function handleClick(x: number) {
    const threshold = aboveThreshold ? 900 : 210

    if (x < threshold && chapter!.chapter.number > 1) {
      await fetchChapter(
        "nvi",
        chapter!.book.abbrev.pt,
        chapter!.chapter.number - 1
      )
    } else if (
      x > threshold &&
      chapter!.chapter.number < chapter!.totalChapters
    ) {
      await fetchChapter(
        "nvi",
        chapter!.book.abbrev.pt,
        chapter!.chapter.number + 1
      )
    }
  }

  return (
    <div
      className="m-10 text-justify text-lg"
      onClick={async e => await handleClick(e.pageX)}
    >
      {paragraphs.map(verse => (
        <p key={verse.number} className="mb-3">
          &nbsp;&nbsp;&nbsp;&nbsp;
          {verse.text}
        </p>
      ))}
    </div>
  )
}
