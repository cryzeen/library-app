export default function RequestSummary({ bookTitle, draft }) {
  return (
    <div className="request-summary">
      <h3>Поточна чернетка замовлення</h3>
      <dl>
        <dt>Видання:</dt>
        <dd>
          <strong>{bookTitle}</strong>
        </dd>
        <dt>Читацький квиток:</dt>
        <dd>{draft.ticketNumber || 'Ще не вказано'}</dd>
        <dt>Мета замовлення:</dt>
        <dd>{draft.purpose || 'Ще не вказано'}</dd>
        <dt>Термін користування:</dt>
        <dd>{draft.durationDays ? `${draft.durationDays} днів` : 'Ще не вказано'}</dd>
        <dt>Формат видачі:</dt>
        <dd>{draft.readingRoomOnly ? 'Читальний зал' : 'Абонемент (додому)'}</dd>
      </dl>
    </div>
  )
}