import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { ROUTES } from '../../lib/routes'

type PendingPublicationProps = {
  entryId: string
  title?: string
  compact?: boolean
}

export default function PendingPublication({
  entryId,
  title,
  compact = false,
}: PendingPublicationProps) {
  const { t } = useLanguage()

  return (
    <div
      className={
        compact
          ? 'border border-border-color bg-surface px-3 py-2 font-mono text-[10px] sm:text-xs'
          : 'border border-border-dark bg-surface p-8 font-mono text-sm'
      }
      role="status"
    >
      <p className={compact ? 'text-primary mb-0' : 'text-primary mb-4'}>
        &gt; {t('common.pendingPublication')}
      </p>
      {!compact && title && (
        <p className="text-text-main font-display text-lg uppercase tracking-tight mb-4">
          {title}
        </p>
      )}
      {!compact && (
        <p className="text-muted mb-6">
          {t('common.pendingPublicationBody').replace('{id}', entryId)}
        </p>
      )}
      {!compact && (
        <Link
          to={ROUTES.blog}
          className="text-primary hover:underline uppercase text-xs"
        >
          {t('common.returnToIndex')}
        </Link>
      )}
    </div>
  )
}
