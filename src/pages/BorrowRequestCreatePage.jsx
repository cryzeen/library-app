import { Link, useNavigate, useSearchParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import useBookSelection from '../hooks/useBookSelection.js'
import BorrowRequestPage from './BorrowRequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function BorrowRequestCreatePage({ items }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { selectedId, clearSelection } = useBookSelection()

  const bookId = searchParams.get('bookId')

  if (bookId === null) {
    const lastSelectionSearch = selectedId
      ? `?${new URLSearchParams({ bookId: selectedId })}`
      : null

    return (
      <>
        <PageHeading title="Нова читацька заявка" />
        <EmptyState title="Спочатку виберіть книгу з каталогу.">
          <p><Link to="/books">Відкрити каталог</Link></p>
          {lastSelectionSearch && (
            <p>
              <Link to={lastSelectionSearch}>Використати останній вибір</Link>
            </p>
          )}
        </EmptyState>
      </>
    )
  }

  const book = items.find((entry) => String(entry.id) === String(bookId))

  if (!book) {
    return (
      <NotFoundPage
        title="Неможливо оформити заявку"
        message="Книга з параметра bookId відсутня в каталозі."
      />
    )
  }

  function handleCancel() {
    clearSelection()
    navigate('/books', { replace: true })
  }

  return (
    <BorrowRequestPage
      key={`new-${book.id}`}
      title="Нова читацька заявка"
      item={book}
      onCancel={handleCancel}
      cancelLabel="Скасувати чернетку й очистити вибір"
    />
  )
}