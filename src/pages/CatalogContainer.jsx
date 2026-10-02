import HomePage from './HomePage.jsx'
import useBookSelection from '../hooks/useBookSelection.js'

export default function CatalogContainer({ items }) {
  const { selectedId, selectBook } = useBookSelection()

  return (
    <HomePage
      items={items}
      selectedId={selectedId}
      onSelect={selectBook}
    />
  )
}