import { type FormEvent, useMemo, useState } from 'react'
import {
  COMMUNITY_CATEGORIES,
  createCommunityComment,
  createCommunityPost,
  loadCommunityPosts,
  saveCommunityPosts,
  type CommunityCategory,
  type CommunityPost,
  type VoteValue,
} from '@/stores/community'

type SortMode = 'Hot' | 'New' | 'Most discussed'
type CategoryFilter = 'All' | CommunityCategory

const SORT_MODES: SortMode[] = ['Hot', 'New', 'Most discussed']
const TRENDING_TOPICS = ['KCET choice filling', 'Low-fee CSE', 'Girls hostel safety', 'BCA vs B.Sc CS', 'Scholarship documents']

function formatTime(value: string) {
  const date = new Date(value)
  const diff = Date.now() - date.getTime()
  const minutes = Math.max(1, Math.floor(diff / 60000))

  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function splitTags(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 5)
}

function matchesQuery(post: CommunityPost, query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true

  const haystack = [
    post.title,
    post.body,
    post.category,
    post.author,
    ...post.tags,
    ...post.comments.flatMap((comment) => [comment.author, comment.body]),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(normalized)
}

function PostVote({
  score,
  userVote,
  onVote,
}: {
  score: number
  userVote: VoteValue
  onVote: (vote: VoteValue) => void
}) {
  return (
    <div className="flex sm:flex-col items-center gap-1.5 sm:w-11">
      <button
        type="button"
        onClick={() => onVote(userVote === 1 ? 0 : 1)}
        aria-label="Upvote post"
        className={`h-8 w-8 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
          userVote === 1
            ? 'bg-apple-text text-white border-apple-text'
            : 'bg-white/80 text-apple-secondary border-apple-border/50 hover:text-apple-text'
        }`}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-apple-text">{score}</span>
      <button
        type="button"
        onClick={() => onVote(userVote === -1 ? 0 : -1)}
        aria-label="Downvote post"
        className={`h-8 w-8 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
          userVote === -1
            ? 'bg-red-500 text-white border-red-500'
            : 'bg-white/80 text-apple-secondary border-apple-border/50 hover:text-apple-text'
        }`}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

function PostCard({
  post,
  expanded,
  onToggle,
  onVote,
  onComment,
}: {
  post: CommunityPost
  expanded: boolean
  onToggle: () => void
  onVote: (vote: VoteValue) => void
  onComment: (body: string) => void
}) {
  const [comment, setComment] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = comment.trim()
    if (!body) return
    onComment(body)
    setComment('')
  }

  return (
    <article className="apple-card rounded-2xl p-4 sm:p-5 reveal-fast shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <PostVote score={post.score} userVote={post.userVote} onVote={onVote} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-apple-secondary mb-2">
            <span className="bg-white/80 border border-apple-border/50 rounded-full px-2.5 py-1 font-medium text-apple-text">
              {post.category}
            </span>
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>
            <span>{formatTime(post.createdAt)}</span>
          </div>
          <button type="button" onClick={onToggle} className="block text-left cursor-pointer group">
            <h2 className="text-lg sm:text-xl font-semibold leading-snug text-apple-text group-hover:text-apple-blue transition-colors">
              {post.title}
            </h2>
          </button>
          <p className="text-sm leading-relaxed text-apple-text/75 mt-2">{post.body}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium text-apple-secondary bg-apple-bg/80 rounded-full px-2.5 py-1">
                #{tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-apple-secondary hover:text-apple-text transition-colors cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a10.7 10.7 0 01-3.36-.53L3 20l1.55-3.1A7.4 7.4 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.comments.length} comments
          </button>

          {expanded && (
            <div className="mt-5 border-t border-apple-border/40 pt-4 space-y-4">
              {post.comments.length > 0 ? (
                post.comments.map((item) => (
                  <div key={item.id} className="bg-white/65 rounded-xl border border-apple-border/30 p-3">
                    <div className="flex items-center gap-2 text-[11px] text-apple-secondary mb-1.5">
                      <span className="font-semibold text-apple-text">{item.author}</span>
                      <span aria-hidden="true">•</span>
                      <span>{formatTime(item.createdAt)}</span>
                    </div>
                    <p className="text-sm text-apple-text/75 leading-relaxed">{item.body}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-apple-secondary">No replies yet. Add the first helpful answer.</p>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a helpful reply..."
                  className="flex-1 bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
                />
                <button
                  type="submit"
                  className="bg-apple-text hover:bg-black text-white font-medium text-sm px-5 py-3 rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  Reply
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(loadCommunityPosts)
  const [sort, setSort] = useState<SortMode>('Hot')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [query, setQuery] = useState('')
  const [expandedId, setExpandedId] = useState(posts[0]?.id ?? '')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [newCategory, setNewCategory] = useState<CommunityCategory>('College comparison')
  const [tags, setTags] = useState('')

  function updatePosts(next: CommunityPost[]) {
    setPosts(next)
    saveCommunityPosts(next)
  }

  function handleCreatePost(e: FormEvent) {
    e.preventDefault()
    const cleanTitle = title.trim()
    const cleanBody = body.trim()
    if (!cleanTitle || !cleanBody) return

    const post = createCommunityPost({
      title: cleanTitle,
      body: cleanBody,
      category: newCategory,
      tags: splitTags(tags),
    })
    updatePosts([post, ...posts])
    setExpandedId(post.id)
    setTitle('')
    setBody('')
    setTags('')
  }

  function handleVote(postId: string, nextVote: VoteValue) {
    updatePosts(
      posts.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          score: post.score - post.userVote + nextVote,
          userVote: nextVote,
        }
      }),
    )
  }

  function handleComment(postId: string, commentBody: string) {
    updatePosts(
      posts.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: [...post.comments, createCommunityComment(commentBody)],
        }
      }),
    )
  }

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => category === 'All' || post.category === category)
      .filter((post) => matchesQuery(post, query))
      .sort((a, b) => {
        if (sort === 'New') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        if (sort === 'Most discussed') return b.comments.length - a.comments.length || b.score - a.score
        return b.score + b.comments.length * 2 - (a.score + a.comments.length * 2)
      })
  }, [posts, category, query, sort])

  return (
    <div className="community-shell pb-8">
      <header className="mb-6 reveal">
        <p className="text-sm font-semibold text-apple-secondary tracking-widest uppercase">Student Community</p>
        <h1 className="text-[2rem] sm:text-[2.6rem] font-semibold tracking-tight text-apple-text leading-tight mt-2">
          Discuss college preferences
        </h1>
        <p className="text-sm sm:text-base text-apple-secondary leading-relaxed mt-2 max-w-2xl">
          Ask seniors and other students about colleges, fees, hostel life, admissions, commute, and scholarships before choosing.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
        <section className="space-y-4 min-w-0">
          <div className="apple-card rounded-2xl p-4 shadow-sm reveal">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-apple-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search college, course, district, or topic"
                  className="w-full bg-white border border-apple-border/60 rounded-xl pl-10 pr-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(['All', ...COMMUNITY_CATEGORIES] as CategoryFilter[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      category === item
                        ? 'bg-apple-text text-white border-apple-text'
                        : 'bg-white/80 text-apple-secondary border-apple-border/50 hover:text-apple-text'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-apple-secondary">{filteredPosts.length} discussions</p>
                <div className="bg-apple-bg rounded-full p-0.5 flex border border-apple-border/30">
                  {SORT_MODES.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSort(mode)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        sort === mode ? 'bg-white text-apple-text shadow-sm' : 'text-apple-secondary hover:text-apple-text'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                expanded={expandedId === post.id}
                onToggle={() => setExpandedId(expandedId === post.id ? '' : post.id)}
                onVote={(vote) => handleVote(post.id, vote)}
                onComment={(commentBody) => handleComment(post.id, commentBody)}
              />
            ))
          ) : (
            <div className="apple-card rounded-2xl p-8 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-apple-text">No discussions found</h2>
              <p className="text-sm text-apple-secondary mt-2">Try another search or start a new discussion for this topic.</p>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-36">
          <form onSubmit={handleCreatePost} className="apple-card rounded-2xl p-5 shadow-sm reveal">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-header-icon bg-apple-text text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <h2 className="text-base font-semibold text-apple-text">Start a discussion</h2>
            </div>
            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Question title"
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as CommunityCategory)}
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors"
              >
                {COMMUNITY_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags, comma separated"
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors placeholder:text-apple-secondary/40"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                placeholder="Describe your college preference doubt..."
                className="w-full bg-white border border-apple-border/60 rounded-xl px-4 py-3 text-sm text-apple-text focus:outline-none focus:border-apple-blue transition-colors resize-none placeholder:text-apple-secondary/40"
              />
              <button
                type="submit"
                className="w-full bg-apple-text hover:bg-black text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.97] cursor-pointer"
              >
                Post discussion
              </button>
            </div>
          </form>

          <div className="apple-card rounded-2xl p-5 shadow-sm reveal">
            <h2 className="text-base font-semibold text-apple-text mb-3">Trending topics</h2>
            <div className="space-y-2">
              {TRENDING_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setQuery(topic)}
                  className="w-full text-left bg-white/75 border border-apple-border/40 rounded-xl px-3 py-2.5 text-sm text-apple-text hover:border-apple-text transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
