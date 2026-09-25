import { books } from '../data/books.js';
import Section from '../components/ui/Section.jsx';
import CatalogSummary from '../components/books/CatalogSummary.jsx';
import BookList from '../components/books/BookList.jsx';

export default function HomePage() {
  return (
    <>
      <Section id="about" title="Про бібліотеку">
        <p>Електронна база даних книжкового фонду для навчальних та наукових робіт.</p>
        <p>Переглядайте доступні видання та перевіряйте статус примірників у читальній залі.</p>
      </Section>

      <Section id="catalog" title="Книжковий фонд">
        <CatalogSummary total={books.length} />
        <BookList items={books} />
      </Section>
    </>
  );
}