import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import RequestFilters from '../components/requests/RequestFilters.jsx'
import RequestTable from '../components/requests/RequestTable.jsx'
import useRequests from '../hooks/useRequests.js'
import useRequestFilters from '../hooks/useRequestFilters.js'
import useDeleteRequest from '../hooks/useDeleteRequest.js'

export default function RequestsPage({ items }) {
  const { requests, reload, isMutating } = useRequests()
  const filters = useRequestFilters(requests, items)
  const deleteWithConfirmation = useDeleteRequest(items)
  const [error, setError] = useState('')

  const pageAlive = useRef(false)
  useEffect(() => {
    pageAlive.current = true
    return () => {
      pageAlive.current = false
    }
  }, [])

  async function handleDelete(request) {
    if (isMutating) return
    setError('')
    const result = await deleteWithConfirmation(request)
    if (!pageAlive.current) return
    if (!result.ok && !result.cancelled) {
      setError(result.message)
    }
  }

  return (
    <>
      <PageHeading title="Читацькі заявки" />
      <div className="form-actions">
        <p>
          <Link to="/loans/new">Створити нову заявку</Link>
        </p>
        <AppButton
          variant="secondary"
          disabled={isMutating}
          onClick={() => void reload()}
        >
          Оновити дані
        </AppButton>
      </div>

      <RequestFilters
        query={filters.query}
        readingRoom={filters.readingRoom}
        sort={filters.sort}
        onQueryChange={filters.setQuery}
        onReadingRoomChange={filters.setReadingRoom}
        onSortChange={filters.setSort}
        onReset={filters.resetFilters}
      />

      <p className="field-hint">
        Показано заявок: {filters.visibleRequests.length} із {requests.length}
      </p>

      <p role="status">{isMutating ? 'Опрацювання зміни...' : ''}</p>
      {error && <p role="alert" className="field-error">{error}</p>}

      {requests.length === 0 ? (
        <EmptyState title="Заявок ще немає.">
          <p>
            <Link to="/books">Виберіть книгу з каталогу для першої заявки</Link>
          </p>
        </EmptyState>
      ) : filters.visibleRequests.length === 0 ? (
        <EmptyState title="За цими умовами нічого не знайдено.">
          <AppButton variant="secondary" onClick={filters.resetFilters}>
            Показати всі заявки
          </AppButton>
        </EmptyState>
      ) : (
        <RequestTable
          requests={filters.visibleRequests}
          items={items}
          onDelete={handleDelete}
          isMutating={isMutating}
        />
      )}
    </>
  )
}