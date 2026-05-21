import { type FormEvent, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { login } from '@/stores/auth'

const COLORS = ['#72b9bb', '#b5d9d9', '#ffd1bd', '#ffebe0', '#8cc5b8', '#dbf4a4']

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const user = (form.elements.namedItem('username') as HTMLInputElement).value.trim()
    const pass = (form.elements.namedItem('password') as HTMLInputElement).value.trim()

    if (login(user, pass)) {
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
        <div className="text-center mb-7">
          <p className="text-sm font-medium text-apple-secondary tracking-widest uppercase">
            Login
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
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
            <p className="text-xs text-red-400 text-center">Invalid username or password</p>
          )}
          <button
            type="submit"
            className="w-full bg-apple-text hover:bg-black text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
