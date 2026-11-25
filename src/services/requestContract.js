import { books } from '../data/books.js'
import { validateBorrowRequest } from '../domain/requestValidation.js'
import { ServiceError } from './ServiceError.js'

export function toRequestInput(input) {
  const result = validateBorrowRequest(input, books)
  if (!result.ok) {
    throw new ServiceError('Перевірте поля заявки.', {
      code: 'VALIDATION',
      errors: result.errors,
    })
  }
  return result.value
}

export function toRequest(value) {
  const valid =
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    typeof value.bookId === 'string' &&
    value.bookId.length > 0 &&
    typeof value.ticketNumber === 'string' &&
    typeof value.purpose === 'string' &&
    Number.isInteger(value.durationDays) &&
    typeof value.readingRoomOnly === 'boolean'

  if (!valid) {
    throw new ServiceError('Джерело повернуло некоректний запис заявки.', {
      code: 'BAD_DATA',
    })
  }

  return {
    id: value.id,
    bookId: value.bookId,
    ticketNumber: value.ticketNumber,
    purpose: value.purpose,
    durationDays: value.durationDays,
    readingRoomOnly: value.readingRoomOnly,
  }
}

export function toRequestList(value) {
  if (!Array.isArray(value)) {
    throw new ServiceError('Джерело повернуло некоректний список заявок.', {
      code: 'BAD_DATA',
    })
  }

  const records = value.map(toRequest)
  if (new Set(records.map((record) => record.id)).size !== records.length) {
    throw new ServiceError('Джерело повернуло повторні ідентифікатори заявок.', {
      code: 'BAD_DATA',
    })
  }

  return records
}