import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'

export default function HomePage() {
  return (
    <>
      <PageHeading title="Електронна бібліотека" />
      <p>Ласкаво просимо до бази даних книжкового фонду.</p>
      <p>Переглядайте доступні видання та оформлюйте читацькі заявки.</p>
      <p><Link to="/books">Перейти до каталогу книг</Link></p>
      <p><Link to="/loans">Переглянути заявки</Link></p>
    </>
  )
}