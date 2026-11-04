import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import './index.scss';

export default function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  // Respect reduced-motion: start paused on the poster frame
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
    }
  }, []);

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow" data-aos="fade-up" data-aos-duration="1000">
            <span className="hero__pixels" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Web • Software • Digital Solutions
          </p>
          <h1 id="hero-title" className="hero__title" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            We build <em>websites &amp; apps</em> that move your business forward.
          </h1>
          <p className="hero__lead" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
            From a sharp marketing site to a full web or mobile product, we design, build and launch software that
            brings your vision to reality.
          </p>
          <div className="hero__actions" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">
            <a href="#contact" className="btn btn--primary btn--lg">
              Start a project <ArrowRight className="btn__icon" strokeWidth={2} aria-hidden="true" />
            </a>
            <a href="#work" className="btn btn--ghost btn--lg">
              See our work
            </a>
          </div>
          <ul className="hero__services" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="800">
            <li>Websites</li>
            <li>Web apps</li>
            <li>Mobile apps</li>
            <li>UI/UX design</li>
          </ul>
        </div>
      </div>

      <a href="#services" className="hero__scroll">
        Scroll
        <span aria-hidden="true" />
      </a>

      <button
        type="button"
        className="hero__toggle"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
      >
        {playing ? <Pause fill="currentColor" strokeWidth={0} aria-hidden="true" /> : <Play fill="currentColor" strokeWidth={0} aria-hidden="true" />}
      </button>
    </section>
  );
}