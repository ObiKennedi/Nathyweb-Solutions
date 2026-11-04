import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Code2, Layers, Monitor, Smartphone } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './index.scss';

const SCROLL_THRESHOLD = 24;

const services = [
  { href: '#services', title: 'Website design', desc: 'Fast, conversion-focused marketing sites.', Icon: Monitor },
  { href: '#services', title: 'Web applications', desc: 'Dashboards, portals and SaaS products.', Icon: Code2 },
  { href: '#services', title: 'Mobile apps', desc: 'iOS and Android apps built to scale.', Icon: Smartphone },
  { href: '#services', title: 'UI/UX design', desc: 'Research, wireframes and design systems.', Icon: Layers },
];

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { href: 'https://instagram.com/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://linkedin.com/', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://x.com/', label: 'X', Icon: FaXTwitter },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  // Swap for useLocation().pathname if you use React Router
  const [activeHash, setActiveHash] = useState(
    typeof window !== 'undefined' ? window.location.hash || '#hero' : '#hero'
  );

  // Sync active section on hashchange and scroll
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    const onScrollSpy = () => {
      const sectionIds = ['hero', 'services', 'work', 'process', 'about', 'contact'];
      const scrollPos = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveHash(`#${sectionIds[i]}`);
          break;
        }
      }
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', onScrollSpy);
    };
  }, []);

  // Transparent until the page scrolls past the threshold
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; Esc closes everything
  useEffect(() => {
    document.documentElement.classList.toggle('has-menu-open', menuOpen);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('has-menu-open');
    };
  }, [menuOpen]);

  // Close the mobile menu if the screen grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Click outside closes the services dropdown
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e) => {
      if (!servicesRef.current?.contains(e.target)) setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [servicesOpen]);

  const solid = scrolled || menuOpen;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${solid ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <a href="#hero" className="site-header__brand" aria-label="NathWeb Solutions home" onClick={closeMenu}>
          <img className="site-header__mark" src="/nws-mark.png" alt="" width={240} height={158} />
          <span className="site-header__wordmark">
            NathWeb<span>Solutions</span>
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          <ul className="site-header__list">
            <li
              className="site-header__item"
              ref={servicesRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="site-header__link"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
              >
                Services
                <ChevronDown className="site-header__chevron" strokeWidth={2} aria-hidden="true" />
              </button>
              <ul id="services-menu" className={`site-header__dropdown${servicesOpen ? ' site-header__dropdown--open' : ''}`}>
                {services.map(({ href, title, desc, Icon }) => (
                  <li key={href}>
                    <a href={href} className="site-header__dropdown-link" onClick={() => { setServicesOpen(false); closeMenu(); }}>
                      <span className="site-header__dropdown-icon">
                        <Icon strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="site-header__dropdown-title">{title}</span>
                        <span className="site-header__dropdown-desc">{desc}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {links.map((l) => (
              <li key={l.href} className="site-header__item">
                <a href={l.href} className="site-header__link" aria-current={activeHash === l.href ? 'page' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href="#contact" className="btn btn--primary site-header__cta">
            Start a project <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* Three bars that morph into an X (pure CSS) */}
            <span className="site-header__toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`site-header__mobile${menuOpen ? ' site-header__mobile--open' : ''}`}>
        <ul className="site-header__mobile-list">
          <li>
            <a href="#services" className="site-header__mobile-link" aria-current={activeHash === '#services' ? 'page' : undefined} onClick={closeMenu}>Services</a>
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="site-header__mobile-link"
                aria-current={activeHash === l.href ? 'page' : undefined}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn--primary btn--lg" onClick={closeMenu}>
          Start a project <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
        </a>
        <div className="site-header__mobile-meta">
          <ul className="site-header__socials">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p>
            Web • Software • Digital Solutions
            <br />
            <a href="https://nathwebsolutions.com">nathwebsolutions.com</a>
          </p>
        </div>
      </div>
    </header>
  );
}