import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <>
      <header className="site-header">
        <span className="logo">Бібліотека</span>
        <nav aria-label="Основна навігація">
          <a href="#about">Про бібліотеку</a>
          <a href="#catalog">Каталог</a>
        </nav>
      </header>
      <main>
        <HomePage />
      </main>
      <footer>
        <p>Навчальний проєкт. База даних бібліотеки.</p>
      </footer>
    </>
  )
}