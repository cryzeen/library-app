import { useState } from 'react'

export default function useBookFilters(items) {
  const [query, setQuery] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)

  const normalizedQuery = query.trim().toLocaleLowerCase('uk')

  const visibleItems = items.filter((item) => {
    const matchesTitle = item.title.toLocaleLowerCase('uk').includes(normalizedQuery)
    const matchesAuthor = item.author.toLocaleLowerCase('uk').includes(normalizedQuery)
    const matchesQuery = matchesTitle || matchesAuthor
    const matchesAvailability = !availableOnly || item.isAvailable

    return matchesQuery && matchesAvailability
  })

  function resetFilters() {
    setQuery('')
    setAvailableOnly(false)
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