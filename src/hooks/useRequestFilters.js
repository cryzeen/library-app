import { useSearchParams } from 'react-router'

export default function useRequestFilters(requests, items) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const rawRoom = searchParams.get('readingRoom')
  const readingRoom = ['yes', 'no'].includes(rawRoom) ? rawRoom : 'all'
  const rawSort = searchParams.get('sort')
  const sort = ['days-asc', 'days-desc'].includes(rawSort) ? rawSort : 'book'

  const bookTitles = new Map(items.map((item) => [String(item.id), item.title]))
  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleRequests = requests.filter((request) => {
    const title = bookTitles.get(String(request.bookId)) ?? ''
    const text = `${title} ${request.purpose} ${request.ticketNumber}`.toLocaleLowerCase('uk')
    const matchesQuery = text.includes(normalizedQuery)
    const matchesRoom =
      readingRoom === 'all' ||
      (readingRoom === 'yes' ? request.readingRoomOnly : !request.readingRoomOnly)

    return matchesQuery && matchesRoom
  })

  visibleRequests.sort((a, b) => {
    let order = 0
    if (sort === 'days-asc') {
      order = a.durationDays - b.durationDays
    } else if (sort === 'days-desc') {
      order = b.durationDays - a.durationDays
    } else {
      const titleA = bookTitles.get(String(a.bookId)) ?? ''
      const titleB = bookTitles.get(String(b.bookId)) ?? ''
      order = titleA.localeCompare(titleB, 'uk')
    }
    return order || String(a.id).localeCompare(String(b.id))
  })

  function setParameter(name, value, defaultValue, replace = false) {
    const next = new URLSearchParams(searchParams)
    if (value === defaultValue) {
      next.delete(name)
    } else {
      next.set(name, value)
    }
    setSearchParams(next, { replace })
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('readingRoom')
    next.delete('sort')
    setSearchParams(next)
  }

  return {
    query,
    readingRoom,
    sort,
    visibleRequests,
    setQuery: (value) => setParameter('q', value, '', true),
    setReadingRoom: (value) => setParameter('readingRoom', value, 'all'),
    setSort: (value) => setParameter('sort', value, 'book'),
    resetFilters,
  }
}