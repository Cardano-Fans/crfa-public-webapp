import { useEffect } from 'react'
import { useAtom } from 'jotai'
import {
  walletAtom,
  walletStatusAtom,
  selectWalletModalAtom,
  donateModalAtom,
} from './atoms'
import PubSub from 'pubsub-js'
// @ts-ignore
import * as cbor from 'cbor-web'
import { CardanoAPI, Blockfrost, Spend } from '@lib/cardano-api'
import toast from 'react-hot-toast'

export const useRestoreWallet = () => {
  const { connectWallet } = useWallet()
  const [wallet] = useAtom(walletAtom)

  useEffect(() => {
    if (wallet) {
      connectWallet(wallet.walletKey)
    }
  }, [])
}

export function useWallet() {
  const [wallet, setWallet] = useAtom(walletAtom)
  const [walletStatus, setWalletStatus] = useAtom(walletStatusAtom)
  const [_, setSelectWalletModal] = useAtom(selectWalletModalAtom)
  const [__, setDonateModal] = useAtom(donateModalAtom)

  function selectWallet() {
    setSelectWalletModal(true)
  }

  function selectDonation() {
    setDonateModal(true)
  }

  async function connectWallet(walletKey: string) {
    setWalletStatus('connecting')
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

      if (response) {
        const balance = await CardanoAPI.baseCommands.getBalance()
        const paymentAddress = await CardanoAPI.baseCommands.getChangeAddress(
          CardanoAPI.addressReturnType.bech32
        )
        const decodedBalance = await decodeBalance(String(balance))

        setWallet({
          walletKey,
          balance: decodedBalance,
          address: paymentAddress,
        })
        setWalletStatus('connected')

        PubSub.publish('wallet.connected')
      } else {
        setWalletStatus('disconnected')
        toast.error('Could not connect to wallet')
      }
    } catch (e) {
      setWalletStatus('disconnected')
      toast.error('Could not connect to wallet')
      console.error(e)
    }
  }

  function disconnectWallet() {
    setWalletStatus('disconnected')
    setWallet(null)
  }

  async function delegate() {
    const executeDelegation = async () => {
      try {
        //@ts-ignore
        const stake = await CardanoAPI?.plugins.spend.delegate({
          // testnet pools
          // stakepoolId: '7b3170bbd9a2a806ac886dcdcedabc93869ebc8891ae006df1189e2f',
          // stakepoolId: '5f5ed4eb2ba354ab2ad7c8859f3dacf93564637a105e80c8d8a7dc3c',

          // prod
          stakepoolId:
            '6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368',
        })

        if (stake) {
          toast.success(
            'Successfully delegated to our CRFA stake pool! Thank You!'
          )
        }
      } catch (e) {
        toast.error(
          'Error occurred while delegating or a user cancelled delegation process.'
        )
        console.log('failed while delegating', e)
      }
    }

    if (walletStatus !== 'connected') {
      selectWallet()

      const token = PubSub.subscribe('wallet.connected', () => {
        executeDelegation()
        PubSub.unsubscribe(token)
      })
    } else {
      executeDelegation()
    }
  }

  async function donate() {
    const executeDonation = async (amount: number) => {
      try {
        //@ts-ignore
        const result = await CardanoAPI?.plugins.spend.send({
          // testnet address
          // address:
          //   'addr_test1qzxj6udysrrsp6anjyhnpkn453c55hdxrlqkunjycz5uxwdx77z8dcnzmnhdacnfj2kglta8wurs6x7njzllkgl4hmssu8jhtd',

          // prod
          address:
            'addr1q8nq8wdhrpq402qj4hyn5rxn624l0ccua8k3epl2xl3fz57zddeldn7syvs5x2uvuefk66azhr7lelrj423lxapuxkksknwfdj',
          amount,
          metadataLabel: '674',
          metadata: 'CBI',
        })

        if (result) {
          toast.success(
            `Successfully donated ${amount} ADA to Cardano Blockchain Insights! Thank You!`
          )
        }
      } catch (e) {
        toast.error(
          'Error occurred while donating or a user cancelled transaction.'
        )
        console.log('failed while donating', e)
      }
    }

    if (walletStatus !== 'connected') {
      selectWallet()

      const connectionToken = PubSub.subscribe('wallet.connected', () => {
        selectDonation()

        PubSub.unsubscribe(connectionToken)
      })
    } else {
      selectDonation()
    }

    const donationToken = PubSub.subscribe(
      'donation.confirmed',
      (msg, data) => {
        executeDonation(data.amount)
        PubSub.unsubscribe(donationToken)
      }
    )
  }

  function confirmDonation(amount: number) {
    PubSub.publish('donation.confirmed', { amount })
  }

  return {
    connectWallet,
    disconnectWallet,
    delegate,
    donate,
    confirmDonation,
    selectWallet,
    wallet,
    status: walletStatus,
  }
}

async function decodeBalance(cborValue: string) {
  if (!cborValue) {
    return 0
  }

  const hexPairs = cborValue.match(/.{1,2}/g) || []
  const buffer = new Uint8Array(
    hexPairs.map((byte: string) => parseInt(byte, 16))
  )

  const decodedBalance = await cbor.decodeFirst(buffer)

  // cover edge case
  if (Array.isArray(decodedBalance)) {
    return decodedBalance[0]
  }

  return decodedBalance
}
