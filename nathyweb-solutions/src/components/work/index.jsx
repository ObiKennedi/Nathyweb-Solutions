import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import defaultProjects from './project';
import './index.scss';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function DeviceScreen({ project, isActive }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const userPausedRef = useRef(false);

  // Synchronize playback with carousel active state and viewport visibility
  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    if (prefersReducedMotion()) {
      userPausedRef.current = true;
      setUserPaused(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isActive && !userPausedRef.current) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(wrap);

    if (isActive && !userPausedRef.current) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    return () => io.disconnect();
  }, [isActive]);

  // Pointer tilt: the device follows the cursor slightly (mouse only)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        wrap.style.setProperty('--tilt-y', `${x * 14}deg`);
        wrap.style.setProperty('--tilt-x', `${y * -10}deg`);
        wrap.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      wrap.style.removeProperty('--tilt-y');
      wrap.style.removeProperty('--tilt-x');
      wrap.style.removeProperty('--glare-x');
    };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      setUserPaused(true);
      v.pause();
    }
  };

  const isPhone = project.device === 'phone';

  return (
    <div className={`work__stage work__stage--${isPhone ? 'phone' : 'laptop'}`} ref={wrapRef}>
      <div className={`work__device work__device--${isPhone ? 'phone' : 'laptop'}`}>
        <div className="work__screen">
          {isPhone ? <span className="work__island" aria-hidden="true" /> : <span className="work__camera" aria-hidden="true" />}
          <div className="work__display">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.poster}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label={`Screen recording of ${project.title}`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <span className="work__glare" aria-hidden="true" />
          </div>
        </div>
        {!isPhone && <div className="work__deck" aria-hidden="true" />}
      </div>
      <span className="work__shadow" aria-hidden="true" />

      <button
        type="button"
        className="work__play"
        onClick={toggle}
        aria-label={playing ? `Pause ${project.title} video` : `Play ${project.title} video`}
        data-paused={userPaused || undefined}
      >
        {playing ? <Pause fill="currentColor" strokeWidth={0} aria-hidden="true" /> : <Play fill="currentColor" strokeWidth={0} aria-hidden="true" />}
      </button>
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll('[data-reveal]');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
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
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Work({ projects = defaultProjects }) {
  const ref = useReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Bounds safety if projects change dynamically
  useEffect(() => {
    if (currentIndex >= projects.length) {
      setCurrentIndex(0);
    }
  }, [projects.length, currentIndex]);

  const prevProject = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevProject();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextProject();
    }
  };

  return (
    <section className="work" id="work" aria-labelledby="work-title" ref={ref}>
      <div className="work__inner">
        <header className="work__head" data-reveal>
          <div>
            <p className="work__eyebrow">
              <span className="work__eyebrow-dot" aria-hidden="true" />
              Selected work
            </p>
            <h2 id="work-title" className="work__title">
              Products we&apos;ve <em>built and shipped</em>.
            </h2>
          </div>
          <p className="work__lead">
            A few recent websites and apps, live and in use. Use the controls to explore each project.
          </p>
        </header>

        <div
          className="work__carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Projects showcase"
          data-reveal
        >
          {/* Side arrow buttons */}
          <button
            type="button"
            className="work__arrow work__arrow--prev"
            onClick={prevProject}
            aria-label="Previous project"
          >
            <ChevronLeft strokeWidth={2.5} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="work__arrow work__arrow--next"
            onClick={nextProject}
            aria-label="Next project"
          >
            <ChevronRight strokeWidth={2.5} aria-hidden="true" />
          </button>

          {/* Single horizontal straight track */}
          <div className="work__track-container">
            <div
              className="work__track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  className={`work__slide ${i === currentIndex ? 'work__slide--active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${projects.length}`}
                  aria-hidden={currentIndex !== i}
                >
                  <div className="work__project">
                    <DeviceScreen project={p} isActive={currentIndex === i} />

                    <div className="work__info">
                      <p className="work__meta">
                        <span className="work__index">{String(i + 1).padStart(2, '0')}</span>
                        <span>{p.category}</span>
                        <span aria-hidden="true">•</span>
                        <span>{p.year}</span>
                      </p>
                      <h3 className="work__name">{p.title}</h3>
                      {p.client && <p className="work__client">for {p.client}</p>}
                      <p className="work__summary">{p.summary}</p>

                      {p.highlights?.length > 0 && (
                        <ul className="work__highlights">
                          {p.highlights.map((h) => (
                            <li key={h}>
                              <Check strokeWidth={2.25} aria-hidden="true" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      {p.stack?.length > 0 && (
                        <ul className="work__stack" aria-label="Built with">
                          {p.stack.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      )}

                      <div className="work__actions">
                        <a href={p.url} target="_blank" rel="noreferrer" className="btn btn--primary">
                          {p.device === 'phone' ? 'View the app' : 'Visit live site'}
                          <ArrowUpRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
                          <span className="visually-hidden"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation bar with Prev/Next buttons, counter & jump dots */}
          <div className="work__controls">
            <div className="work__counter">
              <span className="work__counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="work__counter-sep">/</span>
              <span className="work__counter-total">{String(projects.length).padStart(2, '0')}</span>
            </div>

            <div className="work__dots">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`work__dot ${i === currentIndex ? 'work__dot--active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Jump to project ${i + 1}: ${p.title}`}
                />
              ))}
            </div>

            <div className="work__nav-buttons">
              <button
                type="button"
                className="btn btn--ghost work__control-btn"
                onClick={prevProject}
                aria-label="Previous project"
              >
                <ChevronLeft strokeWidth={2} aria-hidden="true" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                className="btn btn--primary work__control-btn"
                onClick={nextProject}
                aria-label="Next project"
              >
                <span>Next</span>
                <ChevronRight strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="work__more" data-reveal>
          <p>Have a project in mind?</p>
          <a href="#contact" className="btn btn--ghost">
            Let&apos;s build it <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
