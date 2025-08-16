const Badge = ({
  children,
  variant = 'default',
  className = '',
  size = 'default',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium'

  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    pending: 'bg-orange-100 text-orange-700',
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
  }

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-xs',
    large: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
