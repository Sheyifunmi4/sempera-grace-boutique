import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import semperaLogo from '@/assets/sempera-logo.png';

const navItems = [
  { label: 'Shop', href: '/#collection' },
  { label: 'Collection', href: '/#collection' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const announcements = [
  '✦ We Deliver Globally — Worldwide Shipping Available ✦',
  '✦ Lagos Delivery: 3–5 Working Days ✦',
  '✦ Outside Lagos: 5–7 Working Days ✦',
];

interface SemperaNavProps {
  onRequestPiece?: () => void;
}

export default function SemperaNav({ onRequestPiece }: SemperaNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(2);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Announcement Bar ── */}
      <div
        style={{
          backgroundColor: '#b8965a',
          color: '#ffffff',
          textAlign: 'center',
          padding: '9px 16px',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'Jost, sans-serif',
          fontWeight: 400,
          transition: 'opacity 0.4s ease',
          opacity: fade ? 1 : 0,
        }}
      >
        {announcements[announcementIndex]}
      </div>

      {/* ── Main Nav ── */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: '90px' }}>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={semperaLogo}
                alt="Sempera Fashion"
                style={{
                  height: '300px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  marginLeft: '-50px',
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleAnchorClick(item.href)}
                  className="nav-link bg-transparent border-none p-0"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <button onClick={onRequestPiece} className="btn-gold text-sm">
                Request a Piece
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-background border-t border-border/40 py-6 px-6">
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleAnchorClick(item.href)}
                  className="nav-link text-left bg-transparent border-none p-0 text-base"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onRequestPiece?.(); }}
                className="btn-gold w-full mt-2"
              >
                Request a Piece
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
