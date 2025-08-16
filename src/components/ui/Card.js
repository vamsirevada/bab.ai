const Card = ({
  children,
  className = '',
  onClick,
  padding = true,
  ...props
}) => {
  const baseClasses =
    'bg-white rounded-xl border border-gray-medium/20 shadow-sm'
  const paddingClasses = padding ? 'p-4' : ''

  return (
    <div
      className={`${baseClasses} ${paddingClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
