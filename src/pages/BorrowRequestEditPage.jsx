import { useNavigate, useParams } from 'react-router'
import BorrowRequestPage from './BorrowRequestPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function BorrowRequestEditPage({ requests, items }) {
  const { requestId } = useParams()
  const navigate = useNavigate()

  const request = requests.find((entry) => String(entry.id) === String(requestId))

  if (!request) {
    return (
      <NotFoundPage
        title="Заявку не знайдено"
        message="Перевірте ідентифікатор заявки в адресі."
      />
    )
  }

  const book = items.find((entry) => String(entry.id) === String(request.bookId))

  if (!book) {
    return (
      <NotFoundPage
        title="Книга заявки відсутня"
        message="Демонстраційний запис посилається на відсутню книгу."
      />
    )
  }

  return (
    <BorrowRequestPage
      key={`edit-${request.id}`}
      title={`Редагування заявки ${request.id}`}
      item={book}
      initialDraft={{
        ticketNumber: request.ticketNumber,
        purpose: request.purpose,
        readingRoomOnly: request.readingRoomOnly,
      }}
      onCancel={() => navigate('/loans')}
    />
  )
}