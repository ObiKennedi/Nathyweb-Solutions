import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Gauge,
  Layers,
  Monitor,
  ShoppingBag,
  Smartphone,
} from 'lucide-react';
import './index.scss';

const services = [
  {
    id: 'websites',
    Icon: Monitor,
    title: 'Website design & development',
    desc: 'Fast, responsive marketing sites built to turn visitors into enquiries. Designed around your brand, written to rank, easy for your team to update.',
    tags: ['Business sites', 'Landing pages', 'CMS', 'SEO-ready'],
    href: '#contact',
    featured: true,
  },
  {
    id: 'web-apps',
    Icon: Code2,
    title: 'Web applications',
    desc: 'Dashboards, client portals and SaaS products with secure logins, payments and the integrations your business runs on.',
    tags: ['SaaS', 'Portals', 'APIs'],
    href: '#contact',
  },
  {
    id: 'mobile',
    Icon: Smartphone,
    title: 'Mobile apps',
    desc: 'iOS and Android apps from one codebase, built to feel native and ready for the app stores.',
    tags: ['iOS', 'Android', 'Cross-platform'],
    href: '#contact',
  },
  {
    id: 'ui-ux',
    Icon: Layers,
    title: 'UI/UX design',
    desc: 'Research, wireframes, prototypes and design systems, so what we build is clear before a line of code is written.',
    tags: ['Prototypes', 'Design systems'],
    href: '#contact',
  },
  {
    id: 'ecommerce',
    Icon: ShoppingBag,
    title: 'E-commerce',
    desc: 'Online stores with smooth checkout, local and international payments, inventory and order management.',
    tags: ['Storefronts', 'Payments'],
    href: '#contact',
  },
  {
    id: 'care',
    Icon: Gauge,
    title: 'Maintenance & growth',
    desc: 'Hosting, security updates, speed tuning and ongoing improvements after launch.',
    tags: ['Hosting', 'Support', 'Performance'],
    href: '#contact',
  },
];

// Fades cards up as they enter the viewport (skipped for reduced motion)
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll('[data-reveal]');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}

function BrowserMock() {
  return (
    <div className="services__mock" aria-hidden="true">
      <div className="services__mock-bar">
        <i />
        <i />
        <i />
        <span className="services__mock-url">yourbusiness.com</span>
      </div>
      <div className="services__mock-body">
        <div className="services__mock-nav">
          <b />
          <span />
          <span />
          <span />
        </div>
        <div className="services__mock-hero">
          <span className="services__mock-line services__mock-line--lg" />
          <span className="services__mock-line services__mock-line--md" />
          <span className="services__mock-btn" />
        </div>
        <div className="services__mock-cards">
          <span />
          <span />
          <span />
        </div>
      </div>
      <span className="services__mock-pixels">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export default function Services() {
  const ref = useReveal();

  return (
    <section className="services" id="services" aria-labelledby="services-title" ref={ref}>
      <div className="services__inner">
        <header className="services__head" data-reveal>
          <p className="services__eyebrow">
            <span className="services__eyebrow-dot" aria-hidden="true" />
            What we do
          </p>
          <h2 id="services-title" className="services__title">
            Everything you need to launch and grow <em>online</em>.
          </h2>
          <p className="services__lead">
            One team for strategy, design, development and support. Pick a single service or let us take your product
            from idea to launch.
          </p>
        </header>

        <ul className="services__grid">
          {services.map(({ id, Icon, title, desc, tags, href, featured }, i) => (
            <li
              key={id}
              className={`services__card${featured ? ' services__card--featured' : ''}`}
              data-reveal
              style={{ '--delay': `${i * 70}ms` }}
            >
              <div className="services__card-body">
                <span className="services__icon">
                  <Icon strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="services__card-title">{title}</h3>
                <p className="services__card-desc">{desc}</p>
                <ul className="services__tags" aria-label={`${title} includes`}>
                  {tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a href={href} className="services__link">
                  Learn more <ArrowUpRight strokeWidth={2} aria-hidden="true" />
                  <span className="visually-hidden"> about {title}</span>
                </a>
              </div>
              {featured && <BrowserMock />}
              <span className="services__corner" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </li>
          ))}

          <li className="services__cta" data-reveal style={{ '--delay': `${services.length * 70}ms` }}>
            <div>
              <h3 className="services__cta-title">Not sure what you need?</h3>
              <p className="services__cta-text">
                Tell us about your business and goals. We&apos;ll recommend the right solution, timeline and budget,
                free.
              </p>
            </div>
            <a href="#contact" className="btn btn--primary btn--lg">
              Book a free consultation <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}