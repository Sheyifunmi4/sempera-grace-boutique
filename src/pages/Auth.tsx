import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import semperaLogo from '@/assets/sempera-logo.png';

type Mode = 'login' | 'signup';

export default function Auth() {
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirectTo = params.get('redirect') || '/';

  const [mode, setMode] = useState<Mode>('login');
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');

  // Already signed in → bounce to where they were headed.
  useEffect(() => {
    if (!loading && user) navigate(redirectTo, { replace: true });
  }, [loading, user, navigate, redirectTo]);

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setConfirmMsg('');

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && !form.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setBusy(true);
    if (mode === 'signup') {
      const { error, needsConfirmation } = await signUp(
        form.email.trim(),
        form.password,
        form.fullName.trim()
      );
      setBusy(false);
      if (error) return setError(error);
      if (needsConfirmation) {
        setConfirmMsg(
          `We've sent a confirmation link to ${form.email}. Please confirm your email, then log in.`
        );
        setMode('login');
        return;
      }
      navigate(redirectTo, { replace: true });
    } else {
      const { error } = await signIn(form.email.trim(), form.password);
      setBusy(false);
      if (error) return setError(error);
      navigate(redirectTo, { replace: true });
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setBusy(false);
      setError(error);
    }
    // On success the browser redirects to Google, so no further action here.
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-16">
      <Link to="/" className="mb-2">
        <img src={semperaLogo} alt="Sempera Fashion" style={{ height: '120px', width: 'auto', objectFit: 'contain' }} />
      </Link>

      <div className="w-full max-w-md shadow-xl p-8 lg:p-10" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="text-center mb-8">
          <p className="section-eyebrow mb-3">Sempera Fashion</p>
          <h1 className="font-serif text-foreground" style={{ fontSize: '1.9rem', fontWeight: 300 }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <span className="gold-divider mx-auto mt-4" />
        </div>

        {confirmMsg && (
          <p className="text-sm text-center mb-5 p-3" style={{ background: 'hsl(var(--muted))', color: '#7a6a52' }}>
            {confirmMsg}
          </p>
        )}

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border font-sans text-sm transition-colors duration-300 hover:bg-cream"
          style={{ borderColor: 'hsl(var(--border))', opacity: busy ? 0.6 : 1 }}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <span className="flex-1 h-px bg-border" />
          <span className="section-eyebrow text-muted-foreground">or</span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block section-eyebrow text-foreground mb-2">Full Name *</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                maxLength={100}
                className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300"
                style={{ borderColor: '#C4B49A', backgroundColor: '#FFFFFF', color: '#1A1814' }}
                placeholder="Your full name"
              />
            </div>
          )}

          <div>
            <label className="block section-eyebrow text-foreground mb-2">Email Address *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              maxLength={255}
              className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground"
              style={{ borderColor: 'hsl(var(--border))' }}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block section-eyebrow text-foreground mb-2">Password *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              maxLength={72}
              className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground"
              style={{ borderColor: 'hsl(var(--border))' }}
              placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
            />
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="btn-gold w-full flex items-center justify-center gap-2"
            style={{ opacity: busy ? 0.7 : 1, cursor: busy ? 'not-allowed' : 'pointer' }}
          >
            {busy ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Please wait…
              </>
            ) : mode === 'login' ? (
              'Log In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center mt-6 font-sans text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
              setConfirmMsg('');
            }}
            className="text-primary hover:underline font-medium"
            style={{ color: '#b8965a' }}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>

      <Link to="/" className="mt-6 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back to shop
      </Link>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
