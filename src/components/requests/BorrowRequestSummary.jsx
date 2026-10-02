export default function BorrowRequestSummary({ bookTitle, draft }) {
  const cleanPurpose = draft.purpose.trim()
  const cleanTicket = draft.ticketNumber.trim()

  return (
    <aside className="request-summary" aria-labelledby="request-summary-title">
      <h3 id="request-summary-title">Поточна чернетка замовлення</h3>
      <dl>
        <dt>Видання:</dt>
        <dd><strong>{bookTitle}</strong></dd>

        <dt>Читацький квиток:</dt>
        <dd>{cleanTicket || 'Ще не вказано'}</dd>

        <dt>Мета замовлення:</dt>
        <dd>{cleanPurpose || 'Ще не вказано'}</dd>

        <dt>Формат видачі:</dt>
        <dd>{draft.readingRoomOnly ? 'Тільки читальний зал' : 'Абонемент (додому)'}</dd>
      </dl>
      <p className="summary-disclaimer">
        Цей підсумок є чернеткою і не підтверджує резервування примірника в системі.
      </p>
    </aside>
  )
}