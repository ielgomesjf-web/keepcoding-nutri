export default function Input({ label, error, icon: Icon, type = 'text', className = '', ...rest }) {
  if (type === 'textarea') {
    return (
      <div className={className}>
        {label && <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>}
        <textarea
          className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-danger' : 'border-border'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-text-primary`}
          rows={4}
          {...rest}
        />
        {error && <p className="text-sm text-danger mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-2.5 rounded-lg border ${error ? 'border-danger' : 'border-border'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary`}
          {...rest}
        />
      </div>
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}
