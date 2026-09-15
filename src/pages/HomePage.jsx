import BookCard from '../components/BookCard.jsx'
import { books } from '../data/books.js'

export default function HomePage() {
  return (
    <>
      <section id="about" aria-labelledby="about-title">
        <h1 id="about-title">Каталог бібліотеки</h1>
        <p>Електронна база даних книжкового фонду для навчальних та наукових робіт.</p>
        <p>Переглядайте доступні видання та перевіряйте статус примірників у читальній залі.</p>
      </section>

      <section id="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Книжковий фонд</h2>
        <p>Книг у каталозі: {books.length}</p>

        {books.length === 0 ? (
          <p>Книжковий фонд порожній або видання ще не додані.</p>
        ) : (
          <ul className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard item={book} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}