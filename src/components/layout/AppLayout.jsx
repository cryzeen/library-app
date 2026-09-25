import SiteHeader from './SiteHeader.jsx';

export default function AppLayout({ title, links, children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <SiteHeader title={title} links={links} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        Навчальний проєкт. Електронний каталог бібліотеки та читацькі заявки.
      </footer>
    </>
  );
}