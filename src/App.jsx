import AppLayout from './components/layout/AppLayout.jsx'
import BookSelectionProvider from './providers/BookSelectionProvider.jsx'
import CatalogContainer from './pages/CatalogContainer.jsx'
import BorrowRequestContainer from './pages/BorrowRequestContainer.jsx'
import { books } from './data/books.js'

const navigationLinks = [
  { href: '#about', label: 'Про бібліотеку' },
  { href: '#catalog', label: 'Книжковий фонд' },
  { href: '#request', label: 'Оформлення заявки' },
]

export default function App() {
  return (
    <AppLayout title="Бібліотека" links={navigationLinks}>
      <BookSelectionProvider items={books}>
        <CatalogContainer items={books} />
        <BorrowRequestContainer />
      </BookSelectionProvider>
    </AppLayout>
  )
}