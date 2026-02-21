import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import semperaLogo from '@/assets/sempera-logo.png';

const navItems = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collection', href: '/collection' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

interface SemperaNavProps {
  onRequestPiece?: () => void;
}

export default function SemperaNav({ onRequestPiece }: SemperaNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={semperaLogo} alt="Sempera Fashion" className="h-44 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) =>
              item.href.startsWith('/#') ? (
                <button
                  key={item.label}
                  onClick={() => handleAnchorClick(item.href)}
                  className="nav-link bg-transparent border-none p-0"
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} to={item.href} className="nav-link">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onRequestPiece} className="btn-gold text-sm">
              Request a Piece
            </button>
          </div>

          {/* Mobile menu button */}
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
            {navItems.map((item) =>
              item.href.startsWith('/#') ? (
                <button
                  key={item.label}
                  onClick={() => handleAnchorClick(item.href)}
                  className="nav-link text-left bg-transparent border-none p-0 text-base"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="nav-link text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
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
    </header>
  );
}
