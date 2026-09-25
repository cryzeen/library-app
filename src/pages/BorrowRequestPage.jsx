import Section from '../components/ui/Section.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import AvailabilityBadge from '../components/books/AvailabilityBadge.jsx';
import BorrowRequestFormPreview from '../components/requests/BorrowRequestFormPreview.jsx';

export default function BorrowRequestPage({ item }) {
  return (
    <Section id="request" title="Оформлення замовлення книги">
      {item ? (
        <>
          <p className="request-preview-meta">
            Приклад заявки для видання: <strong>«{item.title}»</strong> ({item.author}) —{' '}
            <AvailabilityBadge available={item.isAvailable} />
          </p>
          <BorrowRequestFormPreview
            idPrefix="borrow-preview"
            bookTitle={`${item.title} (${item.author})`}
          />
        </>
      ) : (
        <EmptyState title="Книгу для оформлення заявки не обрано.">
          <p><a href="#catalog">Перейти до каталогу для вибору видання</a></p>
        </EmptyState>
      )}
    </Section>
  );
}