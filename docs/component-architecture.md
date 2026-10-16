# Архітектура компонентів: Веб-сайт бази даних бібліотеки

## 1. Ієрархія компонентів
App (Routes)
 └── AppLayout (`/`)
      ├── SiteHeader
      │    └── MainNav (Link, NavLink)
      ├── main (id="main-content")
      │    └── BookSelectionProvider (Context API)
      │         └── Outlet
      │              ├── HomePage (`/`)
      │              ├── BookListPage / CatalogContainer (`/books`)
      │              │    ├── PageHeading
      │              │    └── Section (Пошук та вибір)
      │              │         ├── CatalogSummary
      │              │         ├── BookFilters (`useSearchParams`)
      │              │         └── BookList
      │              │              ├── BookCard (для кожного елемента)
      │              │              │    └── AvailabilityBadge
      │              │              └── EmptyState (якщо порожньо)
      │              ├── BookDetailsPage (`/books/:bookId`)
      │              │    ├── PageHeading
      │              │    └── AvailabilityBadge
      │              ├── BorrowRequestsLayout (`/loans`)
      │              │    ├── NavLink (навігація розділу)
      │              │    └── Outlet
      │              │         ├── BorrowRequestsPage (`/loans`)
      │              │         │    └── Table (список заявок)
      │              │         ├── BorrowRequestCreatePage (`/loans/new`)
      │              │         │    └── BorrowRequestPage
      │              │         │         ├── PageHeading
      │              │         │         ├── Section (Поля та підсумок)
      │              │         │         │    ├── AvailabilityBadge
      │              │         │         │    ├── BorrowRequestForm
      │              │         │         │    └── BorrowRequestSummary
      │              │         │         └── EmptyState
      │              │         └── BorrowRequestEditPage (`/loans/:requestId/edit`)
      │              │              └── BorrowRequestPage
      │              └── NotFoundPage (`*`)
      └── footer

## 2. Контракти ключових компонентів

| Компонент | Вхідні властивості (props) | Тип / Домовленість |
| :--- | :--- | :--- |
| `AppLayout` | `items` (масив книг) | Спільна оболонка застосунку з тегом `<main>`, навігацією та `BookSelectionProvider` |
| `BorrowRequestsLayout` | — | Вкладена оболонка розділу заявок з локальним меню навігації та елементом `<Outlet/>` |
| `PageHeading` | `title` (рядок) | Відображає заголовок `<h1>` та синхронізує `document.title` через `useEffect` |
| `MainNav` | `links` (масив об'єктів) | Використовує `NavLink` для додавання класу `active` та `aria-current="page"` |
| `Section` | `id` (рядок), `title` (рядок), `children` (вузли) | Унікальний `id` задає якір та зв'язується із заголовком `h2` через `aria-labelledby` |
| `BookListPage` | `items`, `selectedId`, `onSelect` | Відображає каталог із фільтрами у URL (`useSearchParams`) та списком карток |
| `BookDetailsPage` | `items` (масив книг) | Отримує `bookId` з `useParams`, виводить деталі видання або викликає `NotFoundPage` |
| `BorrowRequestsPage` | `requests` (масив), `items` (масив) | Таблиця демонстраційних заявок із посиланнями на редагування (`/loans/:requestId/edit`) |
| `BorrowRequestCreatePage`| `items` (масив книг) | Читає `bookId` з `useSearchParams`, формує нову заявку або показує `EmptyState` |
| `BorrowRequestEditPage`  | `requests` (масив), `items` (масив) | Читає `requestId` з `useParams`, передає початкові дані в `BorrowRequestPage` |
| `BorrowRequestPage` | `title`, `item`, `initialDraft`, `onCancel` | Універсальний редактор чернетки заявки зі спільним підсумком |
| `NotFoundPage` | `title` (рядок), `message` (рядок) | Обробка невідомих маршрутів (404) та відсутніх записів |
| `BookCard` | `item` (об'єкт Book) | Картка книги з посиланням `<Link>` на деталі `/books/:bookId` та кнопкою вибору |
| `AvailabilityBadge` | `available` (boolean) | Логічний статус для формування підпису наявності книги в бібліотеці |
| `AppButton` | `children`, `type`, `variant`, `disabled` | Варіанти стилізації: `primary` або `secondary`. За замовчуванням `type="button"` |

## 3. Обґрунтування рішень
1. **Клієнтська маршрутизація (`React Router`)**: Забезпечує переходи між сторінками без перезавантаження документа, зберігаючи стан програми в пам'яті та підтримуючи нативні кнопки браузера «Назад»/«Вперед».
2. **Фільтри в URL (`useSearchParams`)**: Дозволяють зберігати пошуковий запит `q` та прапорець `available` безпосередньо в адресному рядку браузера. Це надає можливість ділитися посиланням на відфільтровані результати.
3. **Вкладене компонування (`Outlet`)**: Використання `AppLayout` та `BorrowRequestsLayout` запобігає дублюванню шапки, навігації та підвалу між сторінками.
4. **Централізована обробка помилок (404)**: Сторінка `NotFoundPage` використовується як для неіснуючих URL-адрес (`*`), так і для випадків, коли книга чи заявка з вказаним ID відсутня в базі.

## 4. Керування станом та джерела URL-даних

### Карта стану та джерел даних

| Значення | Категорія | Джерело / Власник | Споживачі | Поведінка при оновленні сторінки |
| :--- | :--- | :--- | :--- | :--- |
| `books`, `requests` | Предметні дані | Модулі `src/data/` | Компоненти сторінок | Зберігаються (статичні файли) |
| `:bookId`, `:requestId` | Параметри шляху URL | `useParams` (`react-router`) | `BookDetailsPage`, `BorrowRequestEditPage` | Повністю відновлюються з URL |
| `q`, `available` | Пошукові параметри URL | `useSearchParams` (`react-router`) | `useBookFilters`, `BookListPage` | Повністю відновлюються з URL |
| `selectedId` | Спільний вибір сесії | `BookSelectionProvider` (Context API) | `CatalogContainer`, `BorrowRequestCreatePage` | Скидається до `null` |
| `draft` | Локальна чернетка | `useState` у `BorrowRequestPage` | `BorrowRequestForm`, `BorrowRequestSummary` | Скидається до початкових значень |
| `document.title` | Зовнішня синхронізація | `useEffect` у `PageHeading` | DOM браузера (вкладка) | Синхронізується згідно з заголовком |