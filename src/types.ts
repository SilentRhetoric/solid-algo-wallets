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

export type NetworkConfig = {
  algodToken: string // The Algod API token to use for the server
  algodServer: string // The Algod API URL to use
  algodPort: number // The Algod port to use for a localhost network
  peraChainId: 416001 | 416002 | 416003 | 4160 // Chain ID for Pera Wallet and forks (WalletConnect v1)
  walletConnect2ChainID: string // The algorand:... ID for each Algorand network
  blockExplorer: string // The block explorer to link out to
  nfdServer: string // The API URL to do NFD lookups
}

export type NetworkName = 'MainNet' | 'TestNet' | 'BetaNet' | 'LocalNet'

export type NetworkConfigs = {
  [K in NetworkName]: NetworkConfig
}
