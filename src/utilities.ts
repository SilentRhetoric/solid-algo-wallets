import { AssetData } from './types'

import { Buffer } from 'buffer'
// Add global = globalThis in index.html to make this work
globalThis.Buffer = Buffer

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
