import { useWallet } from '../useWallet'

export const DelegateButton = (props: any) => {
  const { delegate } = useWallet()

  const onClick = () => {
    delegate()
  }

  return (
    <div {...props}>
      <button className="btn-2 w-full" onClick={onClick}>
        Stake with us
      </button>
    </div>
  )
}
