import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, Handshake, MessagesSquare, ShieldCheck } from 'lucide-react';
import './index.scss';

const values = [
  {
    Icon: MessagesSquare,
    title: 'Clear communication',
    desc: 'Plain language, regular updates and one point of contact from start to finish.',
  },
  {
    Icon: ShieldCheck,
    title: 'Built to last',
    desc: 'Clean, secure code and modern tools, so your product is easy to grow and maintain.',
  },
  {
    Icon: Clock,
    title: 'On time, on budget',
    desc: 'A clear scope and timeline up front. If anything changes, you hear about it first.',
  },
  {
    Icon: Handshake,
    title: 'Partners, not vendors',
    desc: 'We care about your results after launch, not just the handover.',
  },
];

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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const ref = useReveal();

  return (
    <section className="about" id="about" aria-labelledby="about-title" ref={ref}>
      <div className="about__inner">
        <div className="about__intro">
          <div className="about__text" data-reveal>
            <p className="about__eyebrow">
              <span className="about__eyebrow-dot" aria-hidden="true" />
              About us
            </p>
            <h2 id="about-title" className="about__title">
              We turn ideas into <em>products people use</em>.
            </h2>
            <p className="about__copy">
              NathWebSolutions is a web, software and digital solutions studio. We help businesses, founders and
              organisations get online and grow, with websites, web apps and mobile apps that look sharp and work
              hard.
            </p>
            <p className="about__copy">
              We keep teams small and focused, so you work directly with the people designing and building your
              product. No hand-offs, no jargon, just steady progress you can see.
            </p>

            <figure className="about__founder">
              <span className="about__avatar" aria-hidden="true">CN</span>
              <figcaption>
                <strong>Chiwendu Nathaniel</strong>
                <span>Founder &amp; Lead Developer</span>
              </figcaption>
            </figure>

            <a href="#contact" className="btn btn--primary btn--lg about__cta">
              Work with us <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className="about__visual" data-reveal aria-hidden="true">
            <div className="about__panel">
              <span className="about__grid" />
              <span className="about__ring about__ring--lg" />
              <span className="about__ring about__ring--sm" />
              <img className="about__mark" src="/nws-mark.png" alt="NathWeb Solutions" width="240" height="158" />
            </div>
            <p className="about__tagline">Bringing Your Vision to Reality</p>
          </div>
        </div>

        <ul className="about__values">
          {values.map(({ Icon, title, desc }, i) => (
            <li key={title} className="about__value" data-reveal style={{ '--delay': `${i * 80}ms` }}>
              <span className="about__value-icon">
                <Icon strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="about__value-title">{title}</h3>
              <p className="about__value-desc">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}