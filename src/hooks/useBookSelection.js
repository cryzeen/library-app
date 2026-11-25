import { useContext } from 'react'
import { BookSelectionContext } from '../context/BookSelectionContext.js'

export default function useBookSelection() {
  const selection = useContext(BookSelectionContext)

  if (selection === null) {
    throw new Error('useBookSelection must be used within BookSelectionProvider')
  }

  return selection
}