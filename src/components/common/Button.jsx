import { Link } from 'react-router-dom'

const variants = {
  solid:
    'bg-butter text-deep-brown hover:bg-butter-soft border border-transparent shadow-[0_1px_0_rgba(70,58,48,0.08)]',
  outline:
    'bg-transparent text-deep-brown border border-deep-brown/30 hover:border-deep-brown/70 hover:bg-deep-brown/[0.03]',
  ghost:
    'bg-transparent text-deep-brown border border-transparent hover:bg-deep-brown/[0.05]',
  botanical:
    'bg-botanical text-deep-brown hover:bg-botanical-deep hover:text-cream border border-transparent',
}

const sizes = {
  sm: 'px-4 py-2 text-[0.7rem] tracking-[0.16em]',
  md: 'px-6 py-3 text-[0.72rem] tracking-[0.18em]',
  lg: 'px-8 py-4 text-[0.75rem] tracking-[0.2em]',
}

function classes(variant, size, className) {
  return [
    'inline-flex items-center justify-center gap-2 uppercase font-medium font-body rounded-none transition-all duration-300 ease-out',
    variants[variant] ?? variants.solid,
    sizes[size] ?? sizes.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
  onClick,
  ...rest
}) {
  return (
    <button
      type={type}
      className={classes(variant, size, className)}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ButtonLink({ children, variant = 'solid', size = 'md', className = '', to, href, ...rest }) {
  const cls = classes(variant, size, className)
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  )
}

export default Button
