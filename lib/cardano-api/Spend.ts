import type {
  MultiAsset,
  TransactionOutputs,
} from '@emurgo/cardano-serialization-lib-browser'
import { CardanoAPIObject } from './CardanoAPI'
import { setProtocolParameters, randomImprove, UTxOList } from './SelectCoin'

type Delegate = {
  stakepoolId: string
  metadata?: Metadata
  metadataLabel?: string
}

type Metadata = object | null

type Asset = {
  unit: string
  quantity: string
}

type ProtocolParameter = {
  linearFee: {
    minFeeA: string
    minFeeB: string
  }
  minUtxo: any
  poolDeposit: string
  keyDeposit: string
  maxTxSize: number
  slot: string
}

type Send = {
  address: string
  amount?: number
  assets?: Asset[]
  metadata?: Metadata
  metadataLabel?: string
}

type SendMultiple = {
  recipients: {
    address: string
    amount?: number
    assets?: Asset[]
  }[]
  metadata?: Metadata
  metadataLabel?: string
}

export const Spend = () => {
  return {
    name: 'spend',
    exec: {
      send: send,
      sendMultiple: sendMultiple,
      delegate: delegate,
      getAssets: getAssets,
    },
  }
}

const errorIfUndefined = <T>(item: T | undefined): T => {
  if (!item) {
    throw new Error('Value is undefined')
  }
  return item
}

const send = async ({
  address,
  amount = 0,
  assets = [],
  metadata = null,
  metadataLabel = '721',
}: Send): Promise<string> => {
  const paymentAddress = await CardanoAPIObject.baseCommands.getChangeAddress(
    CardanoAPIObject.addressReturnType.bech32
  )
  const protocolParameter = await getProtocolParameter()
  const utxos = await CardanoAPIObject.baseCommands.getUtxos()
  const lovelace = Math.floor((amount || 0) * 1000000).toString()
  const receiveAddress = address
  const multiAsset = _makeMultiAsset(assets)
  const outputValue = CardanoAPIObject.serializationLib.Value.new(
    CardanoAPIObject.serializationLib.BigNum.from_str(lovelace)
  )
  if ((assets || []).length > 0) {
    outputValue.set_multiasset(multiAsset)
  }
  const minAda = CardanoAPIObject.serializationLib.min_ada_required(
    outputValue,
    CardanoAPIObject.serializationLib.BigNum.from_str(
      protocolParameter.minUtxo || '1000000'
    )
  )
  if (
    CardanoAPIObject.serializationLib.BigNum.from_str(lovelace).compare(
      minAda
    ) < 0
  ) {
    outputValue.set_coin(minAda)
  }
  const outputs = CardanoAPIObject.serializationLib.TransactionOutputs.new()
  outputs.add(
    CardanoAPIObject.serializationLib.TransactionOutput.new(
      CardanoAPIObject.serializationLib.Address.from_bech32(receiveAddress),
      outputValue
    )
  )
  const rawTransaction = _txBuilder({
    PaymentAddress: String(paymentAddress),
    Utxos: utxos,
    Outputs: outputs,
    ProtocolParameter: protocolParameter,
    Metadata: metadata,
    MetadataLabel: metadataLabel,
    Delegation: null,
  })
  return await _signSubmitTx(rawTransaction)
}

const sendMultiple = async ({
  recipients = [],
  metadata = null,
  metadataLabel = '721',
}: SendMultiple): Promise<string> => {
  const paymentAddress = await CardanoAPIObject.baseCommands.getChangeAddress(
    CardanoAPIObject.addressReturnType.bech32
  )

  const protocolParameter = await getProtocolParameter()
  const utxos = await CardanoAPIObject.baseCommands.getUtxos()
  const outputs = CardanoAPIObject.serializationLib.TransactionOutputs.new()
  for (const recipient of recipients) {
    const lovelace = Math.floor((recipient.amount || 0) * 1000000).toString()
    const receiveAddress = recipient.address
    const multiAsset = _makeMultiAsset(recipient.assets || [])
    const outputValue = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.BigNum.from_str(lovelace)
    )
    if ((recipient.assets || []).length > 0) {
      outputValue.set_multiasset(multiAsset)
    }
    const minAda = CardanoAPIObject.serializationLib.min_ada_required(
      outputValue,
      CardanoAPIObject.serializationLib.BigNum.from_str(
        protocolParameter.minUtxo || '1000000'
      )
    )
    if (
      CardanoAPIObject.serializationLib.BigNum.from_str(lovelace).compare(
        minAda
      ) < 0
    ) {
      outputValue.set_coin(minAda)
    }
    outputs.add(
      CardanoAPIObject.serializationLib.TransactionOutput.new(
        CardanoAPIObject.serializationLib.Address.from_bech32(receiveAddress),
        outputValue
      )
    )
  }

  const RawTransaction = _txBuilder({
    PaymentAddress: String(paymentAddress),
    Utxos: utxos,
    Outputs: outputs,
    ProtocolParameter: protocolParameter,
    Metadata: metadata,
    MetadataLabel: metadataLabel,
    Delegation: null,
  })

  return await _signSubmitTx(RawTransaction)
}

const delegate = async ({
  stakepoolId,
  metadata = null,
  metadataLabel = '721',
}: Delegate): Promise<string> => {
  const protocolParameter = await getProtocolParameter()
  const stakeAddress = await CardanoAPIObject.baseCommands.getRewardAddress(
    CardanoAPIObject.addressReturnType.bech32
  )

  const stakeKeyHash = errorIfUndefined(
    errorIfUndefined(
      CardanoAPIObject.serializationLib.RewardAddress.from_address(
        errorIfUndefined(
          CardanoAPIObject.serializationLib.Address.from_bech32(
            String(stakeAddress)
          )
        )
      )
    )
      .payment_cred()
      .to_keyhash()
  ).to_bytes()

  const getDelegation = async (
    rewardAddr: string
  ): Promise<{ active: boolean; rewards: string; stakepoolId: string }> => {
    //@ts-ignore
    const stake = await CardanoAPIObject.plugins.data.request(
      `/accounts/${rewardAddr}`
    )
    if (!stake || stake.error)
      //|| !stake.pool_id
      throw new Error('Blockfrost data retreived is incorrect')
    return {
      active: stake.active,
      rewards: stake.withdrawable_amount,
      stakepoolId: stakepoolId,
    }
  }

  const delegation = await getDelegation(String(stakeAddress))
  //@ts-ignore
  const pool = await CardanoAPIObject.plugins.data.request(
    `/pools/${stakepoolId}`
  )
  const poolHex = pool.hex

  const utxos = await CardanoAPIObject.baseCommands.getUtxos()

  const paymentAddress = await CardanoAPIObject.baseCommands.getChangeAddress(
    CardanoAPIObject.addressReturnType.bech32
  )

  const outputs = CardanoAPIObject.serializationLib.TransactionOutputs.new()

  const addr = CardanoAPIObject.serializationLib.Address.from_bech32(
    String(paymentAddress)
  )
  const value = CardanoAPIObject.serializationLib.Value.new(
    CardanoAPIObject.serializationLib.BigNum.from_str(
      protocolParameter.keyDeposit
    )
  )
  outputs.add(
    CardanoAPIObject.serializationLib.TransactionOutput.new(addr, value)
  )

  const RawTransaction = _txBuilder({
    PaymentAddress: String(paymentAddress),
    Utxos: utxos,
    ProtocolParameter: protocolParameter,
    Outputs: outputs,
    Delegation: {
      poolHex: poolHex,
      stakeKeyHash: stakeKeyHash,
      delegation: delegation,
    },
    Metadata: metadata,
    MetadataLabel: metadataLabel,
  })

  return await _signSubmitTx(RawTransaction)
}

const _txBuilder = ({
  PaymentAddress,
  Utxos,
  Outputs,
  ProtocolParameter,
  Metadata = null,
  MetadataLabel = '721',
  Delegation = null,
}: {
  PaymentAddress: string
  Utxos: UTxOList
  Outputs: TransactionOutputs
  ProtocolParameter: ProtocolParameter
  Metadata?: Metadata
  MetadataLabel?: string
  Delegation?: {
    stakeKeyHash: Uint8Array
    poolHex: string
    delegation: {
      active: boolean
      rewards: string
      stakepoolId: string
    }
  } | null
}): Uint8Array => {
  const MULTIASSET_SIZE = 5000
  const VALUE_SIZE = 5000
  const totalAssets = 0
  setProtocolParameters(
    ProtocolParameter.minUtxo.toString(),
    ProtocolParameter.linearFee.minFeeA.toString(),
    ProtocolParameter.linearFee.minFeeB.toString(),
    ProtocolParameter.maxTxSize.toString()
  )
  const selection = randomImprove(Utxos, Outputs, 20 + totalAssets)

  const inputs = selection.input

  const txBuilder = CardanoAPIObject.serializationLib.TransactionBuilder.new(
    CardanoAPIObject.serializationLib.LinearFee.new(
      CardanoAPIObject.serializationLib.BigNum.from_str(
        ProtocolParameter.linearFee.minFeeA
      ),
      CardanoAPIObject.serializationLib.BigNum.from_str(
        ProtocolParameter.linearFee.minFeeB
      )
    ),
    CardanoAPIObject.serializationLib.BigNum.from_str(
      ProtocolParameter.minUtxo.toString()
    ),
    CardanoAPIObject.serializationLib.BigNum.from_str(
      ProtocolParameter.poolDeposit.toString()
    ),
    CardanoAPIObject.serializationLib.BigNum.from_str(
      ProtocolParameter.keyDeposit.toString()
    ),
    MULTIASSET_SIZE,
    MULTIASSET_SIZE
  )

  for (var i = 0; i < inputs.length; i++) {
    const utxo = inputs[i]
    txBuilder.add_input(
      utxo.output().address(),
      utxo.input(),
      utxo.output().amount()
    )
  }

  if (Delegation) {
    const certificates = CardanoAPIObject.serializationLib.Certificates.new()
    if (!Delegation.delegation.active) {
      certificates.add(
        CardanoAPIObject.serializationLib.Certificate.new_stake_registration(
          CardanoAPIObject.serializationLib.StakeRegistration.new(
            CardanoAPIObject.serializationLib.StakeCredential.from_keyhash(
              CardanoAPIObject.serializationLib.Ed25519KeyHash.from_bytes(
                Delegation.stakeKeyHash
              )
            )
          )
        )
      )
    }
    const poolKeyHash = Delegation.poolHex

    certificates.add(
      CardanoAPIObject.serializationLib.Certificate.new_stake_delegation(
        CardanoAPIObject.serializationLib.StakeDelegation.new(
          CardanoAPIObject.serializationLib.StakeCredential.from_keyhash(
            CardanoAPIObject.serializationLib.Ed25519KeyHash.from_bytes(
              Delegation.stakeKeyHash
            )
          ),
          CardanoAPIObject.serializationLib.Ed25519KeyHash.from_bytes(
            CardanoAPIObject.buffer.from(poolKeyHash, 'hex')
          )
        )
      )
    )
    txBuilder.set_certs(certificates)
  }

  let AUXILIARY_DATA

  if (Metadata) {
    const METADATA =
      CardanoAPIObject.serializationLib.GeneralTransactionMetadata.new()
    METADATA.insert(
      CardanoAPIObject.serializationLib.BigNum.from_str(MetadataLabel),
      CardanoAPIObject.serializationLib.encode_json_str_to_metadatum(
        JSON.stringify(Metadata),
        0
      )
    )
    AUXILIARY_DATA = CardanoAPIObject.serializationLib.AuxiliaryData.new()
    AUXILIARY_DATA.set_metadata(METADATA)
    txBuilder.set_auxiliary_data(AUXILIARY_DATA)
  }

  for (var i = 0; i < Outputs.len(); i++) {
    txBuilder.add_output(Outputs.get(i))
  }

  const change = selection.change
  const changeMultiAssets = change.multiasset()
  // check if change value is too big for single output
  if (changeMultiAssets && change.to_bytes().length * 2 > VALUE_SIZE) {
    const partialChange = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.BigNum.from_str('0')
    )
    const partialMultiAssets =
      CardanoAPIObject.serializationLib.MultiAsset.new()
    const policies = changeMultiAssets.keys()
    const makeSplit = () => {
      for (var j = 0; j < changeMultiAssets.len(); j++) {
        const policy = policies.get(j)
        const policyAssets = errorIfUndefined(changeMultiAssets.get(policy))
        const assetNames = policyAssets.keys()
        const assets = CardanoAPIObject.serializationLib.Assets.new()
        for (var k = 0; k < assetNames.len(); k++) {
          const policyAsset = assetNames.get(k)
          const quantity = errorIfUndefined(policyAssets.get(policyAsset))
          assets.insert(policyAsset, quantity)
          //check size
          const checkMultiAssets =
            CardanoAPIObject.serializationLib.MultiAsset.from_bytes(
              partialMultiAssets.to_bytes()
            )
          checkMultiAssets.insert(policy, assets)
          if (checkMultiAssets.to_bytes().length * 2 >= MULTIASSET_SIZE) {
            partialMultiAssets.insert(policy, assets)
            return
          }
        }
        partialMultiAssets.insert(policy, assets)
      }
    }

    makeSplit()
    partialChange.set_multiasset(partialMultiAssets)
    const minAda = CardanoAPIObject.serializationLib.min_ada_required(
      partialChange,
      ProtocolParameter.minUtxo
    )
    partialChange.set_coin(minAda)

    txBuilder.add_output(
      CardanoAPIObject.serializationLib.TransactionOutput.new(
        CardanoAPIObject.serializationLib.Address.from_bech32(PaymentAddress),
        partialChange
      )
    )
  }
  txBuilder.add_change_if_needed(
    CardanoAPIObject.serializationLib.Address.from_bech32(PaymentAddress)
  )
  const transaction = CardanoAPIObject.serializationLib.Transaction.new(
    txBuilder.build(),
    CardanoAPIObject.serializationLib.TransactionWitnessSet.new(),
    AUXILIARY_DATA
  )

  const size = transaction.to_bytes().length * 2
  if (size > ProtocolParameter.maxTxSize) {
    throw 'The transaction is to large'
  }

  return transaction.to_bytes()
}

const _makeMultiAsset = (assets: Asset[]): MultiAsset => {
  const AssetsMap: any = {}
  for (const asset of assets) {
    const [policy, assetName] = asset.unit.split('.')
    const quantity = asset.quantity
    if (!Array.isArray(AssetsMap[policy])) {
      AssetsMap[policy] = []
    }
    AssetsMap[policy].push({
      unit: CardanoAPIObject.buffer.from(assetName, 'ascii').toString('hex'),
      quantity: quantity,
    })
  }
  const multiAsset = CardanoAPIObject.serializationLib.MultiAsset.new()
  for (const policy in AssetsMap) {
    const ScriptHash = CardanoAPIObject.serializationLib.ScriptHash.from_bytes(
      CardanoAPIObject.buffer.from(policy, 'hex')
    )
    const Assets = CardanoAPIObject.serializationLib.Assets.new()

    const _assets = AssetsMap[policy]

    for (const asset of _assets) {
      const AssetName = CardanoAPIObject.serializationLib.AssetName.new(
        CardanoAPIObject.buffer.from(asset.unit, 'hex')
      )
      const BigNum = CardanoAPIObject.serializationLib.BigNum.from_str(
        String(asset.quantity)
      )
      Assets.insert(AssetName, BigNum)
    }
    multiAsset.insert(ScriptHash, Assets)
  }
  return multiAsset
}

const _signSubmitTx = async (transactionRaw: Uint8Array): Promise<string> => {
  const transaction =
    CardanoAPIObject.serializationLib.Transaction.from_bytes(transactionRaw)
  const witneses = await CardanoAPIObject.baseCommands.signTx(transaction)
  const TransactionWitness =
    CardanoAPIObject.serializationLib.TransactionWitnessSet.from_bytes(
      CardanoAPIObject.buffer.from(witneses, 'hex')
    )
  const signedTx = CardanoAPIObject.serializationLib.Transaction.new(
    transaction.body(),
    TransactionWitness,
    transaction.auxiliary_data()
  )
  if (typeof signedTx === 'string') {
    throw new Error('signedTx can not be a hex string')
  }

  return await CardanoAPIObject.baseCommands.submitTx(signedTx)
}
const getProtocolParameter = async () => {
  //@ts-ignore
  const latestBlock = await CardanoAPIObject.plugins.data.request(
    '/blocks/latest'
  )
  if (!latestBlock) throw 'invalid protocal parameters'
  //@ts-ignore
  const p = await CardanoAPIObject.plugins.data.request(
    `/epochs/${latestBlock.epoch}/parameters`
  )
  if (!p) throw 'invalid protocal parameters'

  const parameters = {
    linearFee: {
      minFeeA: p.min_fee_a.toString(),
      minFeeB: p.min_fee_b.toString(),
    },
    minUtxo: '1000000',
    poolDeposit: p.pool_deposit,
    keyDeposit: p.key_deposit,
    maxTxSize: p.max_tx_size,
    slot: latestBlock.slot,
  }
  return parameters
}

const getAssets = async (address: string) => {
  //@ts-ignore
  const assets = await CardanoAPIObject.plugins.data.request(
    `/accounts/${address}/addresses/assets`
  )

  return assets
}
