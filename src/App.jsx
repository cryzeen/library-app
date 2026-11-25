import { Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import BorrowRequestsLayout from './components/layout/BorrowRequestsLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CatalogContainer from './pages/CatalogContainer.jsx'
import BookDetailsPage from './pages/BookDetailsPage.jsx'
import BorrowRequestsPage from './pages/BorrowRequestsPage.jsx'
import BorrowRequestCreatePage from './pages/BorrowRequestCreatePage.jsx'
import BorrowRequestEditPage from './pages/BorrowRequestEditPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { books } from './data/books.js'
import { requests } from './data/requests.js'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout items={books} />}>
        <Route index element={<HomePage />} />
        <Route path="books">
          <Route index element={<CatalogContainer items={books} />} />
          <Route path=":bookId" element={<BookDetailsPage items={books} />} />
        </Route>
        <Route path="loans" element={<BorrowRequestsLayout />}>
          <Route index element={<BorrowRequestsPage requests={requests} items={books} />} />
          <Route path="new" element={<BorrowRequestCreatePage items={books} />} />
          <Route path=":requestId/edit" element={<BorrowRequestEditPage requests={requests} items={books} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}