import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}


// ── Main About Section ───────────────────────────────────────────────────────
function AboutSection() {
  const arrowRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [leftRef, leftInView] = useInView(0.15);
  const [rightRef, rightInView] = useInView(0.15);

  // Rotating arrow that tracks cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!arrowRef.current) return;
      const rect = arrowRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      setRotation(angle);
    };
    const handleMouseLeave = () => setRotation(0);
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const values = [
    { icon: '✦', label: 'Creative Vision', desc: 'Every pixel serves a purpose. We craft experiences that breathe.' },
    { icon: '◈', label: 'Strategic Thinking', desc: 'Data-backed decisions wrapped in beautiful design logic.' },
    { icon: '⬡', label: 'Bold Execution', desc: 'We ship fast, iterate fearlessly, and never settle.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .about-root { font-family: 'DM Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }

        /* ── section background ── */
        .about-bg {
          background:
            radial-gradient(ellipse 55% 40% at 95% 10%, rgba(59,130,246,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 0% 80%, rgba(236,72,153,0.07) 0%, transparent 60%),
            #ffffff;
          overflow: hidden;
        }

        /* gradient text */
        .g-text {
          background: linear-gradient(135deg, #2563eb 0%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── decorative floating blobs ── */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
        }
        .blob-blue {
          width: 420px; height: 420px;
          background: rgba(59,130,246,0.12);
          top: -80px; right: -100px;
          animation: floatBlob 9s ease-in-out infinite;
        }
        .blob-pink {
          width: 320px; height: 320px;
          background: rgba(236,72,153,0.10);
          bottom: 40px; left: -80px;
          animation: floatBlob 11s ease-in-out infinite reverse;
        }
        @keyframes floatBlob {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-30px) scale(1.06); }
        }

        /* ── rotating cursor arrow ── */
        .arrow-wrap {
          width: 80px; height: 80px;
          display: flex; align-items: center; justify-content: center;
          cursor: crosshair;
        }
        .arrow-shaft {
          position: relative;
          width: 64px; height: 6px;
          background: linear-gradient(90deg, #2563eb, #db2777);
          border-radius: 3px;
        }
        .arrow-shaft::before,
        .arrow-shaft::after {
          content: '';
          position: absolute;
          right: -2px;
          width: 26px; height: 6px;
          background: linear-gradient(90deg, #2563eb, #db2777);
          border-radius: 3px;
          transform-origin: right center;
        }
        .arrow-shaft::before { transform: rotate(38deg) translateX(2px); top: -7px; }
        .arrow-shaft::after  { transform: rotate(-38deg) translateX(2px); top: 7px; }

        /* ── value cards ── */
        .val-card {
          background: #fff;
          border: 1px solid #e0e7ff;
          border-radius: 16px;
          padding: 28px 24px;
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          position: relative;
          overflow: hidden;
        }
        .val-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #2563eb, #db2777);
          opacity: 0;
          transition: opacity 0.28s;
        }
        .val-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(59,130,246,0.12), 0 4px 16px rgba(236,72,153,0.08);
          border-color: rgba(59,130,246,0.25);
        }
        .val-card:hover::before { opacity: 1; }

        .val-icon {
          font-size: 1.6rem;
          background: linear-gradient(135deg, #2563eb, #db2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          display: block;
        }

        /* ── stat chips ── */
        .stat-chip {
          background: #fff;
          border: 1px solid #e0e7ff;
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .stat-chip:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(59,130,246,0.10);
        }

        /* ── CTA button ── */
        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.04em;
          color: #fff;
          background: linear-gradient(135deg, #2563eb, #db2777);
          box-shadow: 0 4px 20px rgba(219,39,119,0.30), 0 2px 8px rgba(37,99,235,0.20);
          text-decoration: none;
          border: none; cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
        }
        .about-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow: 0 10px 30px rgba(219,39,119,0.38);
        }

        /* ── marquee strip ── */
        .marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 18s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-item {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9ca3af;
        }
        .marquee-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #db2777);
          vertical-align: middle;
          margin: 0 24px;
        }

        /* ── scroll reveal helpers ── */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .stagger-1 { transition-delay: 0.05s; }
        .stagger-2 { transition-delay: 0.15s; }
        .stagger-3 { transition-delay: 0.25s; }
        .stagger-4 { transition-delay: 0.35s; }

        /* ── diagonal accent strip ── */
        .diag-strip {
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 40px;
          background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(219,39,119,0.06));
          transform: rotate(22deg);
          right: -60px; top: 60px;
          pointer-events: none;
        }

        /* thin gradient rule */
        .grad-rule {
          height: 2px;
          background: linear-gradient(90deg, transparent, #2563eb 30%, #db2777 70%, transparent);
        }
      `}</style>

      <div className="about-root">

        {/* ══════════ ABOUT SECTION ══════════ */}
        <section className="about-bg relative py-24 px-5 md:px-12 lg:px-20">

          {/* Floating blobs */}
          <div className="blob blob-blue" />
          <div className="blob blob-pink" />
          <div className="diag-strip" />

          <div className="">
            {/* ── Two-column main content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

              {/* LEFT — title + arrow + copy */}
              <div
                ref={leftRef}
                className={`flex flex-col gap-10 reveal-left ${leftInView ? 'visible' : ''}`}
              >
                <h3 className="syne text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                  Crafting digital experiences<br />
                  that <span className="g-text">move people</span>
                </h3>

                {/* Cursor-tracking arrow */}
                <div className="hidden md:flex items-center gap-6">
                  <div
                    ref={arrowRef}
                    className="arrow-wrap"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: 'transform 0.15s ease-out',
                    }}
                  >
                    <div className="arrow-shaft" />
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                    Follow the direction
                  </p>
                </div>

                <p className="text-gray-500 text-lg leading-relaxed">
                  We're a team of strategists, designers, and builders obsessed with
                  making brands impossible to ignore — from Google search to AI-powered discovery.
                </p>

                <div className="flex flex-wrap gap-3">
                  {['SEO', 'Branding', 'Paid Media', 'Creative', 'Analytics', 'Social'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-sm font-semibold border"
                      style={{ borderColor: 'rgba(37,99,235,0.25)', color: '#2563eb', background: 'rgba(37,99,235,0.04)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <Link
                    to="/contact"
                    className="about-cta"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Work with us
                    <span style={{ fontSize: '1.1rem' }}>→</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT — value cards */}
              <div
                ref={rightRef}
                className={`flex flex-col gap-5 reveal-right ${rightInView ? 'visible' : ''}`}
              >
                {values.map((v, i) => (
                  <div key={v.label} className={`val-card stagger-${i + 1}`}>
                    <span className="val-icon">{v.icon}</span>
                    <h4 className="syne text-lg font-bold text-gray-900 mb-2">{v.label}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

const BRANDS = [
  'HP', 'SoFi', 'Intuit', 'Mitsubishi',
  'Adobe', 'Nissan', 'Marriott', "L'Oréal",
  'Kumon', 'Cartier', 'DHL', 'Clarins',
  'Unilever', 'Canon', 'Prudential', "Church's",
  'Western Union', 'Sony Music', "Domino's", "Levi's",
];

const SERVICES = [
  'AEO', 'SEO', 'Paid Media',
  'Creative', 'Content', 'Social Media',
  'App Store', 'Analytics', 'Other',
];

export default function Home() {
  const [selected, setSelected] = useState([]);
  const [particlesReady, setParticlesReady] = useState(false);

  const toggle = (s) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  useEffect(() => {
    // Dynamically load tsparticles
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });

    const init = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/tsparticles/2.12.0/tsparticles.bundle.min.js');
        if (!window.tsParticles) return;

        await window.tsParticles.load('tsparticles', {
          autoPlay: true,
          background: {
            color: { value: '#ffffff' },
            image: "url('https://particles.js.org/images/background3.jpg')",
            position: '50% 50%',
            repeat: 'no-repeat',
            size: 'cover',
            opacity: 1,
          },
          backgroundMask: {
            composite: 'destination-out',
            cover: { opacity: 1, color: { value: { r: 255, g: 255, b: 255 } } },
            enable: true,
          },
          fpsLimit: 120,
          interactivity: {
            detectsOn: 'window',
            events: {
              onClick: { enable: true, mode: 'push' },
              onHover: { enable: true, mode: 'bubble' },
              resize: { delay: 0.5, enable: true },
            },
            modes: {
              bubble: { distance: 400, duration: 2, opacity: 1, size: 100 },
              push: { quantity: 4 },
            },
          },
          particles: {
            color: { value: '#ffffff' },
            links: {
              color: { value: '#ffffff' },
              distance: 150,
              enable: true,
              opacity: 1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'out' },
              speed: 2,
            },
            number: {
              density: { enable: true, width: 1920, height: 1080 },
              value: 80,
            },
            opacity: { value: 1 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 30 } },
          },
          detectRetina: true,
        });

        setParticlesReady(true);
      } catch (e) {
        console.warn('tsParticles failed to load', e);
      }
    };

    init();

    return () => {
      if (window.tsParticles) {
        window.tsParticles.domItem(0)?.destroy();
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .home-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Syne', sans-serif; }

        /* ── background ── */
        .hero-bg {
          background: radial-gradient(ellipse 80% 60% at 65% -10%, rgba(59,130,246,0.10) 0%, transparent 55%),
                      radial-gradient(ellipse 60% 50% at 5% 90%, rgba(236,72,153,0.09) 0%, transparent 55%),
                      #ffffff;
        }

        /* gradient text */
        .grad-blue  { color: #2563eb; }
        .grad-pink  { color: #db2777; }

        /* headline underline accent */
        .headline-accent {
          position: relative;
          display: inline-block;
        }
        .headline-accent::after {
          content: '';
          position: absolute;
          left: 0; bottom: -4px;
          width: 100%; height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #3b82f6, #ec4899);
          opacity: 0.7;
        }

        /* CTA button */
        .cta-btn {
          display: inline-block;
          padding: 13px 36px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%);
          box-shadow: 0 4px 20px rgba(236,72,153,0.35), 0 2px 8px rgba(59,130,246,0.25);
          transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
          border: none; cursor: pointer;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 10px 32px rgba(236,72,153,0.45);
        }

        /* brand pill */
        .brand-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          background: #f8faff;
          border: 1px solid #e0e7ff;
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .brand-pill:hover {
          background: #fdf2f8;
          color: #db2777;
          border-color: rgba(236,72,153,0.35);
        }

        /* service checkbox cards */
        .service-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 9px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          background: #fff;
          transition: border-color 0.18s, background 0.18s, color 0.18s;
          user-select: none;
        }
        .service-card.checked {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #eff6ff, #fdf2f8);
          color: #1d4ed8;
        }
        .service-card:hover:not(.checked) {
          border-color: #f472b6;
          background: #fdf2f8;
        }

        /* custom checkbox */
        .check-box {
          width: 16px; height: 16px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.18s, background 0.18s;
        }
        .checked .check-box {
          background: linear-gradient(135deg, #3b82f6, #ec4899);
          border-color: transparent;
        }
        .check-tick {
          width: 8px; height: 8px;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(45deg) translate(-1px, -1px);
          display: none;
        }
        .checked .check-tick { display: block; }

        /* form card */
        .form-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 36px 32px;
          box-shadow: 0 4px 32px rgba(59,130,246,0.10), 0 1px 4px rgba(236,72,153,0.08);
          border: 1px solid #e0e7ff;
        }

        /* get started btn in form */
        .form-submit {
          padding: 12px 40px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          background: linear-gradient(135deg, #3b82f6, #ec4899);
          border: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(236,72,153,0.30);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(236,72,153,0.40);
        }

        /* fade-up on load */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.6s ease both; }
        .fade-up-2 { animation: fadeUp 0.6s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.28s ease both; }
        .fade-up-4 { animation: fadeUp 0.6s 0.40s ease both; }

        /* thin gradient rule */
        .grad-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(236,72,153,0.4), rgba(59,130,246,0.4), transparent);
          margin: 0;
        }
      `}</style>

      <div className="home-root">

        {/* ════════ HERO SECTION ════════ */}
        <section className="hero-bg py-20 px-5 md:px-10 overflow-hidden" style={{ position: 'relative' }}>
          {/* tsParticles canvas — sits behind content via z-index */}
          <div
            id="tsparticles"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              zIndex: 0,
            }}
          />
          <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

            {/* — Headline block — */}
            <div className="text-center mb-14 fade-up-1">
              <h1 className="display-font text-gray-900 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                We make sure customers find you<br />
                everywhere from{' '}
                <span className="grad-blue headline-accent">Google</span>{' '}
                to{' '}
                <span className="grad-pink headline-accent">ChatGPT</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8">
                We help you show up everywhere customers are searching, swiping,
                scrolling, streaming, and shopping.
              </p>
              <Link to="/contact" className="cta-btn">Work with us</Link>
            </div>

            {/* — Two-column: brands + form — */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start fade-up-2">

              {/* LEFT — brand logo grid */}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-5">
                  Trusted by industry leaders
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {BRANDS.map((brand) => (
                    <div key={brand} className="brand-pill">{brand}</div>
                  ))}
                </div>
              </div>

              {/* RIGHT — service selector card */}
              <div className="form-card fade-up-3">
                <h3 className="display-font text-gray-900 text-xl font-bold text-center mb-6">
                  How can we help you get found?
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-7">
                  {SERVICES.map((s) => (
                    <div
                      key={s}
                      className={`service-card${selected.includes(s) ? ' checked' : ''}`}
                      onClick={() => toggle(s)}
                    >
                      <div className="check-box">
                        <div className="check-tick" />
                      </div>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button className="form-submit">Get started</button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* gradient divider */}
        <div className="grad-rule" />
        <div>
          <AboutSection />
        </div>
      </div>
    </>
  );
}