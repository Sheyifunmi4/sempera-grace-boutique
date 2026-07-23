import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, ShoppingBag, Heart } from 'lucide-react';
import semperaLogo from '@/assets/sempera-logo.png';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const navItems = [
  { label: 'Shop', href: '/#collection' },
  { label: 'Collections', href: '/collections' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
];

const announcements = [
  '✦ We Deliver Globally — Worldwide Shipping Available ✦',
  '✦ Lagos Delivery: 3–5 Working Days ✦',
  '✦ Outside Lagos: 5–7 Working Days ✦',
];

interface SemperaNavProps {
  onRequestPiece?: () => void;
}

export default function SemperaNav({ onRequestPiece: _onRequestPiece }: SemperaNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const { user, signOut } = useAuth();
  const { count: cartCount, setOpen: openCart } = useCart();

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

  // Scroll — hide/show + transparent/ivory switch
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 40);

      if (currentY <= 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 8) {
        setVisible(false);
        setMenuOpen(false);
      } else if (currentY < lastScrollY.current - 8) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
  };

  const isAnchor = (href: string) => href.startsWith('/#');

  const isHomepage = location.pathname === '/';
  const isTransparent = isHomepage && !scrolled;
  const navBg = isTransparent ? 'transparent' : '#F5F0E8';
  const navBorder = isTransparent ? 'none' : '0.5px solid #C4B49A';
  const logoFilter = isTransparent ? 'brightness(0) invert(1)' : 'none';
  const linkColor = isTransparent ? 'rgba(245,240,232,0.85)' : '#8A7F6E';

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
          backgroundColor: '#1A1814',
          color: '#C4B49A',
          textAlign: 'center',
          padding: '9px 16px',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          transition: 'opacity 0.4s ease',
          opacity: fade ? 1 : 0,
        }}
      >
        {announcements[announcementIndex]}
      </div>

      {/* ── Main Nav ── */}
      <div
        style={{
          backgroundColor: navBg,
          borderBottom: navBorder,
          boxShadow: scrolled ? '0 1px 16px rgba(26,24,20,0.07)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: '90px' }}>

            {/* Logo — left on desktop, clipped to nav height */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              style={{ overflow: 'hidden', height: '90px' }}
            >
              <img
                src={semperaLogo}
                alt="Sempéra Fashion"
                style={{
                  height: '300px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  marginLeft: '-50px',
                  filter: logoFilter,
                  transition: 'filter 0.4s ease',
                  flexShrink: 0,
                }}
              />
            </Link>

            {/* Desktop Nav links */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) =>
                isAnchor(item.href) ? (
                  <button
                    key={item.label}
                    onClick={() => handleAnchorClick(item.href)}
                    className="nav-link bg-transparent border-none p-0"
                    style={{ color: linkColor }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="nav-link"
                    style={{ color: linkColor }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop right icons */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Wishlist */}
              <button
                className="nav-link bg-transparent border-none p-0"
                aria-label="Wishlist"
                style={{ color: linkColor }}
              >
                <Heart size={17} />
              </button>

              {/* Bag */}
              <button
                onClick={() => openCart(true)}
                className="nav-link flex items-center gap-1.5 bg-transparent border-none p-0"
                aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
                style={{ color: linkColor }}
              >
                <span className="relative flex items-center">
                  <ShoppingBag size={17} />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2.5 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: '#C4B49A', color: '#1A1814', fontSize: '0.55rem', minWidth: '15px', height: '15px', padding: '0 3px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                    >
                      {cartCount}
                    </span>
                  )}
                </span>
              </button>

              {/* Account */}
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="nav-link flex items-center gap-1.5"
                    title="My orders"
                    style={{ color: linkColor }}
                  >
                    <UserIcon size={16} />
                    {firstName}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="nav-link flex items-center gap-1 bg-transparent border-none p-0"
                    title="Log out"
                    style={{ color: linkColor }}
                  >
                    <LogOut size={14} />
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="nav-link flex items-center gap-1.5"
                  style={{ color: linkColor }}
                >
                  <UserIcon size={16} />
                  Log In
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ color: isTransparent ? '#F5F0E8' : '#1A1814' }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              backgroundColor: '#F5F0E8',
              borderTop: '0.5px solid #C4B49A',
              padding: '24px',
            }}
            className="lg:hidden"
          >
            {/* Centered logo on mobile */}
            <div className="flex justify-center mb-6">
              <img src={semperaLogo} alt="Sempéra" style={{ height: '180px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <nav className="flex flex-col gap-5">
              {navItems.map((item) =>
                isAnchor(item.href) ? (
                  <button
                    key={item.label}
                    onClick={() => handleAnchorClick(item.href)}
                    className="nav-link text-left bg-transparent border-none p-0"
                    style={{ fontSize: '11px' }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-link"
                    style={{ fontSize: '11px' }}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div style={{ height: '0.5px', background: '#C4B49A', margin: '4px 0' }} />

              <button
                onClick={() => { setMenuOpen(false); openCart(true); }}
                className="nav-link text-left flex items-center gap-2 bg-transparent border-none p-0"
                style={{ fontSize: '11px' }}
              >
                <ShoppingBag size={15} /> Bag{cartCount > 0 ? ` (${cartCount})` : ''}
              </button>

              {user ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="nav-link flex items-center gap-2"
                    style={{ fontSize: '11px' }}
                  >
                    <UserIcon size={15} /> My Orders
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); signOut(); }}
                    className="nav-link text-left flex items-center gap-2 bg-transparent border-none p-0"
                    style={{ fontSize: '11px' }}
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="nav-link flex items-center gap-2"
                  style={{ fontSize: '11px' }}
                >
                  <UserIcon size={15} /> Log In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
