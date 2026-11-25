import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function BorrowRequestForm({
  idPrefix,
  bookTitle,
  draft,
  onTicketNumberChange,
  onPurposeChange,
  onReadingRoomOnlyChange,
  onReset,
}) {
  const titleId = `${idPrefix}-book-title`
  const ticketId = `${idPrefix}-ticket`
  const purposeId = `${idPrefix}-purpose`
  const noticeId = `${idPrefix}-notice`

  return (
    <form
      aria-label="Чернетка замовлення книги"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
      className="borrow-form"
    >
      <p id={noticeId} className="draft-notice">
        Чернетка зберігається лише в межах сеансу до зміни книги або скасування вибору.
      </p>

      <FormField id={titleId} label="Обране видання">
        <input id={titleId} name="bookTitle" value={bookTitle} readOnly />
      </FormField>

      <FormField
        id={ticketId}
        label="Номер читацького квитка"
        hint="Введіть номер вашого квитка (наприклад, ЧК-10482)."
      >
        <input
          id={ticketId}
          type="text"
          name="ticketNumber"
          value={draft.ticketNumber}
          onChange={(event) => onTicketNumberChange(event.target.value)}
          aria-describedby={`${ticketId}-hint`}
        />
      </FormField>

      <FormField
        id={purposeId}
        label="Мета замовлення / примітка"
        hint="Опишіть завдання або мету опрацювання видання."
      >
        <textarea
          id={purposeId}
          name="purpose"
          rows={3}
          value={draft.purpose}
          onChange={(event) => onPurposeChange(event.target.value)}
          aria-describedby={`${purposeId}-hint`}
        />
      </FormField>

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="readingRoomOnly"
          checked={draft.readingRoomOnly}
          onChange={(event) => onReadingRoomOnlyChange(event.target.checked)}
        />
        Видача лише в читальний зал
      </label>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <AppButton variant="secondary" onClick={onReset}>
          Очистити поля
        </AppButton>
        <AppButton disabled>Надіслати замовлення (доступно пізніше)</AppButton>
      </div>
    </form>
  )
}