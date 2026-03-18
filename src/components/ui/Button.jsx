export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className = '',
  ...rest
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:scale-[0.98]',
    secondary: 'bg-gray-100 text-text-primary hover:bg-gray-200',
    danger: 'bg-danger text-white hover:bg-red-600',
    ghost: 'bg-transparent text-text-secondary hover:bg-gray-100',
    outline: 'border border-primary text-primary hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-3 py-2.5 text-sm min-h-[44px]',
    md: 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children}
    </button>
  );
}
