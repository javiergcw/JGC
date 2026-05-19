export type BlogPostMeta = {
  slug: string
  date: string
  id: string
  title: string
  readTime: string
  /** When true, full article body is shown on the post page. */
  hasContent: boolean
  /** Indexed entry visible in ~/logs with pending banner (LinkedIn rollout). */
  pendingPublication: boolean
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'architecting-distributed-caches-in-rust',
    date: '2024-05-12',
    id: 'LOG.042',
    title: 'Architecting Distributed Caches in Rust',
    readTime: '12_MIN',
    hasContent: false,
    pendingPublication: true,
  },
  {
    slug: 'postgresql-partitioning-at-scale',
    date: '2024-04-28',
    id: 'LOG.041',
    title: 'PostgreSQL Partitioning at Scale',
    readTime: '08_MIN',
    hasContent: false,
    pendingPublication: true,
  },
  {
    slug: 'why-i-abandoned-microservices',
    date: '2024-03-15',
    id: 'LOG.040',
    title: 'Why I Abandoned Microservices (For Now)',
    readTime: '15_MIN',
    hasContent: false,
    pendingPublication: true,
  },
  {
    slug: 'building-type-safe-api-trpc',
    date: '2024-02-02',
    id: 'LOG.039',
    title: 'Building a Type-Safe API with tRPC',
    readTime: '05_MIN',
    hasContent: false,
    pendingPublication: true,
  },
]

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function isBlogPostPending(post: BlogPostMeta) {
  return post.pendingPublication || !post.hasContent
}
