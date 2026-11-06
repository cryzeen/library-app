import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import useRequests from '../hooks/useRequests.js'
import RequestPage from './RequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function RequestEditPage({ items }) {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { requests, updateRequest } = useRequests()

  const pageAlive = useRef(false)
  useEffect(() => {
    pageAlive.current = true
    return () => {
      pageAlive.current = false
    }
  }, [])

  const activeId = useRef(requestId)
  useEffect(() => {
    activeId.current = requestId
    return () => {
      activeId.current = null
    }
  }, [requestId])

  const request = requests.find((entry) => String(entry.id) === String(requestId))
  if (!request) {
    return <NotFoundPage title="Заявку для редагування не знайдено" />
  }

  const book = items.find((entry) => String(entry.id) === String(request.bookId))
  if (!book) {
    return <NotFoundPage title="Книга заявки відсутня в каталозі" />
  }

  async function handleSave(input) {
    const result = await updateRequest(request.id, input)
    if (result.ok && pageAlive.current && activeId.current === request.id) {
      navigate(`/loans/${encodeURIComponent(result.record.id)}`, { replace: true })
    }
    return result
  }

  return (
    <RequestPage
      key={`edit-${request.id}`}
      title={`Редагування заявки ${request.id}`}
      book={book}
      initialDraft={{
        ticketNumber: request.ticketNumber,
        purpose: request.purpose,
        durationDays: request.durationDays,
        readingRoomOnly: request.readingRoomOnly,
      }}
      onSave={handleSave}
      submitLabel="Зберегти зміни"
      onCancel={() => navigate(`/loans/${encodeURIComponent(request.id)}`)}
    />
  )
}