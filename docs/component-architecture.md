# Архітектура компонентів: Веб-сайт бази даних бібліотеки

## 1. Ієрархія компонентів та сервісного шару
App (Routes)
 └── AppLayout (`/`)
      ├── SiteHeader
      │    └── MainNav (Link, NavLink)
      ├── main (id="main-content")
      │    └── BookSelectionProvider (Context API)
      │         └── RequestsProvider (знімок колекції, стани операцій, синхронізація)
      │              └── Outlet
      │                   ├── HomePage (`/`)
      │                   ├── CatalogContainer / BookListPage (`/books`)
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
      │                   │    └── RequestsGate (стани `loading` / `error` / повтор читання)
      │                   │         └── Outlet
      │                   │              ├── RequestsPage (`/loans`)
      │                   │              │    ├── RequestFilters (`useRequestFilters`)
      │                   │              │    ├── RequestTable
      │                   │              │    └── EmptyState (порожня колекція або відсутність збігів)
      │                   │              ├── RequestCreatePage (`/loans/new`)
      │                   │              │    └── RequestPage
      │                   │              │         ├── PageHeading
      │                   │              │         ├── Section (Поля та підсумок)
      │                   │              │         │    ├── AvailabilityBadge
      │                   │              │         │    ├── RequestForm (`fieldset`, `FormField`)
      │                   │              │         │    └── RequestSummary
      │                   │              │         └── AppButton
      │                   │              ├── RequestDetailsPage (`/loans/:requestId`)
      │                   │              │    ├── PageHeading
      │                   │              │    └── AppButton (асинхронне видалення з підтвердженням)
      │                   │              └── RequestEditPage (`/loans/:requestId/edit`)
      │                   │                   └── RequestPage
      │                   └── NotFoundPage (`*`)
      └── footer

Схема залежностей шару даних:
Сторінки та форми → `RequestsProvider` / хуки → `requestService` → `mockRequestService` або `apiRequestService` → `localStorage` або зовнішній REST API.

## 2. Межі відповідальності інтерфейсу, провайдера та сервісів

| Шар / Модуль | Відповідальність | Чого не повинен знати |
| :--- | :--- | :--- |
| `RequestForm` | Керовані поля, відображення помилок, блокування `fieldset` під час подання | URL, HTTP-методи, ключі `localStorage` |
| Маршрутні сторінки (`Request*Page`) | Параметри URL, сценарій переходу після підтвердженого успіху, захист від переходу закритої сторінки | Формат мережевого пакета, деталі адаптера |
| `RequestsProvider` | Знімок колекції, стани `loading` / `success` / `error`, `isMutating`, захист від застарілих відповідей | Внутрішній спосіб збереження всередині адаптера |
| `requestService` | Єдина точка вибору реалізації джерела за `VITE_DATA_SOURCE` | JSX, маршрутизація, навігація |
| `mockRequestService` / `apiRequestService` | Читання, запис, перетворення зовнішнього формату, помилки `ServiceError` | Стан полів форми, сповіщення UI |
| `requestValidation` / `requestContract` | Предметні правила, нормалізація вхідних полів та перевірка структури записів | React, мережа, сховище |

## 3. Контракти ключових компонентів

| Компонент | Вхідні властивості (props) | Тип / Домовленість |
| :--- | :--- | :--- |
| `AppLayout` | `items` (масив книг) | Спільна оболонка застосунку з `<main>`, навігацією, `BookSelectionProvider` та `RequestsProvider` |
| `RequestsProvider` | `children` | Керує знімком заявок, викликає `requestService`, надає `status`, `error`, `reload`, `isMutating`, CRUD-методи |
| `RequestsGate` | `children` | Блокує рендер дочірніх маршрутів розділу заявок під час `loading` або виводить `error` із кнопкою повтору |
| `BorrowRequestsLayout` | — | Вкладена оболонка розділу заявок із локальним меню, `RequestNotice` та `<RequestsGate><Outlet/></RequestsGate>` |
| `RequestNotice` | — | Зчитує `notice` із `useRequests` та відображає системне сповіщення про підтверджену операцію |
| `RequestsPage` | `items` (масив книг) | Відображає кнопку ручного оновлення (`reload`), URL-фільтри `useRequestFilters` та таблицю заявок |
| `RequestTable` | `requests`, `items`, `onDelete`, `isMutating` | Таблиця заявок із блокуванням кнопок видалення під час виконання мутації |
| `RequestCreatePage` | `items` (масив книг) | Читає `bookId` з URL, очікує `await createRequest(input)` та переходить до деталей після підтвердження |
| `RequestEditPage` | `items` (масив книг) | Читає `requestId` з URL, відстежує актуальний `activeId` та очікує `await updateRequest(...)` |
| `RequestDetailsPage` | `items` (масив книг) | Відображає заявку зі знімка провайдера та виконує асинхронне видалення з підтвердженням |
| `RequestPage` | `title`, `book`, `initialDraft`, `onSave`, `onCancel`, `submitLabel`, `cancelLabel` | Спільний редактор чернетки з асинхронним `handleSubmit`, блокуванням повторного подання та збереженням введення при відмові |
| `RequestForm` | `idPrefix`, `bookTitle`, `draft`, `errors`, `operationError`, `isSubmitting`, `onChange`, `onBlur`, `onSubmit`, `onReset`, `submitLabel` | Керована форма з `fieldset disabled={isSubmitting}`, `aria-busy` та `aria-invalid` |
| `useRequestRecord` | `id` (рядок) | Хук точкового читання через `requestService.getById` із `AbortController`, захистом від застарілого `id` та `retry` |

## 4. Керування станом та джерела даних

| Значення | Категорія | Джерело / Власник | Споживачі | Поведінка при оновленні сторінки |
| :--- | :--- | :--- | :--- | :--- |
| `books` | Довідник (статичний) | Модуль `src/data/books.js` | Каталог, деталі книги, валідація заявок | Зберігається (статичний модуль) |
| `requests` | Підтверджений знімок | `RequestsProvider` (через `requestService`) | `RequestsPage`, `RequestDetailsPage`, `RequestEditPage` | Перечитується з джерела (`localStorage` у режимі `mock`) |
| `status` / `error` | Стан читання | `RequestsProvider` | `RequestsGate` | Починається зі стану `loading` до завершення `getAll` |
| `isMutating` | Стан запису | `RequestsProvider` | `RequestsPage`, `RequestTable`, `RequestDetailsPage` | Скидається у `false` |
| `draft` | Локальна чернетка | `useState` у `RequestPage` | `RequestForm`, `RequestSummary` | Скидається до початкових значень; зберігається при відмові запису |
| `selectedId` | Спільний вибір сесії | `BookSelectionProvider` | `CatalogContainer`, `RequestCreatePage` | Скидається до `null` |
| `:bookId`, `:requestId` | Параметри шляху URL | `useParams` (`react-router`) | `BookDetailsPage`, `RequestDetailsPage`, `RequestEditPage` | Повністю відновлюються з URL |
| `q`, `readingRoom`, `sort` | Параметри списку заявок | `useSearchParams` (`react-router`) | `useRequestFilters`, `RequestsPage` | Повністю відновлюються з URL |

## 5. Контракт асинхронного сервісу (`requestService`)

Усі помилки рівня даних нормалізуються до екземплярів `ServiceError` із кодами `VALIDATION`, `BAD_DATA`, `NOT_FOUND`, `MOCK_FAILURE`, `STORAGE_READ`, `STORAGE_WRITE`, `NETWORK`, `HTTP`, `CONFIG`.

| Метод | Параметри | Успішний результат (`Promise`) | Поведінка при відмові |
| :--- | :--- | :--- | :--- |
| `getAll({ signal })` | Об'єкт із `AbortSignal` | Масив нормалізованих записів `BorrowRequest[]` | Відхиляє `ServiceError` або `AbortError` при скасуванні |
| `getById(id, { signal })` | `id` (рядок), `{ signal }` | Одиничний об'єкт `BorrowRequest` | Відхиляє `ServiceError` (`code: 'NOT_FOUND'`) або `AbortError` |
| `create(input)` | Об'єкт полів без `id` | Повний створений запис із призначеним `id` | Відхиляє `ServiceError` (`VALIDATION` або помилка запису/мережі) |
| `update(id, input)` | `id` (рядок), усі редаговані поля | Повний оновлений запис із незмінним `id` | Відхиляє `ServiceError` (`VALIDATION`, `NOT_FOUND` або збій запису) |
| `delete(id)` | `id` (рядок) | `undefined` після підтвердження джерелом | Відхиляє `ServiceError` (`NOT_FOUND` або збій видалення) |

На рівні `RequestsProvider` результати мутацій перетворюються на формат `{ ok: true, record }` або `{ ok: false, message, errors, code }` для узгодженої роботи з формами та сторінками.