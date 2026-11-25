import { books } from '../data/books.js'

export const testBook = books.find((b) => b.id === 'book-001') || books[0]

export const validBorrowInput = {
  bookId: testBook.id,
  ticketNumber: 'ЧК-10482',
  purpose: 'Опрацювання матеріалів для курсового проєкту з автоматизації.',
  durationDays: 7,
  readingRoomOnly: false,
}

export const savedBorrowRequest = {
  ...validBorrowInput,
  id: 'req-test-001',
}