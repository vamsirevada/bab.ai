const Button = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    default:
      'bg-gray-dark text-white hover:bg-gray-medium focus:ring-gray-dark',
    outline:
      'border border-gray-medium/30 text-gray-dark hover:bg-gray-light/20 focus:ring-gray-dark',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    whatsapp: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
