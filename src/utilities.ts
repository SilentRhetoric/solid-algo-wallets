import { AssetData } from './types'

import { Buffer } from 'buffer'
// Added global = globalThis in index.html to make this work
globalThis.Buffer = Buffer

export function ellipseAddress(address = '', width = 4): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function numberWithCommas(num: number | string): string {
  const num_parts = num.toString().split('.')
  num_parts[0] = num_parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}

export function formatNumWithDecimals(num: number, decimals: number): string {
  const shifted_num = (num /= Math.pow(10, decimals))
  const shifted_num_string = shifted_num.toString()
  return shifted_num_string
}

export function displayAssetAmount(asset: AssetData) {
  try {
    return numberWithCommas(formatNumWithDecimals(asset.amount, asset.decimals))
  } catch (e) {
    return '0'
  }
}

export function makeBigIntAmount(decimal_amount: number, asset: AssetData): bigint {
  const bigIntAmount = BigInt(decimal_amount * Math.pow(10, asset.decimals))
  return bigIntAmount
}

export function validateAmount(amount_str: string, asset: AssetData | null): 'valid' | 'invalid' {
  if (asset == null) {
    return 'valid' // Don't throw validation error if no asset selected
  } else {
    const re = '^([0-9]+(?:[.][0-9]*)?|.[0-9]+)?$'
    const amount_num = Number(amount_str)
    if (amount_str.match(re) && amount_num >= 0) {
      try {
        const bigIntAmount = BigInt(amount_num * Math.pow(10, asset.decimals))
        if (bigIntAmount <= asset.amount) {
          return 'valid'
        } else return 'invalid'
      } catch {
        return 'invalid'
      }
    } else {
      return 'invalid'
    }
  }
}

export function makeAlgoAssetDataObj(amt: number): AssetData {
  return {
    id: 0,
    // idString: "0",
    amount: amt,
    // amountString: formatBigNumWithDecimals(amt, 6),
    frozen: false,
    decimals: 6,
    name: 'ALGO',
    unitName: 'ALGO',
    total: 10000000000000000,
  } as AssetData
}

export function makeAssetDataObj(assetIndex: number, amount: number): AssetData {
  const assetData: AssetData = {
    id: assetIndex,
    // idString: assetIndex.toString(),
    amount,
    // amountString: formatBigNumWithDecimals(amount, 0),
    frozen: false,
    decimals: 0,
    name: '',
    unitName: '',
    url: '',
    total: 0,
  }
  return assetData
}

export function assetFungible(asset: AssetData): boolean {
  if (asset.id == 0) {
    return true
  } else {
    if (asset.total > 100000 && asset.frozen != true) {
      if (asset.name || asset.unitName) {
        return true
      } else return false
    } else return false
  }
}

export function dealKeyZero(dealKey: Uint8Array) {
  const zeroKey = new Uint8Array(33)

  if (dealKey.length !== zeroKey.length) {
    return false
  }
  var i = dealKey.length
  while (i--) {
    if (dealKey[i] !== zeroKey[i]) {
      return false
    }
  }
  return true
}

export function mergeArrays(arrays: Uint8Array[]): Uint8Array {
  // Get the total length of all arrays
  let length = 0
  arrays.forEach(item => {
    length += item.length
  })
  // Create a new array with total length and merge all source arrays
  const mergedArray = new Uint8Array(length)
  let offset = 0
  arrays.forEach(item => {
    mergedArray.set(item, offset)
    offset += item.length
  })

  return mergedArray
}
