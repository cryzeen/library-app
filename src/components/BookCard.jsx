export default function BookCard({ item }) {
  const statusText = item.available ? 'В наявності' : 'Видана читачу'

  return (
    <article className="book-card">
      <h3>{item.title}</h3>
      <p className="author-genre">
        <strong>{item.author}</strong> — {item.genre} ({item.year})
      </p>
      <p>{item.description}</p>
      <p className={item.available ? 'status available' : 'status'}>
        {statusText}
      </p>
    </article>
  )
}