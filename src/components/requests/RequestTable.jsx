import { Link } from 'react-router'
import AppButton from '../ui/AppButton.jsx'

export default function RequestTable({ requests, items, onDelete, isMutating = false }) {
  return (
    <div className="table-scroll">
      <table className="requests-table">
        <caption>Читацькі заявки</caption>
        <thead>
          <tr>
            <th scope="col">Книга та мета</th>
            <th scope="col">Квиток</th>
            <th scope="col">Дні</th>
            <th scope="col">Читальний зал</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const book = items.find((entry) => String(entry.id) === String(request.bookId))
            const path = `/loans/${encodeURIComponent(request.id)}`
            return (
              <tr key={request.id}>
                <td>
                  <strong>{book?.title ?? 'Книгу вилучено'}</strong>
                  <p>{request.purpose}</p>
                </td>
                <td>{request.ticketNumber}</td>
                <td>{request.durationDays}</td>
                <td>{request.readingRoomOnly ? 'Так' : 'Ні'}</td>
                <td>
                  <p>
                    <Link to={path}>Переглянути</Link>
                  </p>
                  <p>
                    <Link to={`${path}/edit`}>Редагувати</Link>
                  </p>
                  <AppButton
                    variant="secondary"
                    disabled={isMutating}
                    onClick={() => onDelete(request)}
                  >
                    Видалити
                  </AppButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}