import { useState } from 'react'
import { Slide } from './Slide'
import { copyToClipboard } from '../../../utils/copyToClipboard'
import { DelegateButton } from '@features/wallet'
const POOL_ID = '6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368'

export const Delegation: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false)
  const onCopyClick = () => {
    copyToClipboard(POOL_ID).then(() => setIsCopied(true))
  }

  return (
    <Slide title="Delegation">
      <p>
        OUR POOL ID: <span id="poolId">{POOL_ID}</span>
        <br />
        TICKER: CRFA
        <br />
        DELEGATE with any Cardano compatible wallet
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start">
        <DelegateButton className="mb-3 w-full sm:mb-0 sm:mr-3 sm:w-auto " />

        <button
          className="btn-secondary w-full sm:w-auto"
          onClick={onCopyClick}
        >
          {isCopied ? 'Copied' : 'Copy pool ID'}
        </button>
      </div>
    </Slide>
  )
}
