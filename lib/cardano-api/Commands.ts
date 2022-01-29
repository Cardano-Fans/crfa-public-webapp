import type {
  Value,
  TransactionUnspentOutput,
  BaseAddress,
  RewardAddress,
  Transaction,
} from '@emurgo/cardano-serialization-lib-browser'
import { CardanoAPIObject, errorIfUndefined } from './CardanoAPI'

export const Commands = {
  isEnabled: async (): Promise<Boolean> => {
    try {
      const wallet = CardanoAPIObject.wallet
      return await wallet.isEnabled()
    } catch (e) {
      return false
    }
  },
  enable: async (): Promise<Boolean | null> => {
    try {
      const wallet = CardanoAPIObject.wallet
      CardanoAPIObject.extendedApi = await wallet.enable()

      return CardanoAPIObject.extendedApi
    } catch (e) {
      console.error(e)
      return false
    }
  },
  getUnusedAddresses: async (type?: string): Promise<Array<string>> => {
    //@ts-ignore
    const addr = await CardanoAPIObject.extendedApi.getUnusedAddresses()
    if (type === CardanoAPIObject.addressReturnType.hex) {
      return addr
    }
    if (type === CardanoAPIObject.addressReturnType.bech32) {
      const bechAddr: Array<string> = []
      addr.forEach((address: string) => bechAddr.push(bech32FromHex(address)))
      return bechAddr
    }
    return addr
  },
  getUsedAddresses: async (type?: string): Promise<Array<string>> => {
    //@ts-ignore
    const addr = await CardanoAPIObject.extendedApi.getUsedAddresses()
    if (type === CardanoAPIObject.addressReturnType.hex) {
      return addr
    }
    if (type === CardanoAPIObject.addressReturnType.bech32) {
      const bechAddr: Array<string> = []
      addr.forEach((address: string) => bechAddr.push(bech32FromHex(address)))
      return bechAddr
    }
    return addr
  },
  getChangeAddress: async (type?: string): Promise<string> => {
    //@ts-ignore
    const addr = await CardanoAPIObject.extendedApi.getChangeAddress()
    if (type === CardanoAPIObject.addressReturnType.hex) {
      return addr
    }
    if (type === CardanoAPIObject.addressReturnType.bech32) {
      return bech32FromHex(addr)
    }
    return addr
  },
  // TODO: No support for CIP-0018 for multiple staking addresses yet
  getRewardAddress: async (type?: string): Promise<string> => {
    //@ts-ignore
    const addr = await CardanoAPIObject.extendedApi.getRewardAddresses()
    if (type === CardanoAPIObject.addressReturnType.hex) {
      return addr[0]
    }
    if (type === CardanoAPIObject.addressReturnType.bech32) {
      return bech32FromHex(addr[0])
    }
    return addr[0]
  },
  getUtxos: async (
    amount?: Value,
    paginate?: { page: number; limit: number }
  ): Promise<Array<TransactionUnspentOutput>> => {
    const utxos: Array<string> = errorIfUndefined(
      //@ts-ignore
      await CardanoAPIObject.extendedApi.getUtxos(amount, paginate)
    )

    const fixedUtxos = utxos.map((utxo: string) =>
      CardanoAPIObject.serializationLib.TransactionUnspentOutput.from_bytes(
        CardanoAPIObject.buffer.from(utxo, 'hex')
      )
    )
    return fixedUtxos
  },
  getCollateral: async (): Promise<TransactionUnspentOutput> => {
    //@ts-ignore
    return await CardanoAPIObject.extendedApi.experimental.getCollateral()
  },
  getBalance: async (): Promise<Value> => {
    //@ts-ignore
    return await CardanoAPIObject.extendedApi.getBalance()
  },
  getNetworkId: async (): Promise<number> => {
    //@ts-ignore
    return await CardanoAPIObject.extendedApi.getNetworkId()
  },
  signData: async (
    address: BaseAddress | RewardAddress,
    payload: string
  ): Promise<any> => {
    //@ts-ignore
    return CardanoAPIObject.extendedApi.signData(address, payload)
  },
  signTx: async (
    tx: Transaction | string,
    partialSign?: boolean
  ): Promise<string> => {
    let transaction = tx
    if (typeof tx !== 'string') {
      transaction = CardanoAPIObject.buffer.from(tx.to_bytes()).toString('hex')
    }
    //@ts-ignore
    return await CardanoAPIObject.extendedApi.signTx(transaction, partialSign)
  },
  submitTx: async (tx: Transaction | string): Promise<any> => {
    let transaction = tx
    if (typeof tx !== 'string') {
      transaction = CardanoAPIObject.buffer.from(tx.to_bytes()).toString('hex')
    }
    //@ts-ignore
    const submit = await CardanoAPIObject.extendedApi.submitTx(transaction)
    return submit
  },
}

function bech32FromHex(address: string): string {
  const hex = CardanoAPIObject.buffer.from(address, 'hex')
  const addr =
    CardanoAPIObject.serializationLib.Address.from_bytes(hex).to_bech32()
  return addr
}
