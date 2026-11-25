import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import RequestPage from './RequestPage.jsx'
import { testBook, validBorrowInput, savedBorrowRequest } from '../test/fixtures.js'
import { deferred } from '../test/deferred.js'

function renderEditor(onSave) {
  return render(
    <RequestPage
      title="Нова читацька заявка"
      book={testBook}
      item={testBook}
      onSave={onSave}
      onCancel={vi.fn()}
      submitLabel="Створити заявку"
    />
  )
}

test('не відправляє порожню форму та показує помилку біля поля', async () => {
  const user = userEvent.setup()
  const onSave = vi.fn()
  renderEditor(onSave)

  await user.click(screen.getByRole('button', { name: 'Створити заявку' }))

  const ticketField = screen.getByRole('textbox', { name: /Номер читацького квитка/i })
  expect(ticketField).toHaveAttribute('aria-invalid', 'true')
  expect(ticketField).toHaveFocus()
  expect(onSave).not.toHaveBeenCalled()
})

test('блокує повторне подання під час виконання запиту', async () => {
  const user = userEvent.setup()
  const pending = deferred()
  const onSave = vi.fn().mockReturnValue(pending.promise)

  renderEditor(onSave)

  await user.type(screen.getByRole('textbox', { name: /Номер читацького квитка/i }), validBorrowInput.ticketNumber)
  await user.type(screen.getByRole('textbox', { name: /Мета замовлення/i }), validBorrowInput.purpose)
  const daysInput = screen.getByRole('spinbutton', { name: /Термін користування/i })
  await user.clear(daysInput)
  await user.type(daysInput, '7')

  const submitBtn = screen.getByRole('button', { name: 'Створити заявку' })
  await user.click(submitBtn)

  expect(submitBtn).toBeDisabled()
  expect(onSave).toHaveBeenCalledTimes(1)

  await act(async () => {
    pending.resolve({ ok: true, record: savedBorrowRequest })
    await pending.promise
  })
})

test('зберігає введення чернетки при відмові сервісу', async () => {
  const user = userEvent.setup()
  const onSave = vi.fn().mockResolvedValue({ ok: false, message: 'Помилка мережі.' })

  renderEditor(onSave)

  await user.type(screen.getByRole('textbox', { name: /Номер читацького квитка/i }), validBorrowInput.ticketNumber)
  await user.type(screen.getByRole('textbox', { name: /Мета замовлення/i }), validBorrowInput.purpose)
  await user.click(screen.getByRole('button', { name: 'Створити заявку' }))

  expect(await screen.findByRole('alert')).toHaveTextContent('Помилка мережі.')
  expect(screen.getByRole('textbox', { name: /Номер читацького квитка/i })).toHaveValue(validBorrowInput.ticketNumber)
})