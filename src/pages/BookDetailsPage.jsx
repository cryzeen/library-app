import { Link, useNavigate, useParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/books/AvailabilityBadge.jsx'
import useBookSelection from '../hooks/useBookSelection.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function BookDetailsPage({ items }) {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { selectBook } = useBookSelection()

  const book = items.find((entry) => String(entry.id) === String(bookId))

  if (!book) {
    return (
      <NotFoundPage
        title="Книгу не знайдено"
        message="У каталозі немає книги з таким ідентифікатором."
      />
    )
  }

  function handlePrepareRequest() {
    selectBook(book.id)
    const search = new URLSearchParams({ bookId: book.id })
    navigate(`/loans/new?${search}`)
  }

  return (
    <>
      <PageHeading title={book.title} />
      <p className="author">{book.author} ({book.year})</p>
      <p>{book.description}</p>
      <p><AvailabilityBadge available={book.available ?? book.isAvailable} /></p>
      <AppButton onClick={handlePrepareRequest}>
        Вибрати та оформити заявку
      </AppButton>
      <p><Link to="/books">До каталогу без фільтрів</Link></p>
    </>
  )
}