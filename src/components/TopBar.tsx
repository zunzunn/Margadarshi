import { useState, useEffect } from 'react'
import type { Lang, TranslationSet } from '@/translations'
import type { Provider } from '@/data/providerConfig'
import { getProviderConfig, saveApiKey, removeApiKey, getApiKey } from '@/stores/provider'

interface TopBarProps {
  lang: Lang
  t: TranslationSet
  provider: Provider
  onLangChange: (lang: Lang) => void
  onProviderChange: (provider: Provider) => void
}

export default function TopBar({ lang, t, provider, onLangChange, onProviderChange }: TopBarProps) {
  const [open, setOpen] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [status, setStatus] = useState<{ msg: string; cls: string } | null>(null)

  useEffect(() => {
    const stored = getApiKey(provider)
    if (stored) setKeyInput(stored)
  }, [provider])

  function handleSave() {
    if (keyInput.trim()) {
      saveApiKey(provider, keyInput.trim())
      setStatus({ msg: t.keySaved, cls: 'text-apple-green' })
    } else {
      removeApiKey(provider)
      setStatus({ msg: t.keyRemoved, cls: 'text-red-400' })
    }
    setTimeout(() => setStatus(null), 1500)
  }

  const conf = getProviderConfig(provider)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/20" style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div className="max-w-[680px] mx-auto px-5 md:px-8">
        <div className="flex items-center justify-center py-2.5 border-b border-apple-border/20">
          <div className="bg-apple-bg rounded-[980px] p-0.5 flex shadow-sm border border-apple-border/30">
            {(['en', 'hi', 'kn', 'ml', 'ta', 'kok', 'te'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[980px] transition-all duration-200 cursor-pointer ${
                  lang === l
                    ? 'bg-white text-apple-text shadow-sm'
                    : 'text-apple-secondary hover:text-apple-text'
                }`}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'HI' : l === 'kn' ? 'KN' : l === 'ml' ? 'ML' : l === 'ta' ? 'TA' : l === 'kok' ? 'KOK' : 'TE'}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3 text-sm font-medium text-apple-secondary hover:text-apple-text transition-colors focus:outline-none cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{t.settingsLabel}</span>
            {t.settingsLabelKn && (
              <span className="text-xs text-apple-secondary/60 font-normal">{t.settingsLabelKn}</span>
            )}
          </span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="pb-5">
            <p className="text-xs text-apple-secondary/60 mb-2.5 leading-relaxed">Select API Provider</p>
            <div className="bg-apple-bg rounded-[980px] p-0.5 flex shadow-sm border border-apple-border/30 mb-3.5 self-start">
              {(['groq', 'gemini'] as Provider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onProviderChange(p)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-[980px] transition-all duration-200 cursor-pointer ${
                    provider === p
                      ? 'bg-white text-apple-text shadow-sm'
                      : 'text-apple-secondary hover:text-apple-text'
                  }`}
                >
                  {p === 'groq' ? 'Groq' : 'Gemini'}
                </button>
              ))}
            </div>
            <p className="text-xs text-apple-secondary/80 mb-3 leading-relaxed">{conf.desc}</p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder={conf.placeholder}
                className="flex-grow px-4 py-2.5 bg-white rounded-xl text-sm border border-apple-border/60 focus:outline-none focus:border-apple-blue transition-colors text-apple-text placeholder:text-apple-secondary/40"
              />
              <button
                onClick={handleSave}
                className="bg-apple-text hover:bg-black text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.97] cursor-pointer"
              >
                {t.saveKey}
              </button>
            </div>
            {status && (
              <p className={`text-xs font-medium mt-2.5 ${status.cls}`}>{status.msg}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
