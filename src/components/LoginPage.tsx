import { type FormEvent, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { guestLogin, emailLogin } from '@/stores/auth'

const COLORS = ['#72b9bb', '#b5d9d9', '#ffd1bd', '#ffebe0', '#8cc5b8', '#dbf4a4']

interface LoginPageProps {
  onLogin: () => void
}

type Mode = 'choice' | 'email'

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<Mode>('choice')
  const [error, setError] = useState(false)

  function handleGuest() {
    guestLogin()
    onLogin()
  }

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const pass = (form.elements.namedItem('password') as HTMLInputElement).value.trim()

    if (emailLogin(email, pass)) {
      setError(false)
      onLogin()
    } else {
      setError(true)
      ;(form.elements.namedItem('password') as HTMLInputElement).value = ''
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-apple-bg">
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <MeshGradient
          colors={COLORS}
          distortion={0.8}
          swirl={0.6}
          speed={0.42}
          offsetX={0.08}
          fit="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="fixed inset-0 bg-white/30" style={{ zIndex: 1 }} />
      <div className="relative z-10 text-center mb-6">
        <h1 className="text-[2.5rem] md:text-[3.25rem] font-semibold tracking-tight text-apple-text leading-[1.1]">
          Margadarshi
        </h1>
        <p className="text-sm md:text-base text-apple-secondary mt-2 leading-relaxed">
          AI Career Guidance for Rural Students
        </p>
      </div>
      <div className="relative apple-card rounded-2xl w-full max-w-sm p-8 shadow-sm login-card" style={{ zIndex: 2 }}>
        {mode === 'choice' ? (
          <>
            <div className="text-center mb-7">
              <p className="text-sm font-medium text-apple-secondary tracking-widest uppercase">
                Login
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleGuest}
                className="w-full bg-apple-text hover:bg-black text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer"
              >
                Continue as Guest
              </button>
              <button
                onClick={() => setMode('email')}
                className="w-full bg-white border border-apple-border/60 hover:border-apple-text text-apple-text font-medium text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer"
              >
                Sign in with Email
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-7">
              <p className="text-sm font-medium text-apple-secondary tracking-widest uppercase">
                Sign In
              </p>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
              />
              {error && (
                <p className="text-xs text-red-400 text-center">Invalid email or password</p>
              )}
              <button
                type="submit"
                className="w-full bg-apple-text hover:bg-black text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer"
              >
                Sign In
              </button>
            </form>
            <button
              onClick={() => setMode('choice')}
              className="mt-4 text-xs text-apple-secondary hover:text-apple-text transition-colors cursor-pointer mx-auto block"
            >
              ← Back to options
            </button>
          </>
        )}
      </div>
    </div>
  )
}
