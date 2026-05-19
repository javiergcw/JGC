import { Link } from 'react-router-dom'
import type { DeployedProject } from '../../data/deployedProjects'
import { useLanguage } from '../../i18n/LanguageContext'
import MessageQueueDiagram from './MessageQueueDiagram'
import YakkaDiagram from './YakkaDiagram'

type DeployedProjectCardProps = {
  project: DeployedProject
}

function ProjectDiagram({ type }: { type: DeployedProject['diagram'] }) {
  if (type === 'yakka') return <YakkaDiagram />
  return <MessageQueueDiagram />
}

export default function DeployedProjectCard({ project }: DeployedProjectCardProps) {
  const { t } = useLanguage()

  return (
    <article className="group w-full border border-border-dark bg-void hover:border-primary transition-none rounded-none overflow-hidden relative">
      <div className="h-6 w-full border-b border-border-dark bg-asphalt flex items-center px-4 justify-between font-mono-ui text-[10px] text-steel">
        <span>{project.status}</span>
        <span>{project.uptime}</span>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-border-dark">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-display text-concrete mb-4 tracking-tight group-hover:text-primary transition-none">
              {project.title}
            </h2>
            <p className="text-concrete/80 leading-relaxed font-body text-base">
              {project.description}
            </p>
          </div>

          <div className="mb-8 border border-border-dark bg-asphalt">
            <div className="grid grid-cols-2 border-b border-border-dark">
              <div className="p-3 border-r border-border-dark font-mono-ui text-xs text-steel uppercase">
                {t('common.stack')}
              </div>
              <div className="p-3 font-mono-ui text-sm text-concrete">
                {project.specs.stack}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-border-dark">
              <div className="p-3 border-r border-border-dark font-mono-ui text-xs text-steel uppercase">
                {t('common.infrastructure')}
              </div>
              <div className="p-3 font-mono-ui text-sm text-concrete">
                {project.specs.infrastructure}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-border-dark">
              <div className="p-3 border-r border-border-dark font-mono-ui text-xs text-steel uppercase">
                {t('common.dataStore')}
              </div>
              <div className="p-3 font-mono-ui text-sm text-concrete">
                {project.specs.dataStore}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-3 border-r border-border-dark font-mono-ui text-xs text-steel uppercase">
                {t('common.delivery')}
              </div>
              <div className="p-3 font-mono-ui text-sm text-concrete">
                {project.specs.delivery}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 border border-border-dark font-mono-ui text-xs text-steel bg-void rounded-none uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={project.cta.to}
              className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 font-display text-sm font-bold uppercase hover:bg-primary hover:text-void transition-none"
            >
              <span>{t('common.contact')}</span>
              <span className="material-symbols-outlined text-sm">mail</span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex w-full lg:w-1/2 bg-asphalt p-8 items-center justify-center relative min-h-[400px]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative w-full max-w-sm aspect-square text-concrete">
            <ProjectDiagram type={project.diagram} />
          </div>
          <div className="absolute bottom-4 right-4 font-mono-ui text-[10px] text-steel">
            {t('deploy.figure')}
          </div>
        </div>
      </div>
    </article>
  )
}
