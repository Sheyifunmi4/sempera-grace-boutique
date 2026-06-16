import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, ShoppingCart } from 'lucide-react';
import semperaLogo from '@/assets/sempera-logo.png';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

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

  // ── Hide / show on scroll ──
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const { user, signOut } = useAuth();
  const { count: cartCount, setOpen: openCart } = useCart();

  // First name for the greeting (falls back to the email handle).
  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    '';

  // Announcement cycling
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

  // Scroll listener — hide when scrolling DOWN, show when scrolling UP
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 10) {
        // Always show at very top of page
        setVisible(true);
      } else if (currentY > lastScrollY.current + 8) {
        // Scrolling DOWN — hide nav
        setVisible(false);
        setMenuOpen(false); // close mobile menu when hiding
      } else if (currentY < lastScrollY.current - 8) {
        // Scrolling UP — show nav
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
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
            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => openCart(true)}
                className="nav-link flex items-center gap-2 bg-transparent border-none p-0"
                aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              >
                <span className="relative flex items-center">
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2.5 flex items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: '#b8965a', fontSize: '0.6rem', minWidth: '16px', height: '16px', padding: '0 4px', fontFamily: 'Jost, sans-serif' }}
                    >
                      {cartCount}
                    </span>
                  )}
                </span>
                Cart
              </button>
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="nav-link flex items-center gap-2"
                    title="My account"
                  >
                    <UserIcon size={16} />
                    {firstName}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="nav-link flex items-center gap-1.5 bg-transparent border-none p-0"
                    title="Log out"
                  >
                    <LogOut size={15} />
                  </button>
                </>
              ) : (
                <Link to="/auth" className="nav-link flex items-center gap-2">
                  <UserIcon size={16} />
                  Log In
                </Link>
              )}
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
                onClick={() => { setMenuOpen(false); openCart(true); }}
                className="nav-link text-left flex items-center gap-2 bg-transparent border-none p-0 text-base"
              >
                <ShoppingCart size={17} /> Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </button>
              {user ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="nav-link text-left flex items-center gap-2 text-base"
                  >
                    <UserIcon size={17} /> My Account ({firstName})
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); signOut(); }}
                    className="nav-link text-left flex items-center gap-2 bg-transparent border-none p-0 text-base"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="nav-link text-left flex items-center gap-2 text-base"
                >
                  <UserIcon size={17} /> Log In / Sign Up
                </Link>
              )}
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