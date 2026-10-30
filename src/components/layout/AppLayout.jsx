import { Outlet } from 'react-router'
import SiteHeader from './SiteHeader.jsx'
import BookSelectionProvider from '../../providers/BookSelectionProvider.jsx'
import RequestsProvider from '../../providers/RequestsProvider.jsx'

const navigationLinks = [
  { to: '/', label: 'Головна', end: true },
  { to: '/books', label: 'Каталог книг' },
  { to: '/loans', label: 'Заявки' },
]

export default function AppLayout({ items }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <SiteHeader title="Бібліотека" links={navigationLinks} />
      <main id="main-content" tabIndex={-1}>
        <BookSelectionProvider items={items}>
          <RequestsProvider items={items}>
            <Outlet />
          </RequestsProvider>
        </BookSelectionProvider>
      </main>
      <footer>Навчальний проєкт. Електронна бібліотека.</footer>
    </>
  )
}