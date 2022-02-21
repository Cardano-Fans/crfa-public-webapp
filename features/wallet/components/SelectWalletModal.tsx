import React from 'react'
import NextImage from 'next/image'
import { useAtom } from 'jotai'
import { Modal } from '@components/shared/Modal'
import { selectWalletModalAtom } from '../atoms'
import { useWallet } from '../useWallet'

type Wallet = {
  name: string
  logo: string
  walletKey: string
}

const allowedWallets = [
  {
    name: 'CCvault',
    logo: '/wallet-logos/ccvault.png',
    walletKey: 'ccvault',
  },
  { name: 'Flint', logo: '/wallet-logos/flint.svg', walletKey: 'flint' },
  { name: 'Nami', logo: '/wallet-logos/nami.svg', walletKey: 'nami' },
  //  doesn't work, not fully implements CIP-030
  // { name: 'yoroi', logo: 'yoroi', walletKey: 'yoroi' },
  // { name: 'gerowallet', logo: 'gerowallet', walletKey: 'gerowallet' },
  // { name: 'typhonwallet', logo: 'typhonwallet', walletKey: 'typhon' },
]

export const SelectWalletModal: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(selectWalletModalAtom)
  const { connectWallet } = useWallet()

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      title="Select Wallet"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}
    >
      <div className="grid grid-cols-2 gap-6">
        {allowedWallets.map((wallet) => (
          <button
            key={wallet.name}
            className="p-3 bg-slate-800/90 hover:bg-slate-800 rounded-lg"
            onClick={() => {
              connectWallet(wallet.walletKey)
              setIsOpen(false)
            }}
          >
            <NextImage
              objectFit="contain"
              height={80}
              width={80}
              src={wallet.logo}
              alt=""
            />

            <div className="text-slate-100 text-lg">{wallet.name}</div>
          </button>
        ))}
      </div>
    </Modal>
  )
}
