import BookCard from './BookCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function BookList({
  items,
  selectedId,
  onSelect,
  emptyTitle = 'Книжковий фонд порожній.',
}) {
  if (!items || items.length === 0) {
    return (
      <EmptyState title={emptyTitle}>
        <p>Не знайдено видань, що відповідають критеріям пошуку.</p>
      </EmptyState>
    )
  }

  return (
    <ul className="book-grid">
      {items.map((book) => (
        <li key={book.id}>
          <BookCard
            item={book}
            selected={book.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  )
}