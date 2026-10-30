import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function RequestForm({
  idPrefix,
  bookTitle,
  draft,
  errors,
  operationError,
  onChange,
  onBlur,
  onSubmit,
  onReset,
  submitLabel,
}) {
  const ticketId = `${idPrefix}-ticket`
  const purposeId = `${idPrefix}-purpose`
  const daysId = `${idPrefix}-days`
  const roomOnlyId = `${idPrefix}-room-only`

  const hasErrors = Object.keys(errors).length > 0

  function describedBy(id, error) {
    return `${id}-hint${error ? ` ${id}-error` : ''}`
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Форма читацької заявки">
      <p>
        Обрана книга: <strong>{bookTitle}</strong>
      </p>
      <p className="field-hint">
        Збережіть зміни кнопкою нижче. Незбережене введення зникає при виході зі сторінки або її оновленні.
      </p>

      {hasErrors && <p role="alert" className="field-error">Виправте позначені поля нижче.</p>}
      {errors.bookId && <p role="alert" className="field-error">{errors.bookId}</p>}
      {operationError && <p role="alert" className="field-error">{operationError}</p>}

      <FormField
        id={ticketId}
        label="Номер читацького квитка або ПІБ (обов'язково)"
        hint="Від 3 до 50 символів."
        error={errors.ticketNumber}
      >
        <input
          id={ticketId}
          name="ticketNumber"
          type="text"
          required
          value={draft.ticketNumber}
          onChange={(e) => onChange('ticketNumber', e.target.value)}
          onBlur={() => onBlur('ticketNumber')}
          aria-invalid={Boolean(errors.ticketNumber)}
          aria-describedby={describedBy(ticketId, errors.ticketNumber)}
        />
      </FormField>

      <FormField
        id={purposeId}
        label="Мета замовлення (обов'язково)"
        hint="Від 10 до 500 символів без крайніх пробілів."
        error={errors.purpose}
      >
        <textarea
          id={purposeId}
          name="purpose"
          rows={3}
          required
          value={draft.purpose}
          onChange={(e) => onChange('purpose', e.target.value)}
          onBlur={() => onBlur('purpose')}
          aria-invalid={Boolean(errors.purpose)}
          aria-describedby={describedBy(purposeId, errors.purpose)}
        />
      </FormField>

      <FormField
        id={daysId}
        label="Термін користування в днях (обов'язково)"
        hint="Ціле число від 1 до 30 днів."
        error={errors.durationDays}
      >
        <input
          id={daysId}
          name="durationDays"
          type="number"
          min={1}
          max={30}
          step={1}
          required
          value={draft.durationDays}
          onChange={(e) => onChange('durationDays', e.target.value)}
          onBlur={() => onBlur('durationDays')}
          aria-invalid={Boolean(errors.durationDays)}
          aria-describedby={describedBy(daysId, errors.durationDays)}
        />
      </FormField>

      <div className="form-field">
        <label className="checkbox-field" htmlFor={roomOnlyId}>
          <input
            id={roomOnlyId}
            name="readingRoomOnly"
            type="checkbox"
            checked={draft.readingRoomOnly}
            onChange={(e) => onChange('readingRoomOnly', e.target.checked)}
            onBlur={() => onBlur('readingRoomOnly')}
            aria-invalid={Boolean(errors.readingRoomOnly)}
            aria-describedby={describedBy(roomOnlyId, errors.readingRoomOnly)}
          />
          Видача лише в читальний зал
        </label>
        <p id={`${roomOnlyId}-hint`} className="field-hint">
          Для терміну понад 14 днів видача лише в читальний зал обов'язкова.
        </p>
        {errors.readingRoomOnly && (
          <p id={`${roomOnlyId}-error`} className="field-error">
            {errors.readingRoomOnly}
          </p>
        )}
      </div>

      <div className="form-actions">
        <AppButton type="submit">{submitLabel}</AppButton>
        <AppButton variant="secondary" onClick={onReset}>
          Відновити початкові поля
        </AppButton>
      </div>
    </form>
  )
}