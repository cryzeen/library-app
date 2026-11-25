import { Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import BorrowRequestsLayout from './components/layout/BorrowRequestsLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CatalogContainer from './pages/CatalogContainer.jsx'
import BookDetailsPage from './pages/BookDetailsPage.jsx'
import RequestsPage from './pages/RequestsPage.jsx'
import RequestCreatePage from './pages/RequestCreatePage.jsx'
import RequestDetailsPage from './pages/RequestDetailsPage.jsx'
import RequestEditPage from './pages/RequestEditPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { books } from './data/books.js'

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
          <Route index element={<RequestsPage items={books} />} />
          <Route path="new" element={<RequestCreatePage items={books} />} />
          <Route path=":requestId" element={<RequestDetailsPage items={books} />} />
          <Route path=":requestId/edit" element={<RequestEditPage items={books} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}