import { Link, Navigate, useParams } from 'react-router-dom'
import PendingPublication from '../components/blog/PendingPublication'
import { getBlogPost, isBlogPostPending } from '../data/blogPosts'
import { ROUTES } from '../lib/routes'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE } from '../lib/site'

const DIAGRAM_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCGeICtLu0zOoT_KAdxWhBx-2LiYpwwniijmT5JHpUk2Ln6Vp1nZT2_zmvFg7YbAjIpWxm4cACRR-mTUtNxlYMdGFIxFabgvK0QlDpPihm1W4sue9NXIoOSDYYmJ6JnLm5yTssrRbQTaKjhU0QpPPPqLyLrr1HpCVzRvQnxycPd9RHWU3owAKAF2wmeZi-pr1OF5qVxBuHV4mJVPoEHdkZOkfHuFfmlLxJqwZJ30q0R-4TmC7ld7rrbUFCwZTlGMevTsaES-4w43_hQ'

const LRU_CODE = `use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

struct Node<K, V> {
    key: K,
    value: V,
    prev: Option<Rc<RefCell<Node<K, V>>>>,
    next: Option<Rc<RefCell<Node<K, V>>>>,
}

pub struct LruCache<K, V> {
    capacity: usize,
    map: HashMap<K, Rc<RefCell<Node<K, V>>>>,
    // ... list head and tail pointers omitted for brevity
}`

const LINE_NUMBERS = Array.from({ length: 15 }, (_, i) =>
  String(i + 1).padStart(2, '0'),
)

function DistributedCacheArticle() {
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(LRU_CODE)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <>
      <header className="mb-12 border-b border-border-dark pb-8">
        <div className="font-mono text-xs text-muted mb-6 flex flex-wrap gap-4 uppercase tracking-widest border border-border-dark p-3 bg-surface w-fit">
          <div>
            <span className="text-text-main">AUTHOR:</span> {SITE.author.name}
          </div>
          <div className="text-border-dark">|</div>
          <div>
            <span className="text-text-main">DATE:</span> 2024-05-12
          </div>
          <div className="text-border-dark">|</div>
          <div>
            <span className="text-text-main">HASH:</span>{' '}
            <span className="text-primary">a7f9b2c</span>
          </div>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight text-text-main mb-6">
          Building a Distributed Cache in Rust
        </h1>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['ARCHITECTURE', 'RUST', 'SYSTEMS'].map((tag) => (
            <span
              key={tag}
              className="border border-border-dark px-2 py-1 text-muted hover:border-primary hover:text-primary cursor-default"
            >
              [{tag}]
            </span>
          ))}
        </div>
      </header>

      <article className="article-prose prose prose-invert max-w-none">
        <p>
          The necessity for a high-throughput, low-latency distributed cache
          became apparent when our monolithic Postgres instance started dropping
          connections under burst loads. Standard solutions like Redis or
          Memcached were evaluated, but we required specific consistency
          guarantees and custom eviction policies that were cumbersome to
          implement as extensions. The decision was made to build a custom
          solution using Rust.
        </p>

        <div className="my-8 border border-border-dark p-6 bg-surface relative not-prose">
          <div className="absolute -top-3 left-4 bg-background-dark px-2 font-mono text-xs text-muted">
            EXHIBIT.A // SYSTEM DIAGRAM
          </div>
          <img
            alt="Distributed systems topology diagram: publisher nodes, broker core, and subscriber services connected in a gossip protocol architecture"
            className="w-full aspect-video object-cover grayscale opacity-80 mix-blend-screen contrast-125 border border-border-dark mt-2"
            src={DIAGRAM_IMAGE}
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div className="font-mono text-xs text-muted mt-4 text-center">
            FIG 1. Multi-node gossip protocol architecture.
          </div>
        </div>

        <h2>1. Core Architecture</h2>
        <p>
          The system is designed around a shared-nothing architecture where each
          node manages a subset of the keyspace using consistent hashing. Nodes
          communicate state changes via a custom gossip protocol built on top of
          UDP to minimize overhead, falling back to TCP for reliable replication
          of critical data structures.
        </p>
        <p>
          Memory management is handled via a custom slab allocator. Relying on the
          standard OS allocator led to unacceptable fragmentation over long
          runtimes. By pre-allocating fixed-size blocks, we achieved a
          deterministic latency profile under heavy write pressure.
        </p>
        <blockquote>
          <p className="font-mono text-sm text-muted border-l-2 border-primary pl-4 py-2 italic bg-surface/50 not-prose">
            &quot;Predictability in tail latency is often more critical than
            maximizing average throughput when building infrastructure
            components.&quot;
          </p>
        </blockquote>

        <h2>2. Implementation Details</h2>
        <p>
          Below is a simplified implementation of the LRU (Least Recently Used)
          cache eviction mechanism. It utilizes a combination of a{' '}
          <code>HashMap</code> for constant-time lookups and a doubly-linked list
          to track usage order. Note the use of <code>Rc</code> and{' '}
          <code>RefCell</code> for interior mutability, though in the actual
          multi-threaded implementation, these are replaced with <code>Arc</code>{' '}
          and <code>RwLock</code> or lock-free concurrent structures.
        </p>

        <div className="my-8 border border-border-dark bg-background-dark not-prose relative group/code">
          <div className="flex items-center justify-between border-b border-border-dark bg-surface px-4 py-2">
            <span className="font-mono text-xs text-text-main font-bold">
              src/cache/lru.rs
            </span>
            <div className="flex gap-2">
              <span className="font-mono text-xs text-muted uppercase">RUST</span>
              <button
                type="button"
                onClick={copyCode}
                className="font-mono text-xs text-text-main hover:text-primary hover:bg-border-dark px-2 transition-none focus:outline-none focus:ring-1 focus:ring-primary"
              >
                [ COPY ]
              </button>
            </div>
          </div>
          <div className="flex overflow-x-auto text-sm font-mono leading-[1.4] p-4 bg-background-dark">
            <div className="text-muted select-none text-right pr-4 border-r border-border-dark mr-4 shrink-0 flex flex-col opacity-50">
              {LINE_NUMBERS.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            <pre className="text-text-main w-full">
              <code>{LRU_CODE}</code>
            </pre>
          </div>
        </div>

        <h2>3. Deployment &amp; Scaling</h2>
        <p>
          The binary is compiled statically against musl libc to ensure a
          minimal, dependency-free container image. The resulting Docker image is
          strictly <code>FROM scratch</code>, weighing in at just under 12MB.
          Deployment is managed via standard Kubernetes{' '}
          <code>StatefulSet</code> resources to maintain stable network identities
          necessary for the consistent hashing ring.
        </p>
        <ul>
          <li>
            <strong>Throughput:</strong> ~450k ops/sec per node (read-heavy
            workload)
          </li>
          <li>
            <strong>P99 Latency:</strong> &lt; 2ms
          </li>
          <li>
            <strong>Memory Overhead:</strong> ~15% per allocated block
          </li>
        </ul>
        <p>
          Monitoring is exposed via a Prometheus-compatible metrics endpoint,
          tracking hit rates, eviction counts, and allocator fragmentation
          statistics.
        </p>
      </article>

      <footer className="mt-16 pt-8 border-t border-border-dark not-prose">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-surface border border-border-dark p-6">
          <div className="w-16 h-16 shrink-0 border border-border-dark bg-background-dark flex items-center justify-center font-mono text-lg text-muted">
            JGC
          </div>
          <div>
            <h4 className="font-display uppercase text-text-main text-lg mb-1">
              {SITE.author.name}
            </h4>
            <p className="font-mono text-sm text-muted mb-2">{SITE.author.title}</p>
            <div className="flex gap-4 font-mono text-xs">
              <a
                className="text-primary hover:bg-primary hover:text-background-dark px-1 transition-none uppercase"
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <Link
                className="text-primary hover:bg-primary hover:text-background-dark px-1 transition-none uppercase"
                to={ROUTES.contact}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useLanguage()
  const post = slug ? getBlogPost(slug) : undefined

  if (!post) {
    return <Navigate to={ROUTES.blog} replace />
  }

  return (
      <div className="max-w-[65ch] mx-auto px-6 py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted mb-8">
          <Link to={ROUTES.home} className="hover:text-primary nav-item">
            {t('common.home')}
          </Link>
          <span className="mx-2 text-border-dark">/</span>
          <Link to={ROUTES.blog} className="hover:text-primary nav-item">
            {t('common.blog')}
          </Link>
          <span className="mx-2 text-border-dark">/</span>
          <span className="text-text-main">{post.title}</span>
        </nav>

        {isBlogPostPending(post) && (
          <div className="mb-8">
            <PendingPublication entryId={post.id} title={post.title} />
          </div>
        )}

        {post.hasContent ? <DistributedCacheArticle /> : null}
      </div>
  )
}