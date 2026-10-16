import { useSearchParams } from 'react-router'

export default function useBookFilters(items) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const availableOnly = searchParams.get('available') === '1'

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleItems = items.filter((item) => {
    const matchesTitle = item.title.toLocaleLowerCase('uk').includes(normalizedQuery)
    const matchesAuthor = item.author ? item.author.toLocaleLowerCase('uk').includes(normalizedQuery) : false
    const matchesQuery = matchesTitle || matchesAuthor
    const matchesAvailability = !availableOnly || (item.available ?? item.isAvailable)
    return matchesQuery && matchesAvailability
  })

  function setQuery(value) {
    const next = new URLSearchParams(searchParams)
    if (value === '') next.delete('q')
    else next.set('q', value)
    setSearchParams(next, { replace: true })
  }

  function setAvailableOnly(value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('available', '1')
    else next.delete('available')
    setSearchParams(next)
  }

  function resetFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    next.delete('available')
    setSearchParams(next)
  }

  return {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  }
}