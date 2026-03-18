export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
}) {
  const paddings = { none: '', sm: 'p-2.5 sm:p-3', md: 'p-3 sm:p-5', lg: 'p-4 sm:p-6' };

  return (
    <div
      className={`bg-bg-panel rounded-xl border border-border shadow-sm ${paddings[padding] || paddings.md} ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
