import { useState } from 'react'
import { BookSelectionContext } from '../context/BookSelectionContext.js'

export default function BookSelectionProvider({ items, children }) {
  const [selectedId, setSelectedId] = useState(null)

  const selectedItem = items.find((book) => book.id === selectedId)

  function selectBook(id) {
    if (items.some((book) => book.id === id)) {
      setSelectedId(id)
    }
  }

  function clearSelection() {
    setSelectedId(null)
  }

  const value = {
    selectedId,
    selectedItem,
    selectBook,
    clearSelection,
  }

  return (
    <BookSelectionContext.Provider value={value}>
      {children}
    </BookSelectionContext.Provider>
  )
}