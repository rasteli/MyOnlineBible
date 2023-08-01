import colors from 'tailwindcss/colors'
import { InfinitySpin } from 'react-loader-spinner'

import { useBook, Chapter as IChapter } from '../../contexts/BookContext'
import { useViewport } from '../../hooks/useViewport'

export function Chapter() {
  const { aboveThreshold } = useViewport()
  const { chapter, loading, fetchChapter } = useBook()

  if (!chapter) return null

  if (loading) {
    // TODO: Skeleton screen
    return (
      <div className="flex items-center justify-center">
        <InfinitySpin width="200" color={colors.gray['700']} />
      </div>
    )
  }

  async function handleFetchChapter(x: number, chapter: IChapter) {
    const threshold = aboveThreshold ? 900 : 210

    if (x < threshold && chapter.chapter.number > 1) {
      // This will fetch the previous chapter when the user clicks
      // on the left side of the screen.
      await fetchChapter('nvi', chapter.book, chapter.chapter.number - 1)
    } else if (
      x > threshold &&
      chapter.chapter.number < chapter.book.chapters
    ) {
      // This will fetch the next chapter when the user clicks
      // on the right side of the screen.
      await fetchChapter('nvi', chapter.book, chapter.chapter.number + 1)
    }
  }

  return (
    <div
      className="m-10 text-left text-lg"
      onClick={e => handleFetchChapter(e.pageX, chapter)}
    >
      {chapter.verses.map((verse, index) => (
        <p key={verse.text} className="inline">
          <span className="text-gray-600 font-bold text-md align-top">
            {' '}
            {verse.number}{' '}
          </span>
          <span className="text-gray-700">{verse.text}</span>
          {(index + 1) % 5 === 0 && <div className="mb-3" />}
        </p>
      ))}
    </div>
  )
}
