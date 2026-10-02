import { useEffect, useState } from 'react'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import AvailabilityBadge from '../components/books/AvailabilityBadge.jsx'
import BorrowRequestForm from '../components/requests/BorrowRequestForm.jsx'
import BorrowRequestSummary from '../components/requests/BorrowRequestSummary.jsx'

function createEmptyDraft() {
  return {
    ticketNumber: '',
    purpose: '',
    readingRoomOnly: false,
  }
}

export default function BorrowRequestPage({ item, onClearSelection }) {
  const [draft, setDraft] = useState(createEmptyDraft)

  const title = item
    ? `Бібліотека: Замовлення «${item.title}»`
    : 'Бібліотека — База даних книжкового фонду'

  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    return () => {
      document.title = previousTitle
    }
  }, [title])

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
    setDraft(createEmptyDraft())
  }

  if (!item) {
    return (
      <Section id="request" title="Оформлення замовлення книги">
        <EmptyState title="Книгу не обрано.">
          <p>
            Будь ласка, <a href="#catalog">оберіть видання у каталозі</a> для підготовки читацької заявки.
          </p>
        </EmptyState>
      </Section>
    )
  }

  return (
    <Section id="request" title="Оформлення замовлення книги">
      <div style={{ marginBottom: '1rem' }}>
        <p>
          Обрано видання: <strong>«{item.title}»</strong> ({item.author}) —{' '}
          <AvailabilityBadge available={item.isAvailable} />
        </p>
      </div>

      <BorrowRequestForm
        idPrefix="borrow-draft"
        bookTitle={item.title}
        draft={draft}
        onTicketNumberChange={handleTicketNumberChange}
        onPurposeChange={handlePurposeChange}
        onReadingRoomOnlyChange={handleReadingRoomOnlyChange}
        onReset={handleReset}
      />

      <BorrowRequestSummary bookTitle={item.title} draft={draft} />

      <div style={{ marginTop: '1.5rem' }}>
        <AppButton variant="secondary" onClick={onClearSelection}>
          Скасувати вибір і очистити замовлення
        </AppButton>
      </div>
    </Section>
  )
}