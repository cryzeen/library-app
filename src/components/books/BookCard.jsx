import AvailabilityBadge from './AvailabilityBadge.jsx';

export default function BookCard({ item }) {
  return (
    <article className="book-card">
      <h3>{item.title}</h3>
      <p className="author-meta">
        <strong>{item.author}</strong> — <span>{item.genre} ({item.year})</span>
      </p>
      <p className="description">{item.description}</p>
      <div className="status-container">
        <AvailabilityBadge available={item.isAvailable} />
      </div>
    </article>
  );
}