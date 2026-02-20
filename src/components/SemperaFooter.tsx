import { Link } from 'react-router-dom';
import semperaLogo from '@/assets/sempera-logo.png';

export default function SemperaFooter() {
  return (
    <footer className="bg-background border-t border-border/60 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={semperaLogo} alt="Sempera Fashion" className="h-14 w-auto mb-5" />
            <p
              className="font-sans text-muted-foreground max-w-xs"
              style={{ fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}
            >
              Luxury ready-to-wear for the modern, elegant woman. Crafted with intention. Worn with grace.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-sans text-foreground mb-5"
              style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {['Shop', 'Collection', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
                    style={{ fontSize: '0.9rem', fontWeight: 300 }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-sans text-foreground mb-5"
              style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@semperafashion.com"
                  className="font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
                  style={{ fontSize: '0.9rem', fontWeight: 300 }}
                >
                  hello@semperafashion.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/semperafashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
                  style={{ fontSize: '0.9rem', fontWeight: 300 }}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
                  style={{ fontSize: '0.9rem', fontWeight: 300 }}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-sans text-muted-foreground"
            style={{ fontSize: '0.8rem', fontWeight: 300, letterSpacing: '0.05em' }}
          >
            © {new Date().getFullYear()} Sempera Fashion. All rights reserved.
          </p>
          <p
            className="font-serif text-primary"
            style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 300 }}
          >
            Designed with Grace.
          </p>
        </div>
      </div>
    </footer>
  );
}
