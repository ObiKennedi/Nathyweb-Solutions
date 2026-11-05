import { ArrowUp, Mail, MessageCircle, Phone } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { CONTACT, SOCIALS } from '../../../siteConfig';
import './index.scss';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Website design', href: '#services' },
      { label: 'Web applications', href: '#services' },
      { label: 'Mobile apps', href: '#services' },
      { label: 'UI/UX design', href: '#services' },
      { label: 'E-commerce', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const socials = [
  { href: SOCIALS.instagram, label: 'Instagram', Icon: FaInstagram },
  { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: SOCIALS.x, label: 'X', Icon: FaXTwitter },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a href="/" className="site-footer__logo" aria-label="NathWebSolutions home">
              <img src="/nws-mark.png" alt="" width="240" height="158" />
              <span>
                NathWeb<span>Solutions</span>
              </span>
            </a>
            <p className="site-footer__descriptor">Web • Software • Digital Solutions</p>
            <p className="site-footer__tagline">Bringing Your Vision to Reality.</p>
            <ul className="site-footer__socials">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="site-footer__col" aria-label={col.title}>
              <h2 className="site-footer__heading">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="site-footer__col site-footer__col--contact">
            <h2 className="site-footer__heading">Get in touch</h2>
            <ul>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="site-footer__contact">
                  <Phone strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.phoneLabel}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="site-footer__contact">
                  <MessageCircle strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="site-footer__contact">
                  <Mail strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <a href="#contact" className="btn btn--primary site-footer__cta">
              Start a project
            </a>
          </div>
        </div>

        <p className="site-footer__wordmark" aria-hidden="true">
          NathWebSolutions
        </p>

        <div className="site-footer__bottom">
          <p>© {year} NathWebSolutions. All rights reserved.</p>
          <button type="button" className="site-footer__top-btn" onClick={toTop}>
            Back to top <ArrowUp strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}