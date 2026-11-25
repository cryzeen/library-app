import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function RequestFilters({
  query,
  readingRoom,
  sort,
  onQueryChange,
  onReadingRoomChange,
  onSortChange,
  onReset,
}) {
  return (
    <div className="request-filters">
      <FormField id="requests-query" label="Пошук у заявках">
        <input
          id="requests-query"
          type="search"
          placeholder="Пошук за книгою, метою або квитком..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>

      <FormField id="requests-room" label="Формат видачі">
        <select
          id="requests-room"
          value={readingRoom}
          onChange={(event) => onReadingRoomChange(event.target.value)}
        >
          <option value="all">Усі заявки</option>
          <option value="yes">Лише читальний зал</option>
          <option value="no">Абонемент (додому)</option>
        </select>
      </FormField>

      <FormField id="requests-sort" label="Упорядкування">
        <select
          id="requests-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="book">За назвою книги</option>
          <option value="days-asc">Спочатку коротший термін</option>
          <option value="days-desc">Спочатку довший термін</option>
        </select>
      </FormField>

      <AppButton variant="secondary" onClick={onReset}>
        Скинути умови
      </AppButton>
    </div>
  )
}