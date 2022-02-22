import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAtom } from 'jotai'

import { Modal } from '@components/shared/Modal'
import { donateModalAtom } from '../atoms'
import { useWallet } from '../useWallet'

export const DonationModal: React.FC = () => {
  const [amount, setAmount] = useState('25')
  const [isOpen, setIsOpen] = useAtom(donateModalAtom)
  const { confirmDonation } = useWallet()

  const onConfirm = () => {
    const a = Number(amount)

    if (isNaN(a) || a <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    confirmDonation(Number(amount))
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      title="How much would you like to donate?"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}
    >
      <div className="grid">
        <label className="font-medium mb-2">Amount (₳)</label>
        <input
          className="rounded-md border-2 border-slate-400 bg-slate-700 focus:border-slate-600 focus:outline-none"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button className="btn-2 mt-4" onClick={onConfirm}>
          Donate
        </button>
      </div>
    </Modal>
  )
}
