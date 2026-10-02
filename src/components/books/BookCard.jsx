import { useState } from 'react'
import AvailabilityBadge from './AvailabilityBadge.jsx'
import AppButton from '../ui/AppButton.jsx'

export default function BookCard({ item, selected, onSelect }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const descriptionId = `book-${item.id}-description`

  return (
    <article className="book-card">
      <h3>{item.title}</h3>
      <p className="author-genre">
        <strong>{item.author}</strong> — {item.genre} ({item.year})
      </p>
      <p>
        <AvailabilityBadge available={item.isAvailable} />
      </p>

      <AppButton
        variant="secondary"
        aria-expanded={detailsOpen}
        aria-controls={descriptionId}
        onClick={() => setDetailsOpen((previous) => !previous)}
      >
        {detailsOpen ? 'Згорнути опис' : 'Показати опис'}
      </AppButton>

      <p id={descriptionId} hidden={!detailsOpen} className="book-description">
        {item.description}
      </p>

      <div style={{ marginTop: '0.75rem' }}>
        <AppButton
          aria-pressed={selected}
          onClick={() => onSelect?.(item.id)}
        >
          {selected ? '✓ Обрано для заявки' : `Вибрати «${item.title}»`}
        </AppButton>
      </div>

      {selected && <p className="selection-note">Обрано для чернетки замовлення.</p>}
    </article>
  )
}