export function validateBorrowRequest(input, books) {
  const errors = {}

  const ticketNumber = typeof input.ticketNumber === 'string' ? input.ticketNumber.trim() : ''
  const purpose = typeof input.purpose === 'string' ? input.purpose.trim() : ''
  const daysText = String(input.durationDays ?? '').trim()
  const durationDays = Number(daysText)
  const readingRoomOnly = Boolean(input.readingRoomOnly)

  if (!books.some((book) => String(book.id) === String(input.bookId))) {
    errors.bookId = 'Виберіть наявну книгу з каталогу.'
  }

  if (ticketNumber.length === 0) {
    errors.ticketNumber = 'Укажіть номер читацького квитка або ПІБ.'
  } else if (ticketNumber.length < 3 || ticketNumber.length > 50) {
    errors.ticketNumber = 'Номер квитка повинен містити від 3 до 50 символів.'
  }

  if (purpose.length === 0) {
    errors.purpose = 'Укажіть мету замовлення.'
  } else if (purpose.length < 10 || purpose.length > 500) {
    errors.purpose = 'Мета має містити від 10 до 500 символів без крайніх пробілів.'
  }

  if (daysText === '') {
    errors.durationDays = 'Укажіть термін користування.'
  } else if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 30) {
    errors.durationDays = 'Термін має бути цілим числом від 1 до 30 днів.'
  }

  if (typeof input.readingRoomOnly !== 'boolean') {
    errors.readingRoomOnly = 'Формат видачі повинен бути логічним значенням.'
  } else if (!errors.durationDays && durationDays > 14 && !readingRoomOnly) {
    errors.readingRoomOnly = 'Для терміну понад 14 днів видача можлива лише в читальний зал.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    errors: {},
    value: {
      bookId: String(input.bookId),
      ticketNumber,
      purpose,
      durationDays,
      readingRoomOnly,
    },
  }
}