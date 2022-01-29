import { useState, useEffect } from 'react'
import { SelectWallet } from './SelectWallet'
import { CardanoAPI, Blockfrost, Spend } from '../../../lib/cardano-api'
import toast from 'react-hot-toast'
declare let window: any

type Wallet = {
  name: string
  logo: string
  walletKey: string
}

function getUserWallets(): Wallet[] {
  const allowedWallets = [
    { name: 'ccvault.io', logo: 'CCVault', walletKey: 'ccvault' },
    //  doesn't work, not fully implements CIP-030
    // { name: 'yoroi', logo: 'yoroi', walletKey: 'yoroi' },
    // { name: 'gerowallet', logo: 'gerowallet', walletKey: 'gerowallet' },
    // { name: 'typhonwallet', logo: 'typhonwallet', walletKey: 'typhon' },
    { name: 'nami', logo: 'nami', walletKey: 'nami' },
  ]

  const userWallets = allowedWallets.filter(
    (wallet) => window?.cardano?.[wallet.walletKey]
  )

  return userWallets
}

async function delegate(walletKey: string) {
  try {
    const emurgoSerializationLib = await import(
      '@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js'
    )

    await CardanoAPI.register({
      wallet: walletKey,
      plugins: [
        Blockfrost({
          mainnet: 'mainnetS6e1C6yuxQNHOX8SwVNHPvomtpOdD5Iu',
          testnet: 'testnetSSuaIDKnuNpFY8YdWlEc2ToOFXY4CJB7',
        }),
        Spend(),
      ],
      cardanoSerializationLibrary: emurgoSerializationLib,
    })

    const response: Boolean | undefined | null =
      await CardanoAPI?.baseCommands.enable()

    console.log('response', response)

    if (response) {
      //@ts-ignore
      const stake = await CardanoAPI?.plugins.spend.delegate({
        // testnet pools
        // stakepoolId: '7b3170bbd9a2a806ac886dcdcedabc93869ebc8891ae006df1189e2f',
        // stakepoolId: '5f5ed4eb2ba354ab2ad7c8859f3dacf93564637a105e80c8d8a7dc3c',

        // prod
        stakepoolId: '6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368',
      })

      if (stake) {
        toast.success('Successfully delegated to our stakepool! Thank you.')
      }
    }
  } catch (e) {
    toast.error("This didn't work.")
    console.log('failed', e)
  }
}

//@ts-ignore
export const ConnectWallet = (props) => {
  const [userWallets, setUserWallets] = useState<Wallet[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClick = async () => {
    const wallets = getUserWallets()
    setUserWallets(wallets)

    if (wallets.length > 1) {
      setIsModalOpen(true)
      return
    } else if (wallets.length === 1) {
      delegate(wallets[0].walletKey)
    } else {
      toast.error('No wallets found.')
    }
  }

  const onSelectWallet = (walletKey: string) => {
    delegate(walletKey)
    setIsModalOpen(false)
  }

  return (
    <div {...props}>
      <button className="btn-2" onClick={onClick}>
        Stake with us
      </button>

      <SelectWallet
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        wallets={userWallets}
        onSelectWallet={onSelectWallet}
      />
    </div>
  )
}
