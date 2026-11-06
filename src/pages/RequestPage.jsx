import { useEffect, useRef, useState } from 'react'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/books/AvailabilityBadge.jsx'
import RequestForm from '../components/requests/RequestForm.jsx'
import RequestSummary from '../components/requests/RequestSummary.jsx'
import { validateBorrowRequest } from '../domain/requestValidation.js'

const emptyDraft = {
  ticketNumber: '',
  purpose: '',
  durationDays: '7',
  readingRoomOnly: false,
}

export default function RequestPage({
  title,
  book,
  initialDraft = emptyDraft,
  onSave,
  onCancel,
  submitLabel,
  cancelLabel = 'Вийти без збереження',
}) {
  const initialValues = {
    ticketNumber: initialDraft.ticketNumber,
    purpose: initialDraft.purpose,
    durationDays: String(initialDraft.durationDays),
    readingRoomOnly: Boolean(initialDraft.readingRoomOnly),
  }

  const [draft, setDraft] = useState(() => ({ ...initialValues }))
  const [touched, setTouched] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [operationError, setOperationError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitting = useRef(false)
  const alive = useRef(false)

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  const validation = validateBorrowRequest({ ...draft, bookId: book.id }, [book])

  const errors = Object.fromEntries(
    Object.entries(validation.errors).filter(([field]) => attempted || touched[field])
  )

  const isDirty =
    draft.ticketNumber !== initialValues.ticketNumber ||
    draft.purpose !== initialValues.purpose ||
    draft.durationDays !== initialValues.durationDays ||
    draft.readingRoomOnly !== initialValues.readingRoomOnly

  function handleChange(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }))
    setOperationError('')
  }

  function handleBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting.current) return

    setAttempted(true)
    setOperationError('')

    if (!validation.ok) {
      const firstField = ['ticketNumber', 'purpose', 'durationDays', 'readingRoomOnly'].find(
        (field) => validation.errors[field]
      )
      if (firstField) {
        event.currentTarget.elements.namedItem(firstField)?.focus()
      }
      return
    }

    submitting.current = true
    setIsSubmitting(true)

    try {
      const result = await onSave(validation.value)
      if (!result.ok && alive.current) {
        setOperationError(
          result.errors
            ? Object.values(result.errors).join(' ')
            : result.message || 'Не вдалося зберегти заявку.'
        )
      }
    } catch {
      if (alive.current) {
        setOperationError('Не вдалося завершити збереження.')
      }
    } finally {
      submitting.current = false
      if (alive.current) {
        setIsSubmitting(false)
      }
    }
  }

  function handleReset() {
    if (submitting.current) return
    if (!isDirty) return
    if (window.confirm('Відкинути введені зміни та відновити початкові поля?')) {
      setDraft({ ...initialValues })
      setTouched({})
      setAttempted(false)
      setOperationError('')
    }
  }

  function handleCancel() {
    if (submitting.current) return
    if (isDirty && !window.confirm('Вийти та відкинути незбережені зміни?')) {
      return
    }
    onCancel()
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="request-editor" title="Поля та підсумок">
        <p>
          <AvailabilityBadge available={book.available ?? book.isAvailable} />
        </p>
        <RequestForm
          idPrefix="request-draft"
          bookTitle={book.title}
          draft={draft}
          errors={errors}
          operationError={operationError}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          onReset={handleReset}
          submitLabel={submitLabel}
        />
        <RequestSummary bookTitle={book.title} draft={draft} />
      </Section>
      <AppButton variant="secondary" disabled={isSubmitting} onClick={handleCancel}>
        {cancelLabel}
      </AppButton>
    </>
  )
}