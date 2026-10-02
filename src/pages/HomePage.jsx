import Section from '../components/ui/Section.jsx'
import CatalogSummary from '../components/books/CatalogSummary.jsx'
import BookFilters from '../components/books/BookFilters.jsx'
import BookList from '../components/books/BookList.jsx'
import useBookFilters from '../hooks/useBookFilters.js'

export default function HomePage({ items = [], selectedId, onSelect }) {
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useBookFilters(items)

  return (
    <>
      <Section id="about" title="Про бібліотеку">
        <p>Каталог книжкового фонду для навчальних та наукових робіт.</p>
        <p>Виберіть потрібне видання та перейдіть до підготовки читацької заявки.</p>
      </Section>

      <Section id="catalog" title="Книжковий фонд">
        <CatalogSummary total={items.length} />

        <BookFilters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />

        <p className="results-count">Показано книг: {visibleItems.length}</p>

        <BookList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={
            items.length === 0
              ? 'Книжковий фонд порожній.'
              : 'За цими фільтрами нічого не знайдено.'
          }
        />

        <p style={{ marginTop: '1rem' }}>
          <a href="#request">Перейти до оформлення замовлення книги →</a>
        </p>
      </Section>
    </>
  )
}