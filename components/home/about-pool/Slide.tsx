type Props = {
  title: string
}

export const Slide: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="h-full text-white bg-card slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
      <h3 className="text-2xl md:text-3xl mb-6">{title}</h3>
      <div className="break-words">{children}</div>
    </div>
  )
}
