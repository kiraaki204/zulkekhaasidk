import { BotanicalSprig } from './BrandMarks'

/**
 * Editorial section heading with optional eyebrow, rule, and botanical accent.
 */
export default function SectionHeading({
  eyebrow,
  title,
  titleAs: Tag = 'h2',
  id,
  align = 'left',
  accent = true,
  className = '',
  children,
}) {
  const alignCls =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-3 ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="font-heading text-deep-brown text-[clamp(1.85rem,4vw,3rem)] leading-[1.1] text-balance">
        {title}
      </Tag>
      {accent && (
        <BotanicalSprig
          className={`w-24 h-auto text-botanical/70 ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}
        />
      )}
      {children && (
        <div className="max-w-prose text-deep-brown-soft text-[0.98rem] leading-relaxed mt-1">
          {children}
        </div>
      )}
    </div>
  )
}
