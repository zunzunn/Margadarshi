import { useState, useRef, useEffect } from 'react'
import { chatWithAI, parseMarkdown } from '@/data/markdownParser'
import type { StudentProfile } from '@/data/markdownParser'
import type { TranslationSet } from '@/translations'

type SpeechRecognitionInstance = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: { results: Array<Array<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: ((e: { error: string }) => void) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance
    webkitSpeechRecognition: new () => SpeechRecognitionInstance
  }
}

interface ChatBotProps {
  t: TranslationSet
  apiKey: string | null
  provider: string
  lang: string
  formData: StudentProfile | null
  rawSections: string[]
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function getSpeechLang(lang: string): string {
  const map: Record<string, string> = {
    en: 'en-US',
    hi: 'hi-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    ta: 'ta-IN',
    te: 'te-IN',
  }
  return map[lang] || 'en-US'
}

export default function ChatBot({ t, apiKey, provider, lang, formData, rawSections }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasMic = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

  function toggleMic() {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = getSpeechLang(lang)

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('')
      setInput(transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognition.start()
    recognitionRef.current = recognition
    setIsListening(true)
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || isLoading || !apiKey || !formData) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setIsLoading(true)

    try {
      const reply = await chatWithAI(apiKey, provider, formData, rawSections, text, lang)
      const html = parseMarkdown(reply, '')
      setMessages(prev => [...prev, { role: 'assistant', content: html }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '<p class="text-red-400 text-sm">Sorry, something went wrong. Please try again.</p>',
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="apple-card rounded-2xl overflow-hidden reveal shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-black/[0.02] transition-colors"
      >
        <span className="flex items-center gap-2.5 text-sm font-semibold text-apple-text">
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a10.7 10.7 0 01-3.36-.53L3 20l1.55-3.1A7.4 7.4 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Ask a follow-up question
        </span>
        <svg
          className={`h-4 w-4 text-apple-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-apple-border/30">
          <div className="max-h-80 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-xs text-apple-secondary/60 text-center py-6">
                Ask anything about your recommendations — colleges, scholarships, deadlines, or next steps.
              </p>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' ? (
                  <div className="apple-card rounded-xl px-4 py-3 text-sm leading-relaxed text-apple-text/80 max-w-[85%]">
                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                  </div>
                ) : (
                  <div className="bg-apple-text text-white rounded-xl px-4 py-3 text-sm leading-relaxed max-w-[85%]">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="apple-card rounded-xl px-4 py-3 text-sm text-apple-secondary/60 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <div className="spinner !w-4 !h-4 !border-2" />
                    Thinking...
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-apple-border/30 px-4 py-3 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 bg-white/60 border border-apple-border/40 rounded-xl px-4 py-2.5 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40 disabled:opacity-50"
            />

            {hasMic && (
              <button
                onClick={toggleMic}
                disabled={isLoading}
                className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 ${
                  isListening
                    ? 'bg-red-50 text-red-500 animate-pulse'
                    : 'bg-white border border-apple-border/40 text-apple-secondary hover:border-apple-text hover:text-apple-text'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            )}

            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !apiKey || !formData}
              className="shrink-0 h-9 w-9 flex items-center justify-center rounded-xl bg-apple-text text-white transition-all duration-200 active:scale-[0.95] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
