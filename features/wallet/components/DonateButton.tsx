import { DonationModal } from './DonationModal'
import { useWallet } from '../useWallet'

export const DonateButton = (props: any) => {
  const { donate } = useWallet()

  const onClick = () => {
    donate()
  }

  return (
    <>
      <div {...props}>
        <button className="btn-2 w-full" onClick={onClick}>
          Donate
        </button>
      </div>

      <DonationModal />
    </>
  )
}
