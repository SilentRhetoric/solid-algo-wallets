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
  amount: number
  frozen: boolean
  decimals: number
  name?: string
  unitName?: string
  url?: string
  total: number
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
  image: () => JSX.Element
  accounts: Accessor<WalletAccount[]>
  connect: (onDisconnect: () => void) => Promise<WalletAccount[]>
  disconnect: (onDisconnect: () => void) => void
  reconnect: (onDisconnect: () => void) => Promise<WalletAccount[]>
  transactionSigner?: (txnGroup: Transaction[], indexesToSign: number[]) => Promise<Uint8Array[]>
  dispose?: () => void
}

export type NetworkConfig = {
  algodToken: string // The Algod API token to use for the server
  algodServer: string // The Algod API URL to use
  algodPort: number // The Algod port to use for a localhost network
  blockExplorer?: string // The block explorer to link out to, either algoexplorer or dappflow
}

export type NetworkName = 'MainNet' | 'TestNet' | 'BetaNet' | 'LocalNet'

export type NetworkConfigs = {
  [K in NetworkName]: NetworkConfig
}
