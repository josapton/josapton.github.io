import { useLanguage } from '../context/LanguageContext'
import { en } from '../locales/en'
import { id } from '../locales/id'

export default function Footer() {
  const { lang } = useLanguage()
  const t = lang === 'en' ? en : id

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-text">
          <span className="terminal-prompt">$</span> echo "&copy;{new Date().getFullYear()} josapton"
        </p>
        <p className="footer-subtext">
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  )
}
