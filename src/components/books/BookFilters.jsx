import AppButton from '../ui/AppButton.jsx'
import FormField from '../ui/FormField.jsx'

export default function BookFilters({
  query,
  availableOnly,
  onQueryChange,
  onAvailableOnlyChange,
  onReset,
}) {
  return (
    <div className="catalog-filters">
      <FormField id="catalog-query" label="Пошук за назвою або автором">
        <input
          id="catalog-query"
          type="search"
          name="query"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>

      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(event) => onAvailableOnlyChange(event.target.checked)}
        />
        Лише доступні видання (у наявності)
      </label>

      <div style={{ marginTop: '0.75rem' }}>
        <AppButton variant="secondary" onClick={onReset}>
          Скинути фільтри
        </AppButton>
      </div>
    </div>
  )
}