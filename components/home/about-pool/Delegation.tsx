import { useState } from 'react'
import { Slide } from './Slide'
import { copyToClipboard } from '../../../utils/copyToClipboard'

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

      <button className="mt-6 btn-2" onClick={onCopyClick}>
        {isCopied ? 'Copied' : 'Copy pool ID'}
      </button>
    </Slide>
  )
}
