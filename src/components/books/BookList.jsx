import BookCard from './BookCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function BookList({ items }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState title="Книжковий фонд порожній.">
        <p>Наразі немає зареєстрованих видань у каталозі.</p>
      </EmptyState>
    );
  }

  return (
    <ul className="book-grid">
      {items.map((book) => (
        <li key={book.id}>
          <BookCard item={book} />
        </li>
      ))}
    </ul>
  );
}