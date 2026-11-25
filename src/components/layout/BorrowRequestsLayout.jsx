import { NavLink, Outlet } from 'react-router'
import RequestNotice from '../requests/RequestNotice.jsx'
import RequestsGate from '../requests/RequestsGate.jsx'

export default function BorrowRequestsLayout() {
  return (
    <div className="requests-layout">
      <nav className="sub-nav" aria-label="Навігація розділу заявок">
        <NavLink to="/loans" end>
          Усі заявки
        </NavLink>
        <NavLink to="/loans/new">Нова заявка</NavLink>
      </nav>
      <p className="field-hint">
        У режимі mock дані зберігаються в localStorage цього браузера.
      </p>
      <RequestNotice />
      <RequestsGate>
        <Outlet />
      </RequestsGate>
    </div>
  )
}