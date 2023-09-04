/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_MAINNET_ALGOD_TOKEN: string
    readonly VITE_MAINNET_ALGOD_SERVER: string
    readonly VITE_MAINNET_ALGOD_PORT: number
    readonly VITE_MAINNET_WALLETCONNECT_CHAIN_ID: string
    readonly VITE_MAINNET_PERA_CHAIN_ID: 416001 | 416002 | 416003 | 4160
    readonly VITE_MAINNET_BLOCK_EXPLORER: string
    readonly VITE_MAINNET_NFD_SERVER: string
    readonly VITE_TESTNET_ALGOD_TOKEN: string
    readonly VITE_TESTNET_ALGOD_SERVER: string
    readonly VITE_TESTNET_ALGOD_PORT: number
    readonly VITE_TESTNET_WALLETCONNECT_CHAIN_ID: string
    readonly VITE_TESTNET_PERA_CHAIN_ID: 416001 | 416002 | 416003 | 4160
    readonly VITE_TESTNET_BLOCK_EXPLORER: string
    readonly VITE_TESTNET_NFD_SERVER: string
    readonly VITE_BETANET_ALGOD_TOKEN: string
    readonly VITE_BETANET_ALGOD_SERVER: string
    readonly VITE_BETANET_ALGOD_PORT: number
    readonly VITE_BETANET_WALLETCONNECT_CHAIN_ID: string
    readonly VITE_BETANET_PERA_CHAIN_ID: 416001 | 416002 | 416003 | 4160
    readonly VITE_BETANET_BLOCK_EXPLORER: string
    readonly VITE_BETANET_NFD_SERVER: string
    readonly VITE_LOCALNET_ALGOD_TOKEN: string
    readonly VITE_LOCALNET_ALGOD_SERVER: string
    readonly VITE_LOCALNET_ALGOD_PORT: number
    readonly VITE_LOCALNET_WALLETCONNECT_CHAIN_ID: string
    readonly VITE_LOCALNET_PERA_CHAIN_ID: 416001 | 416002 | 416003 | 4160
    readonly VITE_LOCALNET_BLOCK_EXPLORER: string
    readonly VITE_LOCALNET_NFD_SERVER: string
  }
  interface ImportMeta {
    env: {
      NODE_ENV: 'production' | 'development'
      PROD: boolean
      DEV: boolean
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development'
      PROD: boolean
      DEV: boolean
    }
  }
}

export {}
