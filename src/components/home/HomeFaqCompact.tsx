import type { FaqItem } from '../../data/faq'

type HomeFaqCompactProps = {
  title: string
  items: FaqItem[]
}

export default function HomeFaqCompact({ title, items }: HomeFaqCompactProps) {
  return (
    <section className="w-full" aria-labelledby="home-faq-heading">
      <h2
        id="home-faq-heading"
        className="font-mono text-xs text-muted uppercase tracking-widest mb-3"
      >
        {title}
      </h2>
      <div className="border border-[#333] divide-y divide-[#333] bg-[#141414]">
        {items.map((item) => (
          <details key={item.question} className="group p-4">
            <summary className="font-mono text-sm text-text-main cursor-pointer list-none flex items-center gap-2 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-primary group-open:rotate-90 transition-none">›</span>
              {item.question}
            </summary>
            <p className="mt-2 pl-4 font-body text-sm text-muted leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
