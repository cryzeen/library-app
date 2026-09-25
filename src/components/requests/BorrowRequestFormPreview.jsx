import AppButton from '../ui/AppButton.jsx';
import FormField from '../ui/FormField.jsx';

export default function BorrowRequestFormPreview({ idPrefix, bookTitle }) {
  const titleId = `${idPrefix}-title`;
  const readerId = `${idPrefix}-reader`;
  const purposeId = `${idPrefix}-purpose`;
  const noticeId = `${idPrefix}-notice`;

  return (
    <form
      aria-label="Макет читацької заявки на видачу книги"
      aria-describedby={noticeId}
      onSubmit={(event) => event.preventDefault()}
      className="request-form"
    >
      <p id={noticeId} className="notice-box">
        Це макет для перевірки структури полів. Дані не зберігаються на сервері.
      </p>

      <FormField id={titleId} label="Обрана книга">
        <input
          id={titleId}
          name="bookTitle"
          value={bookTitle}
          readOnly
        />
      </FormField>

      <FormField id={readerId} label="Номер читацького квитка або ПІБ">
        <input
          id={readerId}
          name="readerInfo"
          placeholder="Введіть ПІБ або номер квитка"
          defaultValue=""
        />
      </FormField>

      <FormField
        id={purposeId}
        label="Мета замовлення / примітка"
        hint="Вкажіть термін або тип роботи (наприклад, для читального залу чи курсового проєкту)."
      >
        <textarea
          id={purposeId}
          name="purpose"
          rows={3}
          defaultValue=""
          aria-describedby={`${purposeId}-hint`}
        />
      </FormField>

      <div className="form-actions">
        <AppButton type="reset" variant="secondary">
          Очистити поля
        </AppButton>
        <AppButton disabled>Подати заявку (буде доступно пізніше)</AppButton>
      </div>
    </form>
  );
}