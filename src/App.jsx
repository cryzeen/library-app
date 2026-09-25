import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import BorrowRequestPage from './pages/BorrowRequestPage.jsx';
import { books } from './data/books.js';

const navigationLinks = [
  { href: '#about', label: 'Про бібліотеку' },
  { href: '#catalog', label: 'Книжковий фонд' },
  { href: '#request', label: 'Оформлення заявки' },
];

export default function App() {
  // Для статичної демонстрації беремо першу книгу з наявного каталогу
  const sampleBook = books[0];

  return (
    <AppLayout title="Бібліотека" links={navigationLinks}>
      <HomePage />
      <BorrowRequestPage item={sampleBook} />
    </AppLayout>
  );
}