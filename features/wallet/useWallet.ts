import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { walletAtom, walletStatusAtom, selectWalletModalAtom } from './atoms'
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

  function selectWallet() {
    setSelectWalletModal(true)
  }

  async function connectWallet(walletKey: string) {
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
        toast.error('Could not connect to wallet')
      }
    } catch (e) {
      toast.error('Could not connect to wallet')
      console.error(e)
    }
  }

  function disconnectWallet() {
    setWalletStatus('disconnected')
    setWallet(null)
  }

  async function delegate() {
    const mockDelegate = () => {
      console.log('mockDelegate')
    }
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

  return {
    connectWallet,
    disconnectWallet,
    delegate,
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

  return decodedBalance
}
