import { useState, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════════
   THEME HOOK
   ═══════════════════════════════════════════ */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('perry-theme') || 'dark' } catch { return 'dark' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('perry-theme', theme) } catch {}
  }, [theme])

  const toggle = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])
  return { theme, toggle }
}

/* ═══════════════════════════════════════════
   REVEAL HOOK
   ═══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}

/* ═══════════════════════════════════════════
   SHARED SVGs
   ═══════════════════════════════════════════ */
const PhoneIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 1.11h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

/* ═══════════════════════════════════════════
   SECTION LABEL COMPONENT
   ═══════════════════════════════════════════ */
function SectionLabel({ text, center = true }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="gold-line" />
      <span className="text-xs tracking-[0.3em] uppercase text-gold">{text}</span>
      {center && <span className="gold-line" />}
    </div>
  )
}

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */
function Nav({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--gold)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div className="font-serif text-lg leading-none text-gold">Perry</div>
            <div className="uppercase tracking-widest text-muted" style={{ fontSize: '9px' }}>Tailoring & Embroidery</div>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link text-sm tracking-wide">{l.label}</a>
          ))}
          {/* Theme toggle */}
          <button onClick={onToggle} className="theme-toggle" aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark'
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>
          <a href="tel:07869026632" className="btn-gold px-5 py-2.5 text-sm rounded-sm gap-2">
            <PhoneIcon /> Call Now
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={onToggle} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>
          <button className="flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span className="block w-6 h-px transition-all duration-200" style={{ background: menuOpen ? 'var(--gold)' : 'var(--text-primary)', transform: menuOpen ? 'rotate(45deg) translateY(4px)' : '' }}/>
            <span className="block w-6 h-px" style={{ background: 'var(--text-primary)', opacity: menuOpen ? 0 : 1 }}/>
            <span className="block w-6 h-px transition-all duration-200" style={{ background: menuOpen ? 'var(--gold)' : 'var(--text-primary)', transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : '' }}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-5 bg-surface" style={{ borderTop: '1px solid var(--border)' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-primary text-base tracking-wide" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="tel:07869026632" className="btn-gold px-5 py-3.5 text-sm rounded-sm gap-2">
            <PhoneIcon /> Call 07869 026632
          </a>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════
   HERO — real shopfront image + dark overlay
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/images/shopfront.jpg"
        alt="Perry Tailoring & Embroidery shop front, Northfleet Gravesend"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'brightness(0.55) saturate(0.8)' }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.75) 100%)' }}
      />

      {/* Left / right gold accent lines */}
      <div className="absolute left-10 top-0 bottom-0 hidden lg:block" style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)' }}/>
      <div className="absolute right-10 top-0 bottom-0 hidden lg:block" style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)' }}/>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="hero-animate flex items-center justify-center gap-3 mb-7">
          <span style={{ display: 'inline-block', width: '40px', height: '1px', background: '#C9A84C' }}/>
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#C9A84C' }}>Northfleet · Gravesend · Kent</span>
          <span style={{ display: 'inline-block', width: '40px', height: '1px', background: '#C9A84C' }}/>
        </div>

        <h1 className="hero-animate-delay-1 font-serif font-light leading-tight mb-5"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', color: '#FAF8F4' }}>
          Expert Tailoring &<br />
          <span style={{ color: '#C9A84C' }}>Alterations</span> in<br />
          Gravesend
        </h1>

        <p className="hero-animate-delay-2 font-light tracking-wide mb-3"
          style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'rgba(250,248,244,0.8)', maxWidth: '560px', margin: '0 auto 12px' }}>
          Fast, precise and beautifully finished tailoring you can trust
        </p>

        <p className="hero-animate-delay-2 text-sm tracking-widest mb-10" style={{ color: 'rgba(201,168,76,0.9)' }}>
          Same-day service available · 4.6★ on Google
        </p>

        {/* CTAs */}
        <div className="hero-animate-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <a href="tel:07869026632" className="btn-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase gap-2">
            <PhoneIcon /> Call 07869 026632
          </a>
          <a href="https://wa.me/447869026632" target="_blank" rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase gap-2"
            style={{ color: '#FAF8F4', borderColor: 'rgba(250,248,244,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(250,248,244,0.1)'; e.currentTarget.style.borderColor='rgba(250,248,244,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.borderColor='rgba(250,248,244,0.4)' }}
          >
            <WaIcon /> WhatsApp Us
          </a>
          <a href="#contact" className="text-sm tracking-widest uppercase px-4 py-4 transition-colors"
            style={{ color: 'rgba(250,248,244,0.6)' }}
            onMouseEnter={e => e.currentTarget.style.color='#FAF8F4'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(250,248,244,0.6)'}
          >
            Visit Shop →
          </a>
        </div>

        {/* Trust badges */}
        <div className="hero-animate-delay-4 flex flex-wrap justify-center gap-8">
          {[
            { num: '4.6★', label: 'Google Rating' },
            { num: '1–2', label: 'Day Turnaround' },
            { num: 'Same', label: 'Day Available' },
            { num: 'Free', label: 'Quote' },
          ].map(b => (
            <div key={b.label} className="text-center">
              <div className="font-serif text-2xl font-light" style={{ color: '#C9A84C' }}>{b.num}</div>
              <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'rgba(250,248,244,0.5)' }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(250,248,244,0.4)' }}>Scroll</span>
        <div className="w-px h-7" style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)' }}/>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */
const services = [
  {
    title: 'Clothing Alterations',
    desc: 'Perfect fit, every time. We alter trousers, jeans, skirts, blouses and coats for men, women and children.',
    detail: 'Trousers shortening from £10 · Waist adjustments from £12 · Tapering from £12',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M6 2L3 7v15h18V7l-3-5"/><path d="M3 7h18"/><path d="M12 2v5"/></svg>,
  },
  {
    title: 'Dress Tailoring',
    desc: 'Bridal, prom, evening wear — fitted precisely. Gravesend\'s trusted specialist for special occasion dresses.',
    detail: 'Wedding gowns · Prom dresses · Bridal alterations · Evening wear',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 2c-1 0-2.5 1-3 2.5L7 8h10l-2-3.5C14.5 3 13 2 12 2zM7 8l-4 13h18L17 8H7z"/></svg>,
  },
  {
    title: 'Suit Adjustments',
    desc: 'Achieve a sharp, tailored fit. Chest, shoulders, sleeves, lapels — every detail attended to with care.',
    detail: 'Suit & jacket alterations from £20 · Shoulder work · Trouser tapering',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M20 7l-8-4-8 4v12l8 4 8-4V7z"/><path d="M12 3v18"/><path d="M4.93 7.93l14.14 8.14M19.07 7.93L4.93 16.07"/></svg>,
  },
  {
    title: 'Repairs & Zip Work',
    desc: 'Zip replacements, split seams, button repairs and full garment restoration — finished so you\'d never know.',
    detail: 'Zip repair & replacement from £10 · Seam repairs · Button replacement',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    title: 'Embroidery',
    desc: 'Custom embroidery for clothing, uniforms, accessories and business orders. High quality, quick turnaround.',
    detail: 'Custom designs · Name & logo embroidery · Uniforms & workwear',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>,
  },
  {
    title: 'Curtains & Homeware',
    desc: 'Curtain shortening and hemming to the perfect length. Professional finish, every time.',
    detail: 'Curtain shortening from £20 · Hem finishing · Custom lengths',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="3" width="18" height="2" rx="1"/><path d="M5 5v16M19 5v16M5 21h14M8 5c0 5-3 8-3 8M11 5c0 5 3 8 3 8M13 5c0 5-3 8-3 8M16 5c0 5 3 8 3 8"/></svg>,
  },
]

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <SectionLabel text="What We Offer" />
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-primary">Our Services</h2>
          <p className="text-secondary max-w-xl mx-auto text-base font-light">
            Every garment — from a quick hem to a wedding gown — receives the same dedicated precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={s.title} className="card reveal rounded-sm p-8" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="mb-4 text-gold">{s.icon}</div>
              <h3 className="font-serif text-xl mb-2 text-primary">{s.title}</h3>
              <p className="text-secondary text-sm leading-relaxed mb-4">{s.desc}</p>
              <div style={{ height: '1px', background: 'var(--border)', marginBottom: '10px' }}/>
              <p className="text-muted text-xs leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-sm text-center reveal" style={{ border: '1px solid var(--gold-dim)', background: 'var(--gold-dim)' }}>
          <p className="text-sm text-secondary">
            <span className="text-gold font-medium">Same-day service available.</span>
            {' '}Starting from: Shortening <strong className="text-primary">£10</strong> · Zip Repair <strong className="text-primary">£10</strong> · Waist Adj <strong className="text-primary">£12</strong> · Sleeves <strong className="text-primary">£20</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   WHY TRUST US
   ═══════════════════════════════════════════ */
const trustPoints = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: 'Fast 1–2 Day Turnaround',
    desc: 'Most jobs are ready within 1–2 days. Same-day service is often available — just call ahead and we\'ll do our best.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Precision & Attention to Detail',
    desc: 'Every stitch is placed with care. We take the time to get every alteration right — so your garment looks and feels perfect.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    title: 'Friendly, Professional Service',
    desc: 'From your first visit you\'ll feel at ease. We listen, advise, and always give honest, professional recommendations.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    title: 'Repairs That Look Like New',
    desc: 'Zips, seams, rips — we restore garments so the repair is invisible. You\'ll never be able to tell it was damaged.',
  },
]

function WhyTrust() {
  return (
    <section id="why-trust" className="py-24 md:py-28 bg-base">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <SectionLabel text="Why Choose Us" />
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-primary">Why Customers Trust Us</h2>
          <p className="text-secondary max-w-xl mx-auto font-light">
            Over the years we've built a loyal following in Gravesend — and these are the reasons why.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPoints.map((p, i) => (
            <div
              key={p.title}
              className="reveal text-center p-8 rounded-sm"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div className="text-gold flex justify-center mb-4">{p.icon}</div>
              <div style={{ width: '32px', height: '1px', background: 'var(--gold)', margin: '0 auto 16px' }}/>
              <h3 className="font-serif text-lg font-light mb-3 text-primary leading-snug">{p.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const testimonials = [
  { name: 'Evangeline Mara', stars: 5, text: 'I had an amazing experience. I needed a dress altered and it was done the next day — so fast, so fair and professional. The alterations were done so precisely. I\'ve now been a regular customer. Would 100% recommend!', tag: 'Dress Alterations' },
  { name: 'Shareif Yousafi', stars: 5, text: 'The most professional service. From the moment I walked in, I was met with expertise. They knew exactly what I needed and offered helpful suggestions to make the final result look completely perfect.', tag: 'Trusted Customer' },
  { name: 'Mohit Jatri', stars: 5, text: 'Best tailoring in Gravesend! Quick turnaround, very professional. Suit fitted perfectly — exactly what I needed.', tag: 'Suit Adjustments' },
  { name: 'Rebecca Dh', stars: 5, text: 'Best tailor in Gravesend! I recommend it to everyone ❤️', tag: 'Local Regular' },
  { name: 'Sadiye Cadiri', stars: 5, text: 'Very happy — friendly and fast service. They shortened 4 skirts for me. Very happy with how well they did.', tag: 'Alterations' },
  { name: 'Ayazuddin Jabali', stars: 5, text: 'Very good — had a ripped pair of trousers, couldn\'t tell it was altered! Really happy with the result.', tag: 'Repairs' },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < count ? 'var(--gold)' : 'var(--border)'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function Testimonials() {
  return (
    <section id="trust" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <SectionLabel text="Customer Reviews" />
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-primary">Trusted by Gravesend</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i <= 4 ? 'var(--gold)' : 'var(--gold-dim)'} stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="font-serif text-xl text-gold">4.6</span>
            <span className="text-muted text-sm">on Google Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal rounded-sm p-7 flex flex-col gap-4 card-subtle"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <Stars count={t.stars} />
                <span className="text-xs px-2 py-0.5 rounded-sm text-gold" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
                  {t.tag}
                </span>
              </div>
              <p className="text-secondary text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div style={{ height: '1px', background: 'var(--border)' }}/>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-gold" style={{ background: 'var(--bg-elevated)' }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-primary">{t.name}</div>
                  <div className="text-xs text-muted">Verified Google Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   MID-PAGE CTA
   ═══════════════════════════════════════════ */
function CtaBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <img src="/images/shopfront.jpg" alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ filter: 'brightness(0.25) saturate(0.6)' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }}/>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: '#C9A84C' }}>Quick Turnaround · Free Quote</p>
        <h2 className="font-serif text-3xl md:text-5xl font-light mb-4" style={{ color: '#FAF8F4' }}>
          Need something altered quickly?
        </h2>
        <p className="mb-8 font-light" style={{ color: 'rgba(250,248,244,0.7)', fontSize: '1.05rem' }}>
          Call in or get in touch today — most jobs are done in 1–2 days, and same-day service is often available.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="tel:07869026632" className="btn-gold px-8 py-4 rounded-sm text-sm tracking-widest uppercase gap-2">
            <PhoneIcon /> Call Now
          </a>
          <a href="https://wa.me/447869026632" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 rounded-sm text-sm tracking-widest uppercase gap-2 flex items-center"
            style={{ border: '1px solid rgba(250,248,244,0.35)', color: '#FAF8F4', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(250,248,244,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
          >
            <WaIcon /> WhatsApp
          </a>
          <a href="#contact"
            className="px-4 py-4 text-sm tracking-widest uppercase transition-colors"
            style={{ color: 'rgba(250,248,244,0.55)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FAF8F4'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,248,244,0.55)'}
          >
            Visit the Shop →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════ */
const galleryImages = [
  { src: '/images/shopfront.jpg', caption: 'Our shop on Perry Street, Northfleet', thumb: 'Shop Front' },
  { src: '/images/flyer.jpg', caption: 'Services & Pricing — Same Day Service Available', thumb: 'Services' },
  { src: '/images/shopfront.jpg', caption: 'Perry Tailoring & Embroidery — Gravesend', thumb: 'Storefront' },
]

function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <section id="gallery" className="py-24 md:py-32 bg-base">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <SectionLabel text="Our Work" />
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-3 text-primary">Gallery</h2>
          <p className="text-muted text-sm">Click any image to enlarge</p>
        </div>

        {/* Main grid — 3 col desktop / 2 tablet / 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item reveal rounded-sm relative"
              style={{ aspectRatio: '4/3', transitionDelay: `${i * 70}ms` }}
              onClick={() => setLightbox(img)}
            >
              <img src={img.src} alt={img.caption} loading="lazy" />
              {/* Hover overlay */}
              <div
                className="gallery-overlay absolute inset-0 flex flex-col justify-end p-5 rounded-sm"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }}
              >
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                  <span className="text-xs tracking-wide" style={{ color: '#FAF8F4' }}>{img.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured banner */}
        <div
          className="mt-5 rounded-sm overflow-hidden relative reveal"
          style={{ border: '1px solid var(--gold-dim)' }}
        >
          <img
            src="/images/shopfront.jpg"
            alt="Perry Tailoring and Embroidery Gravesend shop"
            className="w-full object-cover"
            style={{ maxHeight: '320px', objectPosition: 'center 20%' }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)' }}
          >
            <p className="font-serif text-2xl md:text-3xl font-light" style={{ color: '#FAF8F4' }}>Visit Us on Perry Street</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(250,248,244,0.65)' }}>38-40 Perry St, Northfleet, Gravesend, DA11 8RE</p>
            <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm text-gold">
              Get Directions
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-sm flex items-center gap-2 transition-colors"
              style={{ color: 'rgba(250,248,244,0.6)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FAF8F4'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,248,244,0.6)'}
            >
              Close <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-sm" style={{ maxHeight: '82vh', objectFit: 'contain' }}/>
            <p className="text-center text-sm mt-3" style={{ color: 'rgba(250,248,244,0.5)' }}>{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="reveal">
            <SectionLabel text="About Perry" center={false} />
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight text-primary">
              Gravesend's Most<br />
              <span className="text-gold">Trusted</span> Tailor
            </h2>
            <p className="text-secondary leading-relaxed mb-5">
              Perry Tailoring & Embroidery is a family-run business on Perry Street in Northfleet, Gravesend. We've spent years building a reputation across Kent for precise, high-quality work delivered with a genuinely personal touch.
            </p>
            <p className="text-secondary leading-relaxed mb-5">
              Every garment that comes through our door — from a simple trouser hem to a complete wedding dress — is treated with the same level of care and skill. We take pride in knowing that when you leave, your clothes look and feel better than ever.
            </p>
            <p className="text-secondary leading-relaxed mb-8">
              Need clothing alterations in Gravesend? With same-day service available and a fast 1–2 day standard turnaround, you don't have to wait. Pop in or give us a call — we always offer free quotes.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Same-Day', sub: 'Service Available' },
                { title: '1–2 Days', sub: 'Standard Turnaround' },
                { title: 'Free Quote', sub: 'No Obligation' },
                { title: 'All Garments', sub: 'Welcome' },
              ].map(b => (
                <div key={b.title} className="p-4 rounded-sm card-subtle">
                  <div className="font-serif text-lg font-light text-gold">{b.title}</div>
                  <div className="text-xs text-muted mt-0.5 tracking-wide">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="rounded-sm overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <img
                src="/images/shopfront.jpg"
                alt="Perry Tailoring and Embroidery shop in Northfleet Gravesend"
                className="w-full object-cover"
                style={{ aspectRatio: '3/4', objectPosition: 'top center' }}
                loading="lazy"
              />
            </div>
            <p className="text-xs text-center mt-3 text-gold tracking-wide">
              38-40 Perry St, Northfleet, Gravesend, DA11 8RE
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */
function Contact() {
  const hours = [
    { day: 'Monday – Friday', time: '9:00 am – 6:00 pm', open: true },
    { day: 'Saturday', time: '9:00 am – 5:00 pm', open: true },
    { day: 'Sunday', time: 'Closed', open: false },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-base">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <SectionLabel text="Get in Touch" />
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-primary">Visit or Contact Us</h2>
          <p className="text-secondary max-w-lg mx-auto font-light">
            We're on Perry Street in Northfleet, Gravesend. Walk in, call, or WhatsApp — we're always happy to help with any tailoring or alteration needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left col — contact cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                href: 'tel:07869026632',
                label: 'Phone',
                main: '07869 026632',
                sub: 'Tap to call for a free quote',
                icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 1.11h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                target: '_self',
              },
              {
                href: 'https://wa.me/447869026632',
                label: 'WhatsApp',
                main: 'Message Us',
                sub: 'Quick replies during opening hours',
                icon: <WaIcon size={17} />,
                target: '_blank',
              },
              {
                href: 'https://maps.google.com/?q=38-40+Perry+St,+Northfleet,+Gravesend+DA11+8RE',
                label: 'Address',
                main: '38-40 Perry Street',
                sub: 'Northfleet, Gravesend, DA11 8RE, Kent',
                extra: 'Get Directions →',
                icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                target: '_blank',
              },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.target}
                rel={c.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-5 p-6 rounded-sm card reveal group"
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted mb-1">{c.label}</div>
                  <div className="font-medium text-primary group-hover:text-gold transition-colors">{c.main}</div>
                  <div className="text-xs text-muted mt-0.5">{c.sub}</div>
                  {c.extra && <div className="text-xs mt-1 text-gold">{c.extra}</div>}
                </div>
              </a>
            ))}
          </div>

          {/* Right col — hours + map */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="p-7 rounded-sm card reveal">
              <h3 className="font-serif text-xl mb-5 flex items-center gap-3 text-primary">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Opening Hours
              </h3>
              <div className="space-y-3">
                {hours.map(h => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="text-secondary text-sm">{h.day}</span>
                    <span className="text-sm font-medium" style={{ color: h.open ? 'var(--gold-light)' : 'var(--text-muted)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 flex items-center gap-2" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gold)' }}/>
                <span className="text-sm text-gold">Same-day service often available — call ahead</span>
              </div>
            </div>

            <div className="rounded-sm overflow-hidden reveal flex-1" style={{ border: '1px solid var(--border)', minHeight: '200px' }}>
              <iframe
                title="Perry Tailoring & Embroidery — Northfleet, Gravesend"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.3!2d0.3373!3d51.4402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b14ad9a9f44b%3A0xdbc4b4f5eca1c3e!2sPerry%20Tailoring%20%26%20Embroidery!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px', filter: 'var(--map-filter)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div
          className="mt-8 p-8 rounded-sm text-center reveal"
          style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-dim)' }}
        >
          <p className="font-serif text-2xl font-light mb-2 text-primary">Ready to get started?</p>
          <p className="text-secondary text-sm mb-6">Call in or get in touch — free quotes, no obligation.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:07869026632" className="btn-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase gap-2">
              <PhoneIcon /> Call 07869 026632
            </a>
            <a href="https://wa.me/447869026632" target="_blank" rel="noopener noreferrer"
              className="btn-outline-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase gap-2">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-10" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <div className="font-serif text-xl mb-1 text-gold">Perry Tailoring & Embroidery</div>
            <p className="text-xs text-muted tracking-wide">38-40 Perry St, Northfleet, Gravesend, DA11 8RE · 07869 026632</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-faint tracking-wide">
            <span>Tailoring Gravesend</span><span>·</span>
            <span>Clothing Alterations Gravesend</span><span>·</span>
            <span>Embroidery Gravesend</span><span>·</span>
            <span>Tailor Near Me</span>
          </div>
        </div>
        <div className="mt-7 pt-6 text-center text-xs text-faint" style={{ borderTop: '1px solid var(--border)' }}>
          © {new Date().getFullYear()} Perry Tailoring & Embroidery. All rights reserved. Northfleet, Gravesend, Kent.
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════
   STICKY WHATSAPP BUTTON
   ═══════════════════════════════════════════ */
function StickyWA() {
  return (
    <a
      href="https://wa.me/447869026632"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-sticky"
      aria-label="WhatsApp Perry Tailoring"
      title="WhatsApp us"
    >
      <WaIcon size={24} />
    </a>
  )
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  const { theme, toggle } = useTheme()
  useReveal()

  return (
    <>
      <Nav theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <Services />
        <WhyTrust />
        <CtaBanner />
        <Testimonials />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <StickyWA />
    </>
  )
}
