import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import Section from '../components/ui/Section.jsx'
import CatalogSummary from '../components/books/CatalogSummary.jsx'
import BookFilters from '../components/books/BookFilters.jsx'
import BookList from '../components/books/BookList.jsx'
import useBookFilters from '../hooks/useBookFilters.js'

export default function BookListPage({ items, selectedId, onSelect }) {
  const {
    query,
    setQuery,
    availableOnly,
    setAvailableOnly,
    visibleItems,
    resetFilters,
  } = useBookFilters(items)

  const requestSearch = selectedId
    ? `?${new URLSearchParams({ bookId: selectedId })}`
    : ''

  return (
    <>
      <PageHeading title="Каталог книг" />
      <Section id="catalog" title="Пошук та вибір">
        <CatalogSummary total={items.length} />
        <BookFilters
          query={query}
          availableOnly={availableOnly}
          onQueryChange={setQuery}
          onAvailableOnlyChange={setAvailableOnly}
          onReset={resetFilters}
        />
        <p>Показано книг: {visibleItems.length}</p>
        <BookList
          items={visibleItems}
          selectedId={selectedId}
          onSelect={onSelect}
          emptyTitle={
            items.length === 0
              ? 'Книги ще не додано.'
              : 'За цими фільтрами нічого не знайдено.'
          }
        />
        <p>
          <Link to={`/loans/new${requestSearch}`}>
            Підготувати нову заявку
          </Link>
        </p>
      </Section>
    </>
  )
}