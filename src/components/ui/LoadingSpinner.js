const LoadingSpinner = ({
  size = 'default',
  color = 'blue',
  className = '',
  children,
  ...props
}) => {
  const sizes = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  const colors = {
    blue: 'border-gray-200 border-t-blue-600',
    gray: 'border-gray-200 border-t-gray-600',
    white: 'border-white/20 border-t-white',
    green: 'border-gray-200 border-t-green-600',
  }

  return (
    <div className="flex flex-col items-center justify-center" {...props}>
      <div
        className={`${sizes[size]} border-4 ${colors[color]} rounded-full animate-spin ${className}`}
      />
      {children && (
        <div className="mt-4 text-center text-gray-medium">{children}</div>
      )}
    </div>
  )
}

// Loading page wrapper
export const LoadingPage = ({ children, ...props }) => (
  <div className="min-h-screen relative flex items-center justify-center">
    <LoadingSpinner {...props}>{children}</LoadingSpinner>
  </div>
)

// Inline loading (for buttons, etc.)
export const InlineSpinner = ({ className = '', ...props }) => (
  <div
    className={`animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full ${className}`}
    {...props}
  />
)

export default LoadingSpinner
