import {
  TransactionOutputs,
  TransactionUnspentOutput,
  Value,
} from '@emurgo/cardano-serialization-lib-browser'
import { CardanoAPIObject, errorIfUndefined } from './CardanoAPI'

type AmountList = Array<Value>
export type UTxOList = Array<TransactionUnspentOutput>

export type UtxOSelection = {
  selection: UTxOList
  remaining: UTxOList
  subset: UTxOList
  amount: Value
}

type ImproveRange = {
  ideal: Value
  maximum: Value
}

type SelectionResult = {
  input: UTxOList
  output: TransactionOutputs
  remaining: UTxOList
  amount: Value
  change: Value
}

type ProtocolParameters = {
  coinsPerUtxoWord: string
  minFeeA: string
  minFeeB: string
  maxTxSize: string
}

let protocolParameters = undefined as ProtocolParameters | undefined

export const setProtocolParameters = (
  coinsPerUtxoWord: string,
  minFeeA: string,
  minFeeB: string,
  maxTxSize: string
) => {
  protocolParameters = {
    coinsPerUtxoWord: coinsPerUtxoWord,
    minFeeA: minFeeA,
    minFeeB: minFeeB,
    maxTxSize: maxTxSize,
  }
}

export const randomImprove = (
  inputs: UTxOList,
  outputs: TransactionOutputs,
  limit: number
): SelectionResult => {
  if (!protocolParameters)
    throw new Error('Protocol parameters not set. Use setProtocolParameters().')
  let utxoSelection: UtxOSelection = {
    selection: [],
    remaining: [...inputs],
    subset: [],
    amount: createEmptyValue(),
  }

  let mergedOutputsAmounts = mergeOutputsAmounts(outputs)
  let splitOutputsAmounts = splitAmounts(mergedOutputsAmounts)
  splitOutputsAmounts.forEach((splitOutputsAmount) => {
    createSubSet(utxoSelection, splitOutputsAmount)
    utxoSelection = select(utxoSelection, splitOutputsAmount, limit) //?
  })

  splitOutputsAmounts = sortAmountList(splitOutputsAmounts)

  splitOutputsAmounts.forEach((splitOutputsAmount) => {
    createSubSet(utxoSelection, splitOutputsAmount)

    const ideal = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.BigNum.from_str('0')
    )
      .checked_add(splitOutputsAmount)
      .checked_add(splitOutputsAmount)

    const maximum = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.BigNum.from_str('0')
    )
      .checked_add(ideal)
      .checked_add(splitOutputsAmount)

    const range: ImproveRange = {
      ideal: ideal,
      maximum: maximum,
    }

    improve(
      utxoSelection,
      splitOutputsAmount,
      limit - utxoSelection.selection.length,
      range
    )
  })

  if (utxoSelection.remaining.length > 0) {
    const change = utxoSelection.amount.checked_sub(mergedOutputsAmounts)

    let minAmount = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.min_ada_required(
        change,
        CardanoAPIObject.serializationLib.BigNum.from_str(
          protocolParameters.coinsPerUtxoWord
        )
      )
    )

    let maxFee: BigInt | Value =
      BigInt(protocolParameters.minFeeA) *
        BigInt(protocolParameters.maxTxSize) +
      BigInt(protocolParameters.minFeeB)

    maxFee = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.BigNum.from_str(maxFee.toString())
    )

    minAmount = minAmount.checked_add(maxFee)

    if ((compare(change, minAmount) || 0) < 0) {
      const minAda = minAmount
        .checked_sub(CardanoAPIObject.serializationLib.Value.new(change.coin()))
        .checked_add(
          CardanoAPIObject.serializationLib.Value.new(
            utxoSelection.amount.coin()
          )
        )

      createSubSet(utxoSelection, minAda)
      utxoSelection = select(utxoSelection, minAda, limit)
    }
  }

  return {
    input: utxoSelection.selection,
    output: outputs,
    remaining: utxoSelection.remaining,
    amount: utxoSelection.amount,
    change: utxoSelection.amount.checked_sub(mergedOutputsAmounts),
  }
}

function select(
  utxoSelection: UtxOSelection,
  outputAmount: Value,
  limit: number
): UtxOSelection {
  try {
    utxoSelection = randomSelect(
      cloneUTxOSelection(utxoSelection),
      outputAmount,
      limit - utxoSelection.selection.length
    )
  } catch (e: any) {
    if (e.message === 'INPUT_LIMIT_EXCEEDED') {
      utxoSelection = descSelect(utxoSelection, outputAmount)
    } else {
      throw e
    }
  }
  return utxoSelection
}

function randomSelect(
  utxoSelection: UtxOSelection,
  outputAmount: Value,
  limit: number
): UtxOSelection {
  let nbFreeUTxO = utxoSelection.subset.length

  if (isQtyFulfilled(outputAmount, utxoSelection.amount, nbFreeUTxO)) {
    utxoSelection.remaining = [
      ...utxoSelection.remaining,
      ...utxoSelection.subset,
    ]
    utxoSelection.subset = []
    return utxoSelection
  }

  if (limit <= 0) {
    throw new Error('INPUT_LIMIT_EXCEEDED')
  }

  if (nbFreeUTxO <= 0) {
    throw new Error('INPUTS_EXHAUSTED')
  }

  /** @type {TransactionUnspentOutput} utxo */
  let utxo = errorIfUndefined(
    utxoSelection.subset.splice(Math.floor(Math.random() * nbFreeUTxO), 1).pop()
  )

  utxoSelection.selection.push(utxo)
  utxoSelection.amount = addAmounts(
    utxo.output().amount(),
    utxoSelection.amount
  )

  return randomSelect(utxoSelection, outputAmount, limit - 1)
}

function descSelect(
  utxoSelection: UtxOSelection,
  outputAmount: Value
): UtxOSelection {
  utxoSelection.subset = utxoSelection.subset.sort((a, b) => {
    return Number(
      searchAmountValue(outputAmount, b.output().amount()) -
        searchAmountValue(outputAmount, a.output().amount())
    )
  })
  do {
    if (utxoSelection.subset.length <= 0) {
      throw new Error('INPUTS_EXHAUSTED')
    }

    let utxo: TransactionUnspentOutput = errorIfUndefined(
      utxoSelection.subset.splice(0, 1).pop()
    )

    utxoSelection.selection.push(utxo)
    utxoSelection.amount = addAmounts(
      utxo.output().amount(),
      utxoSelection.amount
    )
  } while (
    !isQtyFulfilled(
      outputAmount,
      utxoSelection.amount,
      utxoSelection.subset.length - 1
    )
  )

  utxoSelection.remaining = [
    ...utxoSelection.remaining,
    ...utxoSelection.subset,
  ]
  utxoSelection.subset = []

  return utxoSelection
}

function improve(
  utxoSelection: UtxOSelection,
  outputAmount: Value,
  limit: number,
  range: ImproveRange
): void {
  let nbFreeUTxO = utxoSelection.subset.length

  if (
    (compare(utxoSelection.amount, range.ideal) || 0) >= 0 ||
    nbFreeUTxO <= 0 ||
    limit <= 0
  ) {
    utxoSelection.remaining = [
      ...utxoSelection.remaining,
      ...utxoSelection.subset,
    ]
    utxoSelection.subset = []

    return
  }

  const utxo: TransactionUnspentOutput = errorIfUndefined(
    utxoSelection.subset.splice(Math.floor(Math.random() * nbFreeUTxO), 1).pop()
  )

  const newAmount: Value = CardanoAPIObject.serializationLib.Value.new(
    CardanoAPIObject.serializationLib.BigNum.from_str('0')
  )
    .checked_add(utxo.output().amount())
    .checked_add(outputAmount)

  if (
    abs(getAmountValue(range.ideal) - getAmountValue(newAmount)) <
      abs(getAmountValue(range.ideal) - getAmountValue(outputAmount)) &&
    (compare(newAmount, range.maximum) || 0) <= 0
  ) {
    utxoSelection.selection.push(utxo)
    utxoSelection.amount = addAmounts(
      utxo.output().amount(),
      utxoSelection.amount
    )
    limit--
  } else {
    utxoSelection.remaining.push(utxo)
  }

  return improve(utxoSelection, outputAmount, limit, range)
}

function mergeOutputsAmounts(outputs: TransactionOutputs): Value {
  let compiledAmountList = CardanoAPIObject.serializationLib.Value.new(
    CardanoAPIObject.serializationLib.BigNum.from_str('0')
  )

  for (let i = 0; i < outputs.len(); i++) {
    compiledAmountList = addAmounts(outputs.get(i).amount(), compiledAmountList)
  }

  return compiledAmountList
}

function addAmounts(amounts: Value, compiledAmounts: Value): Value {
  return compiledAmounts.checked_add(amounts)
}

function splitAmounts(amounts: Value): AmountList {
  let splitAmounts = []

  if (amounts.multiasset() && (amounts.multiasset()?.len() || 0) > 0) {
    let mA = errorIfUndefined(amounts.multiasset())
    for (let i = 0; i < mA.keys().len(); i++) {
      let scriptHash = mA.keys().get(i)

      for (
        let j = 0;
        j < errorIfUndefined(mA.get(scriptHash)).keys().len();
        j++
      ) {
        let _assets = CardanoAPIObject.serializationLib.Assets.new()
        let assetName = errorIfUndefined(mA.get(scriptHash)).keys().get(j)

        _assets.insert(
          CardanoAPIObject.serializationLib.AssetName.from_bytes(
            assetName.to_bytes()
          ),
          CardanoAPIObject.serializationLib.BigNum.from_bytes(
            errorIfUndefined(mA.get(scriptHash)?.get(assetName)?.to_bytes())
          )
        )

        let _multiasset = CardanoAPIObject.serializationLib.MultiAsset.new()
        _multiasset.insert(
          CardanoAPIObject.serializationLib.ScriptHash.from_bytes(
            scriptHash.to_bytes()
          ),
          _assets
        )
        let _value = CardanoAPIObject.serializationLib.Value.new(
          CardanoAPIObject.serializationLib.BigNum.from_str('0')
        )
        _value.set_multiasset(_multiasset)

        splitAmounts.push(_value)
      }
    }
  }

  splitAmounts = sortAmountList(splitAmounts, 'DESC')

  splitAmounts.push(
    CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.BigNum.from_bytes(
        amounts.coin().to_bytes()
      )
    )
  )
  return splitAmounts
}

function sortAmountList(
  amountList: AmountList,
  sortOrder: string = 'ASC'
): AmountList {
  return amountList.sort((a: Value, b: Value) => {
    let sortInt = sortOrder === 'DESC' ? BigInt(-1) : BigInt(1)
    return Number((getAmountValue(a) - getAmountValue(b)) * sortInt)
  })
}

function getAmountValue(amount: Value): bigint {
  let val = BigInt(0)
  let lovelace = BigInt(amount.coin().to_str())

  if (lovelace > 0) {
    val = lovelace
  } else if (
    amount.multiasset() &&
    errorIfUndefined(amount.multiasset()).len() > 0
  ) {
    let scriptHash = errorIfUndefined(amount.multiasset()).keys().get(0)
    let assetName = errorIfUndefined(
      amount.multiasset()?.get(scriptHash)?.keys().get(0)
    )
    val = BigInt(
      errorIfUndefined(
        errorIfUndefined(
          errorIfUndefined(amount.multiasset()).get(scriptHash)
        ).get(assetName)
      ).to_str()
    )
  }

  return val
}

function searchAmountValue(needle: Value, haystack: Value): bigint {
  let val = BigInt(0)
  let lovelace = BigInt(needle.coin().to_str())

  if (lovelace > 0) {
    val = BigInt(haystack.coin().to_str())
  } else if (
    needle.multiasset() &&
    haystack.multiasset() &&
    errorIfUndefined(needle.multiasset()).len() > 0 &&
    errorIfUndefined(haystack.multiasset()).len() > 0
  ) {
    let scriptHash = errorIfUndefined(needle.multiasset()).keys().get(0)
    let assetName = errorIfUndefined(
      errorIfUndefined(needle.multiasset()).get(scriptHash)
    )
      .keys()
      .get(0)
    val = BigInt(
      errorIfUndefined(
        errorIfUndefined(
          errorIfUndefined(haystack.multiasset()).get(scriptHash)
        ).get(assetName)
      ).to_str()
    )
  }

  return val
}

function createSubSet(utxoSelection: UtxOSelection, output: Value): void {
  if (BigInt(output.coin().to_str()) < BigInt(1)) {
    let subset: UTxOList = []
    let remaining: UTxOList = []
    utxoSelection.remaining.forEach(() => {})
    utxoSelection.remaining.forEach((utxoRemaining) => {
      if (compare(utxoRemaining.output().amount(), output) !== undefined) {
        subset.push(utxoRemaining)
      } else {
        remaining.push(utxoRemaining)
      }
    })

    utxoSelection.subset = subset
    utxoSelection.remaining = remaining
  } else {
    utxoSelection.subset = utxoSelection.remaining.splice(
      0,
      utxoSelection.remaining.length
    )
  }
}

function isQtyFulfilled(
  outputAmount: Value,
  cumulatedAmount: Value,
  nbFreeUTxO: number
): boolean {
  let amount = outputAmount
  if (Number(outputAmount.coin().to_str()) > 0) {
    let minAmount = CardanoAPIObject.serializationLib.Value.new(
      CardanoAPIObject.serializationLib.min_ada_required(
        cumulatedAmount,
        CardanoAPIObject.serializationLib.BigNum.from_str(
          errorIfUndefined(protocolParameters).coinsPerUtxoWord
        )
      )
    )

    if ((compare(cumulatedAmount, minAmount) || 0) < 0) return false //?

    if (nbFreeUTxO > 0) {
      let maxFee: BigInt | Value =
        BigInt(errorIfUndefined(protocolParameters).minFeeA) *
          BigInt(errorIfUndefined(protocolParameters).maxTxSize) +
        BigInt(errorIfUndefined(protocolParameters).minFeeB)

      maxFee = CardanoAPIObject.serializationLib.Value.new(
        CardanoAPIObject.serializationLib.BigNum.from_str(maxFee.toString())
      )

      amount = amount.checked_add(maxFee)
    }
  }

  return (compare(cumulatedAmount, amount) || 0) >= 0
}

function cloneUTxOSelection(utxoSelection: UtxOSelection): UtxOSelection {
  return {
    selection: cloneUTxOList(utxoSelection.selection),
    remaining: cloneUTxOList(utxoSelection.remaining),
    subset: cloneUTxOList(utxoSelection.subset),
    amount: cloneValue(utxoSelection.amount),
  }
}

const cloneUTxOList = (utxoList: UTxOList): UTxOList =>
  utxoList.map((utxo: { to_bytes: () => Uint8Array }) =>
    CardanoAPIObject.serializationLib.TransactionUnspentOutput.from_bytes(
      utxo.to_bytes()
    )
  )

const cloneValue = (value: Value): Value =>
  CardanoAPIObject.serializationLib.Value.from_bytes(value.to_bytes())

function abs(big: bigint) {
  return big < 0 ? big * BigInt(-1) : big
}

function compare(group: Value, candidate: Value): number | undefined {
  let gQty = Number(group.coin().to_str())
  let cQty = Number(candidate.coin().to_str())
  if (candidate.multiasset() && (candidate.multiasset()?.len() || 0) > 0) {
    let cScriptHash = errorIfUndefined(candidate.multiasset()).keys().get(0)
    let cAssetName = errorIfUndefined(
      candidate.multiasset()?.get(cScriptHash)?.keys().get(0)
    )

    if (group.multiasset() && group.multiasset()?.len()) {
      if (
        group.multiasset()?.get(cScriptHash) &&
        group.multiasset()?.get(cScriptHash)?.get(cAssetName)
      ) {
        gQty = Number(
          group.multiasset()?.get(cScriptHash)?.get(cAssetName)?.to_str()
        )
        cQty = Number(
          candidate.multiasset()?.get(cScriptHash)?.get(cAssetName)?.to_str()
        )
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  return gQty >= cQty ? (gQty === cQty ? 0 : 1) : -1
}

function createEmptyValue(): Value {
  const value = CardanoAPIObject.serializationLib.Value.new(
    CardanoAPIObject.serializationLib.BigNum.from_str('0')
  )
  const multiasset = CardanoAPIObject.serializationLib.MultiAsset.new()
  value.set_multiasset(multiasset)
  return value
}
