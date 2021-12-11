import { useState } from 'react'
import { Slide } from './Slide'
import { copyToClipboard } from '../../utils/copyToClipboard'

const POOL_ID = '6C518B4861BB88B1395CEB116342CECBCFB8736282655F9A61C4C368'

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
