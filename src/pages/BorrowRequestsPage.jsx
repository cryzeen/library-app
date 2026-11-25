import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'

export default function BorrowRequestsPage({ requests, items }) {
  return (
    <>
      <PageHeading title="Читацькі заявки" />
      <p>Нижче наведено локальні демонстраційні записи.</p>
      {requests.length === 0 ? (
        <p>Заявок ще немає. <Link to="new">Підготувати нову заявку</Link></p>
      ) : (
        <div className="table-scroll">
          <table className="requests-table">
            <caption>Заявки для перевірки навігації</caption>
            <thead>
              <tr>
                <th scope="col">Книга</th>
                <th scope="col">Квиток</th>
                <th scope="col">Мета</th>
                <th scope="col">Дія</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => {
                const book = items.find((entry) => String(entry.id) === String(request.bookId))
                return (
                  <tr key={request.id}>
                    <td>{book?.title ?? 'Книга відсутня в каталозі'}</td>
                    <td>{request.ticketNumber}</td>
                    <td>{request.purpose}</td>
                    <td>
                      <Link to={`${encodeURIComponent(request.id)}/edit`}>
                        Редагувати {request.id}
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}