import useRequests from './useRequests.js'

export default function useDeleteRequest(items) {
  const { deleteRequest } = useRequests()

  return async function deleteWithConfirmation(request) {
    const book = items.find((entry) => String(entry.id) === String(request.bookId))
    const title = book?.title ?? request.bookId
    const confirmed = window.confirm(
      `Видалити заявку ${request.id} на книгу «${title}»?\nЗапис буде вилучено з колекції. Скасування видалення не передбачено.`
    )
    if (!confirmed) return { ok: false, cancelled: true }
    return deleteRequest(request.id)
  }
}