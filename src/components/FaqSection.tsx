import type { FaqItem } from '../data/faq'

type FaqSectionProps = {
  title: string
  items: FaqItem[]
  id?: string
}

export default function FaqSection({ title, items, id = 'faq' }: FaqSectionProps) {
  return (
    <section id={id} className="mt-16 border-t border-border-dark pt-12">
      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-text-main mb-8">
        {title}
      </h2>
      <dl className="space-y-6">
        {items.map((item) => (
          <div
            key={item.question}
            className="border border-border-dark bg-surface p-5"
          >
            <dt className="font-mono text-sm font-bold text-primary mb-2">
              Q: {item.question}
            </dt>
            <dd className="font-body text-sm text-muted leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
