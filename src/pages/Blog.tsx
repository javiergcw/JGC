import { Link } from 'react-router-dom'
import PendingPublication from '../components/blog/PendingPublication'
import { BLOG_POSTS, isBlogPostPending } from '../data/blogPosts'
import { useLanguage } from '../i18n/LanguageContext'
import { blogPostPath } from '../lib/routes'

export default function Blog() {
  const { t } = useLanguage()

  return (
    <>
      <div className="fixed inset-0 grid-lines pointer-events-none opacity-20 z-0 lg:left-[25%]" />

      <div className="flex flex-col max-w-[1200px] w-full mx-auto pb-20 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-color px-6 md:px-10 py-8 gap-4 bg-background-dark/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-primary text-3xl md:text-5xl font-display font-bold uppercase tracking-[-0.05em] leading-none">
              {t('blog.logs')}
            </h2>
            <p className="text-muted font-mono text-sm">{t('blog.index')}</p>
            <p className="text-muted font-mono text-[10px] uppercase tracking-widest max-w-md">
              {t('blog.standbyNote')}
            </p>
          </div>
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
            <span>{t('blog.awaiting')}</span>
          </div>
        </header>

        <div className="flex flex-col w-full px-6 md:px-10 py-8">
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-border-color pb-4 mb-4 text-muted font-mono text-xs uppercase tracking-widest">
            <div className="col-span-2 lg:col-span-2 pl-6">{t('blog.date')}</div>
            <div className="col-span-2 hidden lg:block">{t('blog.id')}</div>
            <div className="col-span-4 lg:col-span-4">{t('blog.topic')}</div>
            <div className="col-span-3 lg:col-span-3">{t('blog.status')}</div>
            <div className="col-span-1 lg:col-span-1 text-right hidden lg:block">
              {t('blog.readTime')}
            </div>
          </div>

          <div className="flex flex-col w-full font-mono text-sm">
            {BLOG_POSTS.map((entry) => {
              const pending = isBlogPostPending(entry)
              return (
                <div
                  key={entry.id}
                  className="border-b border-border-color py-4 sm:py-3 group"
                >
                  <Link
                    to={blogPostPath(entry.slug)}
                    className="hover-row relative block w-full"
                  >
                    <div className="row-bg absolute inset-0 -mx-6 md:-mx-10 px-6 md:px-10 z-0 transition-none border-l-4 border-transparent row-border" />
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center py-2">
                      <div className="absolute -left-4 sm:left-0 top-2 sm:top-auto hover-indicator font-bold text-lg select-none">
                        &gt;
                      </div>
                      <div className="col-span-2 text-muted group-hover:text-text-main pl-2 sm:pl-6">
                        {entry.date}
                      </div>
                      <div className="col-span-2 hidden lg:block text-muted">{entry.id}</div>
                      <div className="col-span-12 sm:col-span-4 text-text-main font-bold group-hover:text-primary leading-snug">
                        {entry.title}
                      </div>
                      <div className="col-span-12 sm:col-span-3 pl-2 sm:pl-0">
                        {pending && <PendingPublication entryId={entry.id} compact />}
                      </div>
                      <div className="col-span-12 lg:col-span-1 text-muted text-right hidden lg:block text-[10px]">
                        {entry.readTime}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="mt-12 flex justify-between items-center text-muted font-mono text-xs">
            <div>
              {t('blog.totalLogs')}: {String(BLOG_POSTS.length).padStart(3, '0')}
            </div>
            <div>{t('blog.eof')}</div>
          </div>
        </div>
      </div>
    </>
  )
}
