import { useState } from 'react'
import { RequestsContext } from '../context/RequestsContext.js'
import { requests as initialRequests } from '../data/requests.js'
import { validateBorrowRequest } from '../domain/requestValidation.js'

export default function RequestsProvider({ items, children }) {
  const [requests, setRequests] = useState(() =>
    initialRequests.map((request) => ({ ...request }))
  )
  const [notice, setNotice] = useState('')

  function createRequest(input) {
    const validation = validateBorrowRequest(input, items)
    if (!validation.ok) return validation

    const record = {
      id: `req-${crypto.randomUUID()}`,
      ...validation.value,
    }

    setRequests((previous) => [...previous, record])
    setNotice('Заявку створено в поточній локальній колекції.')
    return { ok: true, record }
  }

  function updateRequest(id, input) {
    const current = requests.find((request) => String(request.id) === String(id))
    if (!current) {
      return { ok: false, message: 'Заявку для оновлення не знайдено.' }
    }

    const validation = validateBorrowRequest(input, items)
    if (!validation.ok) return validation

    const record = { ...validation.value, id: current.id }

    setRequests((previous) =>
      previous.map((request) =>
        String(request.id) === String(id) ? record : request
      )
    )
    setNotice('Зміни заявки збережено в поточній локальній колекції.')
    return { ok: true, record }
  }

  function deleteRequest(id) {
    if (!requests.some((request) => String(request.id) === String(id))) {
      return { ok: false, message: 'Заявку для видалення не знайдено.' }
    }

    setRequests((previous) =>
      previous.filter((request) => String(request.id) !== String(id))
    )
    setNotice('Заявку видалено з поточної локальної колекції.')
    return { ok: true }
  }

  function dismissNotice() {
    setNotice('')
  }

  return (
    <RequestsContext.Provider
      value={{
        requests,
        createRequest,
        updateRequest,
        deleteRequest,
        notice,
        dismissNotice,
      }}
    >
      {children}
    </RequestsContext.Provider>
  )
}