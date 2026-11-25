import { describe, expect, test } from 'vitest'
import { validateBorrowRequest } from './requestValidation.js'
import { testBook, validBorrowInput } from '../test/fixtures.js'

describe('validateBorrowRequest', () => {
  test('нормалізує коректні поля та не мутує вхідний об’єкт', () => {
    const input = Object.freeze({
      ...validBorrowInput,
      purpose: `  ${validBorrowInput.purpose}  `,
      ticketNumber: ' ЧК-10482 ',
    })

    const result = validateBorrowRequest(input, [testBook])

    expect(result.ok).toBe(true)
    expect(result.value.purpose).toBe(validBorrowInput.purpose)
    expect(result.value.ticketNumber).toBe('ЧК-10482')
  })

  test('відхиляє некоректний термін користування', () => {
    const result = validateBorrowRequest(
      { ...validBorrowInput, durationDays: 0 },
      [testBook]
    )
    expect(result.ok).toBe(false)
    expect(result.errors.durationDays).toBeTruthy()
  })

  test('приймає граничні значення терміну (1 та 30 днів)', () => {
    const res1 = validateBorrowRequest({ ...validBorrowInput, durationDays: 1 }, [testBook])
    const res30 = validateBorrowRequest(
      { ...validBorrowInput, durationDays: 30, readingRoomOnly: true },
      [testBook]
    )
    expect(res1.ok).toBe(true)
    expect(res30.ok).toBe(true)
  })

  test('вимагає видачу в читальний зал для терміну понад 14 днів', () => {
    const result = validateBorrowRequest(
      { ...validBorrowInput, durationDays: 15, readingRoomOnly: false },
      [testBook]
    )
    expect(result.ok).toBe(false)
    expect(result.errors.readingRoomOnly).toBeTruthy()
  })

  test('відхиляє замовлення для неіснуючої книги', () => {
    const result = validateBorrowRequest(
      { ...validBorrowInput, bookId: 'non-existing-book' },
      [testBook]
    )
    expect(result.ok).toBe(false)
    expect(result.errors.bookId).toBeTruthy()
  })
})