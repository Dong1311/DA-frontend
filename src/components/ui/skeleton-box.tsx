type SkeletonBoxProps = {
  className?: string
  rounded?: boolean
}

export const SkeletonBox = ({ className = '', rounded = true }: SkeletonBoxProps) => {
  return <div className={`animate-pulse bg-gray-200 ${rounded ? 'rounded' : ''} ${className}`} />
}
