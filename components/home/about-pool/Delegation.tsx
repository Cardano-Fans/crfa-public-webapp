import toast from 'react-hot-toast'
import { Slide } from './Slide'
import { copyToClipboard } from '../../../utils/copyToClipboard'
import { DelegateButton } from '@features/wallet'
const POOL_ID = '6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368'

export const Delegation: React.FC = () => {
  const onCopyClick = () => {
    toast.success('Copied to clipboard!')
    copyToClipboard(POOL_ID)
  }

  return (
    <Slide title="Delegation">
      <p>
        <span className="font-semibold tracking-wide">OUR POOL ID:</span>{' '}
        <span id="poolId">{POOL_ID}</span>
        <br />
        <span className="font-semibold tracking-wide">TICKER:</span> CRFA
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start">
        <DelegateButton className="mb-3 w-full sm:mb-0 sm:mr-3 sm:w-auto " />

        <button
          className="btn-secondary w-full sm:w-auto"
          onClick={onCopyClick}
        >
          Copy Pool ID
        </button>
      </div>
    </Slide>
  )
}
