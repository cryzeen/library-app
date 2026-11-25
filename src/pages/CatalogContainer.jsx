import BookListPage from './BookListPage.jsx'
import useBookSelection from '../hooks/useBookSelection.js'

export default function CatalogContainer({ items }) {
  const { selectedId, selectBook } = useBookSelection()

  return (
    <BookListPage
      items={items}
      selectedId={selectedId}
      onSelect={selectBook}
    />
  )
}