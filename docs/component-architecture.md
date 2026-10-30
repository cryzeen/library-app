# Архітектура компонентів: Веб-сайт бази даних бібліотеки

## 1. Ієрархія компонентів
App (Routes)
 └── AppLayout (`/`)
      ├── SiteHeader
      │    └── MainNav (Link, NavLink)
      ├── main (id="main-content")
      │    └── BookSelectionProvider (Context API)
      │         └── RequestsProvider (Context API)
      │              └── Outlet
      │                   ├── HomePage (`/`)
      │                   ├── BookListPage / CatalogContainer (`/books`)
      │                   │    ├── PageHeading
      │                   │    └── Section (Пошук та вибір)
      │                   │         ├── CatalogSummary
      │                   │         ├── BookFilters (`useSearchParams`)
      │                   │         └── BookList
      │                   │              ├── BookCard (для кожного елемента)
      │                   │              │    └── AvailabilityBadge
      │                   │              └── EmptyState (якщо порожньо)
      │                   ├── BookDetailsPage (`/books/:bookId`)
      │                   │    ├── PageHeading
      │                   │    └── AvailabilityBadge
      │                   ├── BorrowRequestsLayout (`/loans`)
      │                   │    ├── NavLink (навігація розділу)
      │                   │    ├── RequestNotice (`useRequests`)
      │                   │    └── Outlet
      │                   │         ├── RequestsPage (`/loans`)
      │                   │         │    ├── RequestFilters (`useRequestFilters`)
      │                   │         │    ├── RequestTable
      │                   │         │    └── EmptyState (якщо немає заявок чи збігів)
      │                   │         ├── RequestCreatePage (`/loans/new`)
      │                   │         │    └── RequestPage
      │                   │         │         ├── PageHeading
      │                   │         │         ├── Section (Поля та підсумок)
      │                   │         │         │    ├── AvailabilityBadge
      │                   │         │         │    ├── RequestForm (`FormField`)
      │                   │         │         │    └── RequestSummary
      │                   │         │         └── AppButton
      │                   │         ├── RequestDetailsPage (`/loans/:requestId`)
      │                   │         │    ├── PageHeading
      │                   │         │    └── AppButton (видалення з підтвердженням)
      │                   │         └── RequestEditPage (`/loans/:requestId/edit`)
      │                   │              └── RequestPage
      │                   │                   ├── PageHeading
      │                   │                   ├── Section (Поля та підсумок)
      │                   │                   │    ├── AvailabilityBadge
      │                   │                   │    ├── RequestForm (`FormField`)
      │                   │                   │    └── RequestSummary
      │                   │                   └── AppButton
      │                   └── NotFoundPage (`*`)
      └── footer

## 2. Контракти ключових компонентів

| Компонент | Вхідні властивості (props) | Тип / Домовленість |
| :--- | :--- | :--- |
| `AppLayout` | `items` (масив книг) | Спільна оболонка застосунку з тегом `<main>`, навігацією, `BookSelectionProvider` та `RequestsProvider` |
| `BorrowRequestsLayout` | — | Вкладена оболонка розділу заявок з локальним меню навігації, `RequestNotice` та елементом `<Outlet/>` |
| `RequestNotice` | — | Зчитує `notice` із `useRequests` та відображає системне сповіщення про успішну операцію над колекцією |
| `PageHeading` | `title` (рядок) | Відображає заголовок `<h1>` та синхронізує `document.title` через `useEffect` |
| `MainNav` | `links` (масив об'єктів) | Використовує `NavLink` для додавання класу `active` та `aria-current="page"` |
| `Section` | `id` (рядок), `title` (рядок), `children` (вузли) | Унікальний `id` задає якір та зв'язується із заголовком `h2` через `aria-labelledby` |
| `BookListPage` | `items`, `selectedId`, `onSelect` | Відображає каталог із фільтрами у URL (`useSearchParams`) та списком карток |
| `BookDetailsPage` | `items` (масив книг) | Отримує `bookId` з `useParams`, виводить деталі видання або викликає `NotFoundPage` |
| `RequestsPage` | `items` (масив книг) | Читає колекцію заявок з `useRequests`, застосовує URL-фільтри `useRequestFilters` та рендерить таблицю |
| `RequestFilters` | `query`, `readingRoom`, `sort`, `onQueryChange`, `onReadingRoomChange`, `onSortChange`, `onReset` | Керовані елементи пошуку, фільтрації за форматом видачі та впорядкування заявок |
| `RequestTable` | `requests` (масив), `items` (масив), `onDelete` | Таблиця заявок із посиланнями на перегляд, редагування та кнопкою вилучення запису |
| `RequestCreatePage` | `items` (масив книг) | Читає `bookId` з `useSearchParams`, викликає `createRequest` та відкриває створені деталі |
| `RequestEditPage` | `items` (масив книг) | Читає `requestId` з `useParams`, заповнює початкові поля та викликає `updateRequest` |
| `RequestDetailsPage` | `items` (масив книг) | Читає `requestId` з `useParams`, відображає збережений запис та викликає `useDeleteRequest` |
| `RequestPage` | `title`, `book`, `initialDraft`, `onSave`, `onCancel`, `submitLabel`, `cancelLabel` | Спільний редактор чернетки заявки з керуванням помилками та підтвердженням виходу |
| `RequestForm` | `idPrefix`, `bookTitle`, `draft`, `errors`, `operationError`, `onChange`, `onBlur`, `onSubmit`, `onReset`, `submitLabel` | Керована форма з підказками, відображенням помилок валідації та атрибутами `aria-invalid` |
| `RequestSummary` | `bookTitle` (рядок), `draft` (об'єкт) | Інформаційний підсумок введених полів чернетки замовлення в режимі реального часу |
| `FormField` | `id`, `label`, `hint`, `error`, `children` | Забезпечує доступність: зв'язує підпис через `htmlFor`, підказку через `aria-describedby` та помилку |
| `NotFoundPage` | `title` (рядок), `message` (рядок) | Обробка невідомих маршрутів (404) та відсутніх записів у колекціях |
| `BookCard` | `item` (об'єкт Book) | Картка книги з посиланням `<Link>` на деталі `/books/:bookId` та кнопкою вибору |
| `AvailabilityBadge` | `available` (boolean) | Логічний статус для формування підпису наявності книги в бібліотеці |
| `AppButton` | `children`, `type`, `variant`, `disabled` | Варіанти стилізації: `primary` або `secondary`. За замовчуванням `type="button"` |

## 3. Обґрунтування рішень
1. **Спільна локальна колекція (`RequestsProvider`)**: Забезпечує єдине джерело правди для списку, деталей та редактора. Збереження створює нові або змінює наявні об'єкти в пам'яті клієнта без безпосередньої мутації вихідного масиву `requests.js`.
2. **Розділення чернетки й збереженого запису**: Форма працює з локальною копією полів (`draft`). Зміни у формі відображаються у списку та деталях лише після успішного виконання операції `createRequest` або `updateRequest`.
3. **Чиста валідація (`validateBorrowRequest`)**: Єдина функція валідації використовується як у формі редагування, так і всередині методів провайдера. Це запобігає збереженню некоректних даних та гарантує однакове дотримання предметних правил.
4. **Синхронізація фільтрів списку з URL (`useRequestFilters`)**: Параметри пошуку `q`, відбору `readingRoom` та сортування `sort` зберігаються безпосередньо в адресному рядку сторінки `/loans`.
5. **Підтвердження руйнівних дій (`useDeleteRequest`)**: Видалення запису здійснюється за стабільним `id` після явного підтвердження користувача у вікні `window.confirm`.

## 4. Керування станом та джерела URL-даних

### Карта стану та джерел даних

| Значення | Категорія | Джерело / Власник | Споживачі | Поведінка при оновленні сторінки |
| :--- | :--- | :--- | :--- | :--- |
| `books` | Предметні дані | Модуль `src/data/books.js` | Всі сторінки каталогу | Зберігаються (статичний модуль) |
| `requests` | Спільна колекція | `RequestsProvider` (Context API) | `RequestsPage`, `RequestDetailsPage`, `RequestEditPage` | Відновлюється до початкових записів із `src/data/requests.js` |
| `draft` | Локальна чернетка | `useState` у `RequestPage` | `RequestForm`, `RequestSummary` | Скидається до початкових значень |
| `touched` / `attempted` | Стан валідації | `useState` у `RequestPage` | `RequestForm` | Визначає видимість повідомлень про помилки біля полів |
| `notice` | Системне сповіщення | `RequestsProvider` | `RequestNotice` | Текст останньої успішної операції над колекцією |
| `selectedId` | Спільний вибір сесії | `BookSelectionProvider` (Context API) | `CatalogContainer`, `RequestCreatePage` | Скидається до `null` |
| `:bookId`, `:requestId` | Параметри шляху URL | `useParams` (`react-router`) | `BookDetailsPage`, `RequestDetailsPage`, `RequestEditPage` | Повністю відновлюються з URL |
| `q`, `available` | Пошукові параметри URL | `useSearchParams` (`react-router`) | `useBookFilters`, `BookListPage` | Повністю відновлюються з URL |
| `q`, `readingRoom`, `sort` | Параметри списку заявок | `useSearchParams` (`react-router`) | `useRequestFilters`, `RequestsPage` | Повністю відновлюються з URL |
| `document.title` | Зовнішня синхронізація | `useEffect` у `PageHeading` | DOM браузера (вкладка) | Синхронізується згідно з заголовком |

## 5. Контракт синхронних CRUD-операцій (`RequestsProvider`)

| Операція | Вхідні дані | Успішний результат (`ok: true`) | Невдалий результат (`ok: false`) |
| :--- | :--- | :--- | :--- |
| `createRequest` | Об'єкт полів заявки | `{ ok: true, record: { id, ...value } }` | `{ ok: false, errors: { ... } }` |
| `updateRequest` | `id`, об'єкт полів | `{ ok: true, record: { id, ...value } }` | `{ ok: false, message / errors }` |
| `deleteRequest` | `id` | `{ ok: true }` | `{ ok: false, message }` |
| `validateBorrowRequest` | `input`, `books` | `{ ok: true, value: { ... } }` | `{ ok: false, errors: { ... } }` |