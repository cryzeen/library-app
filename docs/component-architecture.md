# Архітектура компонентів: Веб-сайт бази даних бібліотеки

## 1. Ієрархія компонентів
App
 └── AppLayout
      ├── SiteHeader
      │    └── MainNav
      ├── main (id="main-content")
      │    ├── HomePage
      │    │    ├── Section (Про бібліотеку)
      │    │    └── Section (Книжковий фонд)
      │    │         ├── CatalogSummary
      │    │         └── BookList
      │    │              ├── BookCard (для кожного елемента)
      │    │              │    └── AvailabilityBadge
      │    │              └── EmptyState (якщо список порожній)
      │    └── BorrowRequestPage
      │         └── Section (Оформлення замовлення книги)
      │              ├── AvailabilityBadge
      │              ├── BorrowRequestFormPreview
      │              │    ├── FormField (обрана книга, input readOnly)
      │              │    ├── FormField (читацький квиток, input)
      │              │    ├── FormField (мета замовлення, textarea)
      │              │    └── AppButton (скидання та неактивна дія)
      │              └── EmptyState (якщо книгу не передано)
      └── footer

## 2. Контракти ключових компонентів

| Компонент | Вхідні властивості (props) | Тип / Домовленість |
| :--- | :--- | :--- |
| `AppLayout` | `title` (рядок), `links` (масив), `children` (вузли) | Створює спільну оболонку застосунку з єдиним тегом `<main>` та навігацією |
| `Section` | `id` (рядок), `title` (рядок), `children` (вузли) | Унікальний `id` задає якір та зв'язується із заголовком `h2` через `aria-labelledby` |
| `BookList` | `items` (масив об'єктів) | Обов'язковий масив книг. За умови `items.length === 0` відображає `EmptyState` |
| `BookCard` | `item` (об'єкт Book) | Приймає валідний запис книги (`title`, `author`, `genre`, `year`, `isAvailable`) |
| `AvailabilityBadge` | `available` (boolean) | Логічний статус для формування підпису наявності книги в бібліотеці |
| `BorrowRequestPage` | `item` (об'єкт Book або undefined) | Допускає відсутність обраної книги та показує відповідний `EmptyState` |
| `FormField` | `id` (рядок), `label` (рядок), `hint` (рядок, опц.), `children` | Зв'язує підпис із полем через `htmlFor` та підказку через `aria-describedby` |
| `BorrowRequestFormPreview` | `idPrefix` (рядок), `bookTitle` (рядок) | Префікс для унікальності ідентифікаторів полів; макет без відправки даних |
| `AppButton` | `children`, `type`, `variant`, `disabled` | Варіанти стилізації: `primary` або `secondary`. За замовчуванням `type="button"` |

## 3. Обґрунтування рішень
1. **Усунення дублювання правил подання (`AvailabilityBadge`)**: Відображення статусу примірника («В наявності» / «Видана читачу») винесено в окремий предметний компонент, спільний для карток каталогу та блоку читацької заявки.
2. **Композиція через children (`Section`, `FormField`)**: Виключає надлишкові прапорці конфігурації. `Section` інкапсулює доступність та розмітку секції, а сторінки передають необхідний зміст.
3. **Захист від порожніх даних (`EmptyState`)**: Компоненти `BookList` та `BorrowRequestPage` коректно обробляють відсутність даних без аварійного завершення рендерингу.

## 4. Керування станом та контракти взаємодії

### Карта стану

| Значення | Категорія | Власник стану | Споживачі | Дія скидання |
| :--- | :--- | :--- | :--- | :--- |
| `books` | Початкові предметні дані | Модуль `src/data/books.js` | `App`, провайдер, `BookList` | Не скидається (статичні дані) |
| `detailsOpen` | Локальний стан UI | Конкретна `BookCard` | `BookCard` | Демонтування або повторний клік |
| `query`, `availableOnly` | Стан фільтрів каталогу | `HomePage` (хук `useBookFilters`) | `BookFilters`, `BookList` | Виклик `resetFilters` |
| `selectedId` | Спільний стан вибору | `BookSelectionProvider` (Context API) | `CatalogContainer`, `BorrowRequestContainer` | Виклик `clearSelection` |
| `draft` | Локальна чернетка замовлення | `BorrowRequestPage` | `BorrowRequestForm`, `BorrowRequestSummary` | Виклик `handleReset` або зміна книги |
| `visibleItems` | Похідний список (без `useState`) | Обчислюється під час рендеру | `BookList`, лічильник результатів | Автоматично при зміні `query` / `availableOnly` |
| `selectedItem` | Похідний предмет (без `useState`) | Обчислюється в провайдері | `BorrowRequestContainer` | Автоматично при зміні `selectedId` |
| `document.title` | Зовнішня синхронізація | `useEffect` у `BorrowRequestPage` | DOM браузера (вкладка) | Очищення ефекту при зміні залежності / демонтажі |

### Розширені контракти взаємодії (Callback-функції)
- `onSelect(bookId)`: `BookCard` -> передає ідентифікатор книги для збереження вибору у провайдері.
- `onQueryChange(text)`: `BookFilters` -> передає введений рядок для оновлення пошукового стану `query`.
- `onAvailableOnlyChange(flag)`: `BookFilters` -> передає булевий стан для фільтрації лише доступних видань.
- `onReset()`: `BookFilters` -> ініціює очищення параметрів пошуку та доступності.
- `onTicketNumberChange(val)`: `BorrowRequestForm` -> передає номер квитка для оновлення `draft.ticketNumber`.
- `onPurposeChange(val)`: `BorrowRequestForm` -> передає текст мети для оновлення `draft.purpose`.
- `onReadingRoomOnlyChange(flag)`: `BorrowRequestForm` -> змінює прапорець замовлення лише в читальний зал.
- `onClearSelection()`: `BorrowRequestPage` -> передає сигнал для скидання вибору (`selectedId = null`).