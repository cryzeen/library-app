# Веб-сайт бази даних бібліотеки (Тема №22)

Каталог книжкового фонду та система формування читацьких заявок.
Поточний етап (Лабораторна робота 1.2): розроблення компонентної архітектури, виділення спільного компонування, усунення дублювання правил подання статусів та реалізація макета форми замовлення книги.

## Середовище розробки
- **ОС:** Windows 11 (Варіант А: нативна розробка + Docker Desktop)
- **Node.js:** v24.21.0
- **npm:** 11.19.0
- **Git:** 2.55.0.windows.5
- **Docker:** 29.8.0 (build 88096ef)

## Запуск проєкту

### 1. Нативний запуск (локально)
npm install
npm run dev


Адреса сервісу: http://localhost:5173

### 2. Запуск в ізольованому контейнері Docker
docker compose build
docker compose run --rm web npm install
docker compose up


Адреса сервісу: http://localhost:5173

Зупинка контейнера:
docker compose down


## Виробнича збірка (Production Build)
Перевірка генерації статичного бандла та працездатності preview-сервера:
npm run build
npm run preview


## Архітектура та структура файлів (Л 1.2)
- `docs/project-plan.md` — опис сценаріїв, моделей даних та етапів розвитку.
- `docs/component-architecture.md` — ієрархія компонентів, контракти props та обґрунтування рішень.
- `src/data/books.js` — локальний масив книжкового фонду.
- `src/components/layout/` — спільне компонування (`AppLayout.jsx`, `SiteHeader.jsx`).
- `src/components/navigation/` — навігація (`MainNav.jsx`).
- `src/components/books/` — предметні компоненти каталогу (`BookList.jsx`, `BookCard.jsx`, `AvailabilityBadge.jsx`, `CatalogSummary.jsx`).
- `src/components/requests/` — макет форми заявки (`BorrowRequestFormPreview.jsx`).
- `src/components/ui/` — повторно використовувані UI-компоненти (`Section.jsx`, `EmptyState.jsx`, `AppButton.jsx`, `FormField.jsx`).
- `src/pages/` — сторінкові компоненти (`HomePage.jsx`, `BorrowRequestPage.jsx`).