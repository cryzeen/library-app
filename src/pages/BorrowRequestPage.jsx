import { useState } from 'react'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/books/AvailabilityBadge.jsx'
import BorrowRequestForm from '../components/requests/BorrowRequestForm.jsx'
import BorrowRequestSummary from '../components/requests/BorrowRequestSummary.jsx'

const emptyDraft = { ticketNumber: '', purpose: '', readingRoomOnly: false }

export default function BorrowRequestPage({
  title,
  item,
  initialDraft = emptyDraft,
  onCancel,
  cancelLabel = 'Вийти без збереження',
}) {
  const [draft, setDraft] = useState(() => ({ ...initialDraft }))

  function handleTicketNumberChange(ticketNumber) {
    setDraft((previous) => ({ ...previous, ticketNumber }))
  }

  function handlePurposeChange(purpose) {
    setDraft((previous) => ({ ...previous, purpose }))
  }

  function handleReadingRoomOnlyChange(readingRoomOnly) {
    setDraft((previous) => ({ ...previous, readingRoomOnly }))
  }

  function handleReset() {
    setDraft({ ...emptyDraft })
  }

  return (
    <>
      <PageHeading title={title} />
      <Section id="request-editor" title="Поля та підсумок">
        <p>
          Видання «{item.title}» ({item.author}):{' '}
          <AvailabilityBadge available={item.available ?? item.isAvailable} />
        </p>
        <BorrowRequestForm
          idPrefix="request-draft"
          bookTitle={item.title}
          draft={draft}
          onTicketNumberChange={handleTicketNumberChange}
          onPurposeChange={handlePurposeChange}
          onReadingRoomOnlyChange={handleReadingRoomOnlyChange}
          onReset={handleReset}
        />
        <BorrowRequestSummary bookTitle={item.title} draft={draft} />
      </Section>
      <AppButton variant="secondary" onClick={onCancel}>
        {cancelLabel}
      </AppButton>
    </>
  )
}