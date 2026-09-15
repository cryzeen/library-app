# Веб-сайт бази даних бібліотеки (Тема №22)

Каталог книжкового фонду та система формування читацьких заявок.
Поточний етап (Лабораторна робота 1.1): налаштування інструментів розробки, контейнеризація Docker та початковий інтерфейс каталогу книг із локальними даними.

## Середовище розробки
- **ОС:** Windows 11 (Варіант А: нативна розробка + Docker Desktop)
- **Node.js:** v26.8.2
- **npm:** 11.19.1
- **Git:** 2.55.0
- **Docker Desktop:** v29.8.0 / Docker Compose v2

## Запуск проєкту

### 1. Нативний запуск (локально)
```powershell
npm install
npm run dev
```
Адреса сервісу: http://localhost:5173

### 2. Запуск в ізольованому контейнері Docker
```powershell
docker compose build
docker compose run --rm web npm install
docker compose up
```
Адреса сервісу: http://localhost:5173

Зупинка контейнера:
```powershell
docker compose down
```

## Виробнича збірка (Production Build)
Перевірка генерації статичного бандла та працездатності preview-сервера:
```powershell
npm run build
npm run preview
```

## Структура та план розвитку
- `docs/project-plan.md` — опис функціональних вимог, сутностей предметної області та запланованих сторінок.
- `src/data/books.js` — початкова вибірка книг каталогу.
- `src/components/BookCard.jsx` — компонент картки видання зі статусом доступності.
- `src/pages/HomePage.jsx` — головна сторінка каталогу бібліотеки.