import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import useRequests from '../hooks/useRequests.js'
import useDeleteRequest from '../hooks/useDeleteRequest.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function RequestDetailsPage({ items }) {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { requests } = useRequests()
  const deleteWithConfirmation = useDeleteRequest(items)
  const [error, setError] = useState('')

  const request = requests.find((entry) => String(entry.id) === String(requestId))
  if (!request) {
    return <NotFoundPage title="Заявку не знайдено" />
  }

  const book = items.find((entry) => String(entry.id) === String(request.bookId))

  function handleDelete() {
    setError('')
    const result = deleteWithConfirmation(request)
    if (result.ok) {
      navigate('/loans', { replace: true })
    } else if (!result.cancelled) {
      setError(result.message)
    }
  }

  return (
    <>
      <PageHeading title={`Заявка ${request.id}`} />
      {error && <p role="alert" className="field-error">{error}</p>}
      <dl>
        <dt>Обрана книга:</dt>
        <dd>
          <strong>{book?.title ?? 'Книгу вилучено з каталогу'}</strong>
          {book?.author && ` — ${book.author}`}
        </dd>
        <dt>Читацький квиток:</dt>
        <dd>{request.ticketNumber}</dd>
        <dt>Мета замовлення:</dt>
        <dd>{request.purpose}</dd>
        <dt>Термін користування:</dt>
        <dd>{request.durationDays} днів</dd>
        <dt>Формат видачі:</dt>
        <dd>{request.readingRoomOnly ? 'Читальний зал' : 'Абонемент (додому)'}</dd>
      </dl>
      <p className="field-hint">Збережена заявка знаходиться в пам'яті клієнта до перезавантаження сторінки.</p>
      <div className="form-actions">
        <p>
          <Link to={`/loans/${encodeURIComponent(request.id)}/edit`}>
            Редагувати заявку
          </Link>
        </p>
        <AppButton variant="secondary" onClick={handleDelete}>
          Видалити заявку
        </AppButton>
        <p>
          <Link to="/loans">До списку всіх заявок</Link>
        </p>
      </div>
    </>
  )
}