import { useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import useBookSelection from '../hooks/useBookSelection.js'
import useRequests from '../hooks/useRequests.js'
import RequestPage from './RequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function RequestCreatePage({ items }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { selectedId, clearSelection } = useBookSelection()
  const { createRequest } = useRequests()

  const pageAlive = useRef(false)
  useEffect(() => {
    pageAlive.current = true
    return () => {
      pageAlive.current = false
    }
  }, [])

  const bookId = searchParams.get('bookId')

  if (bookId === null) {
    const search = selectedId ? `?${new URLSearchParams({ bookId: selectedId })}` : null
    return (
      <>
        <PageHeading title="Нова читацька заявка" />
        <EmptyState title="Спочатку виберіть книгу з каталогу.">
          <p>
            <Link to="/books">Перейти до каталогу книг</Link>
          </p>
          {search && (
            <p>
              <Link to={`/loans/new${search}`}>Оформити для останньої обраної книги</Link>
            </p>
          )}
        </EmptyState>
      </>
    )
  }

  const book = items.find((entry) => String(entry.id) === String(bookId))
  if (!book) {
    return <NotFoundPage title="Книгу нової заявки не знайдено" />
  }

  async function handleSave(input) {
    const result = await createRequest(input)
    if (result.ok && pageAlive.current) {
      clearSelection()
      navigate(`/loans/${encodeURIComponent(result.record.id)}`, { replace: true })
    }
    return result
  }

  function handleCancel() {
    clearSelection()
    navigate('/books', { replace: true })
  }

  return (
    <RequestPage
      key={`new-${book.id}`}
      title="Нова читацька заявка"
      book={book}
      onSave={handleSave}
      submitLabel="Створити заявку"
      onCancel={handleCancel}
      cancelLabel="Скасувати чернетку й очистити вибір"
    />
  )
}