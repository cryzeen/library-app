import useRequests from '../../hooks/useRequests.js'

export default function RequestsGate({ children }) {
  const { status, error, reload } = useRequests()

  if (status === 'loading') {
    return (
      <section aria-busy="true" aria-label="Заявки">
        <p role="status">Завантаження заявок...</p>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section aria-label="Помилка завантаження">
        <p role="alert">{error}</p>
        <button type="button" onClick={() => void reload()}>
          Спробувати ще раз
        </button>
      </section>
    )
  }

  return children
}