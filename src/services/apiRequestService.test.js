import { afterEach, expect, test, vi } from 'vitest'
import { createApiRequestService } from './apiRequestService.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

test('відхиляє HTTP 404 із відповідним кодом помилки', async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 404 }))
  vi.stubGlobal('fetch', fetchMock)

  const service = createApiRequestService('https://example.test/api')
  await expect(service.getById('missing')).rejects.toMatchObject({
    code: 'NOT_FOUND',
    status: 404,
  })
})

test('обробляє DELETE status 204 No Content без читання JSON', async () => {
  const response = new Response(null, { status: 204 })
  const readJson = vi.spyOn(response, 'json')
  const fetchMock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('fetch', fetchMock)

  const service = createApiRequestService('https://example.test/api')
  await expect(service.delete('req-test-001')).resolves.toBeUndefined()
  expect(readJson).not.toHaveBeenCalled()
})