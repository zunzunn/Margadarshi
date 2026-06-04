import { useState, useCallback } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import LoginPage from '@/components/LoginPage'
import TopBar from '@/components/TopBar'
import FormPage from '@/components/FormPage'
import LoadingPage from '@/components/LoadingPage'
import ResultsPage from '@/components/ResultsPage'
import CommunityPage from '@/components/CommunityPage'
import { isLoggedIn, logout as authLogout } from '@/stores/auth'
import { getCurrentLang, setCurrentLang, getTranslations } from '@/stores/language'
import { getCurrentProvider, setCurrentProvider, getApiKey } from '@/stores/provider'
import { parseMarkdown, getAIRecommendations } from '@/data/markdownParser'
import type { Lang, TranslationSet } from '@/translations'
import type { Provider } from '@/data/providerConfig'

const BG_COLORS = ['#72b9bb', '#b5d9d9', '#ffd1bd', '#ffebe0', '#8cc5b8', '#dbf4a4']

type Page = 'Form' | 'Loading' | 'Results'
type AppView = 'Guidance' | 'Community'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  const [lang, setLang] = useState<Lang>(getCurrentLang)
  const [provider, setProvider] = useState<Provider>(getCurrentProvider)
  const [view, setView] = useState<AppView>('Guidance')
  const [page, setPage] = useState<Page>('Form')
  const [isProcessing, setIsProcessing] = useState(false)
  const [sections, setSections] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const t: TranslationSet = getTranslations(lang)

  const handleLogin = useCallback(() => {
    setLoggedIn(true)
    setView('Guidance')
    setPage('Form')
  }, [])

  const handleLogout = useCallback(() => {
    authLogout()
    setLoggedIn(false)
    setView('Guidance')
  }, [])

  const handleLangChange = useCallback((l: Lang) => {
    setCurrentLang(l)
    setLang(l)
  }, [])

  const handleProviderChange = useCallback((p: Provider) => {
    setCurrentProvider(p)
    setProvider(p)
  }, [])

  const handleFormSubmit = useCallback(async () => {
    const apiKey = getApiKey(provider)
    if (!apiKey) {
      setError(t.noKeyError)
      return
    }
    setError(null)

    const classSelect = document.getElementById('classGrade') as HTMLSelectElement
    const boardSelect = document.getElementById('board') as HTMLSelectElement
    const mediumSelect = document.getElementById('medium') as HTMLSelectElement
    const marksInput = document.getElementById('marks') as HTMLInputElement
    const subjectsInput = document.getElementById('strongSubjects') as HTMLInputElement
    const streamSelect = document.getElementById('stream') as HTMLSelectElement
    const collegeTypeSelect = document.getElementById('collegeType') as HTMLSelectElement
    const staySelect = document.getElementById('stay') as HTMLSelectElement
    const incomeSelect = document.getElementById('income') as HTMLSelectElement
    const budgetSelect = document.getElementById('budget') as HTMLSelectElement
    const prefCourseInput = document.getElementById('prefCourse') as HTMLInputElement
    const interestInput = document.getElementById('coreInterest') as HTMLTextAreaElement

    const classGrade = classSelect?.value
    const board = boardSelect?.value
    const medium = mediumSelect?.value
    const marks = marksInput?.value
    const strongSubjects = subjectsInput?.value || 'None specified'
    const stream = streamSelect?.value
    const collegeType = collegeTypeSelect?.value
    const stay = staySelect?.value
    const income = incomeSelect?.value
    const budget = budgetSelect?.value
    const prefCourse = prefCourseInput?.value || 'Not specified'
    const coreInterest = interestInput?.value

    setIsProcessing(true)
    setPage('Loading')

    try {
      const result = await getAIRecommendations(apiKey, classGrade, board, medium, marks, strongSubjects, stream, collegeType, stay, income, budget, prefCourse, coreInterest, lang, provider)
      setSections([
        parseMarkdown(result[0], t.noContent),
        parseMarkdown(result[1], t.noContent),
        parseMarkdown(result[2], t.noContent),
      ])
      setTimeout(() => {
        setPage('Results')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorMsg)
      setPage('Form')
    } finally {
      setIsProcessing(false)
    }
  }, [provider, t, lang])

  const handleBackToForm = useCallback(() => {
    setPage('Form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleViewChange = useCallback((nextView: AppView) => {
    setView(nextView)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-apple-bg">
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <MeshGradient
          colors={BG_COLORS}
          distortion={0.8}
          swirl={0.6}
          speed={0.42}
          offsetX={0.08}
          fit="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="fixed inset-0 bg-white/30" style={{ zIndex: 1 }} />
      <TopBar
        lang={lang}
        t={t}
        provider={provider}
        onLangChange={handleLangChange}
        onProviderChange={handleProviderChange}
      />
      <main
        className={`relative flex-grow w-full mx-auto px-5 sm:px-8 pt-36 pb-16 md:pt-40 md:pb-20 ${
          view === 'Community' ? 'max-w-[1180px]' : 'max-w-[680px]'
        }`}
        style={{ zIndex: 2 }}
      >
        <nav className="apple-card rounded-2xl p-1.5 mb-7 shadow-sm reveal flex gap-1.5">
          {(['Guidance', 'Community'] as AppView[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleViewChange(item)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                view === item
                  ? 'bg-apple-text text-white shadow-sm'
                  : 'text-apple-secondary hover:text-apple-text hover:bg-white/60'
              }`}
            >
              {item === 'Guidance' ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5M7.5 12h9M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a10.7 10.7 0 01-3.36-.53L3 20l1.55-3.1A7.4 7.4 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              )}
              <span>{item}</span>
            </button>
          ))}
        </nav>

        {view === 'Guidance' && error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/60 p-5 mb-8 rounded-2xl reveal shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-red-800">{t.errorTitle}</h3>
                <p className="text-sm text-red-700/80 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {view === 'Guidance' && page === 'Form' && (
          <FormPage t={t} onSubmit={handleFormSubmit} onLogout={handleLogout} isProcessing={isProcessing} />
        )}
        {view === 'Guidance' && page === 'Loading' && <LoadingPage t={t} />}
        {view === 'Guidance' && page === 'Results' && <ResultsPage t={t} sections={sections} onBackToForm={handleBackToForm} />}
        {view === 'Community' && <CommunityPage />}
      </main>
    </div>
  )
}
