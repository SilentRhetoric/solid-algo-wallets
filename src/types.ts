import { EncodedTransaction, Transaction } from 'algosdk'
import { Accessor, JSX } from 'solid-js'

export type AccountInfo = {
  address: string
  amount: number
  assets: AssetBalance[]
  'min-balance': number
}

export type AssetBalance = {
  amount: number
  'asset-id': number
  'is-frozen': boolean
}

export interface AssetData {
  id: number
  // idString: string
  amount: number
  // amountString: string
  frozen: boolean
  decimals: number
  name?: string
  unitName?: string
  url?: string
  total: number
  // iconString?: string
  // icon?: JSX.Element
}

export type ConfirmedTxn = {
  'confirmed-round': number
  'global-state-delta': Record<string, unknown>[]
  'pool-error': string
  txn: {
    sig: Uint8Array
    txn: EncodedTransaction
  }
}

export type WalletAccount = {
  address: string
  name: string
}

export type WalletInterface = {
  name: string
  icon: () => JSX.Element
  image: JSX.Element
  accounts: Accessor<WalletAccount[]>
  connect: (onDisconnect: () => void) => Promise<WalletAccount[]>
  disconnect: (onDisconnect: () => void) => void
  reconnect: (onDisconnect: () => void) => Promise<WalletAccount[]>
  transactionSigner?: (txnGroup: Transaction[], indexesToSign: number[]) => Promise<Uint8Array[]>
  dispose?: () => void
}
