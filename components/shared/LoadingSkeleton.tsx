import cx from 'classnames'

interface SkeletonProps {
  className?: string
  width?: string
  height?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  width = 'w-full', 
  height = 'h-4' 
}) => {
  return (
    <div 
      className={cx(
        'animate-pulse bg-gray-600 rounded',
        width,
        height,
        className
      )}
    />
  )
}

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-card p-8 rounded-md mb-10 h-full">
      <Skeleton height="h-52" className="mb-6" />
      <Skeleton height="h-6" className="mb-4" />
      <Skeleton height="h-4" width="w-3/4" className="mb-2" />
      <Skeleton height="h-4" width="w-1/2" />
    </div>
  )
}

export const WalletConnectionSkeleton: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-primary rounded-full animate-spin" />
      </div>
      <Skeleton height="h-6" width="w-64" className="mx-auto mb-2" />
      <Skeleton height="h-4" width="w-48" className="mx-auto" />
    </div>
  )
}

export const NewsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}