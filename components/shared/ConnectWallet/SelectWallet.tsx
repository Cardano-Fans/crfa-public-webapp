import React from 'react'
import { Modal } from '../Modal'

type Wallet = {
  name: string
  logo: string
  walletKey: string
}

type Props = {
  isOpen: boolean
  onClose: any
  wallets: Wallet[]
  onSelectWallet: (wallet: string) => void
}

export const SelectWallet: React.FC<Props> = ({
  isOpen,
  onClose,
  wallets,
  onSelectWallet,
}) => {
  return (
    <Modal title="Select Wallet" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3">
        {wallets.map((wallet) => (
          <div
            key={wallet.name}
            className="p-3 border bg-white hover:bg-primary rounded cursor-pointer"
            onClick={() => {
              onSelectWallet(wallet.walletKey)
            }}
          >
            {wallet.name}
          </div>
        ))}
      </div>
    </Modal>
  )
}
