import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'
import { requestService } from './services/requestService.js'
import { savedBorrowRequest } from './test/fixtures.js'
import { deferred } from './test/deferred.js'

vi.mock('./services/requestService.js', () => ({
  requestService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

beforeEach(() => {
  for (const method of Object.values(requestService)) method.mockReset()
  requestService.getAll.mockResolvedValue([{ ...savedBorrowRequest }])
  requestService.getById.mockResolvedValue({ ...savedBorrowRequest })
  requestService.create.mockImplementation(async (input) => ({ ...input, id: 'req-created-123' }))
  requestService.update.mockImplementation(async (id, input) => ({ ...input, id }))
  requestService.delete.mockResolvedValue(undefined)
})

afterEach(() => {
  vi.restoreAllMocks()
})

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}{location.search}</output>
}

function renderApp(path = '/loans') {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>
  )
  return user
}

test('відображає завантаження та успішно виводить список заявок', async () => {
  const pending = deferred()
  requestService.getAll.mockReturnValueOnce(pending.promise)

  renderApp('/loans')

  expect(screen.getByText(/Завантаження заявок/i)).toBeInTheDocument()

  await act(async () => {
    pending.resolve([savedBorrowRequest])
    await pending.promise
  })

  expect(await screen.findByText(savedBorrowRequest.purpose)).toBeInTheDocument()
})

test('скасування підтвердження видалення не викликає сервіс', async () => {
  vi.spyOn(window, 'confirm').mockReturnValue(false)
  const user = renderApp('/loans')

  await screen.findByText(savedBorrowRequest.purpose)
  const deleteBtn = screen.getAllByRole('button', { name: /Видалити/i })[0]
  await user.click(deleteBtn)

  expect(requestService.delete).not.toHaveBeenCalled()
})