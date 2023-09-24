/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_MAINNET_ALGOD_TOKEN: string
    readonly VITE_MAINNET_ALGOD_SERVER: string
    readonly VITE_MAINNET_ALGOD_PORT: number
    readonly VITE_MAINNET_BLOCK_EXPLORER:
      | 'https://mainnet-api.algonode.cloud'
      | 'https://app.dappflow.org'
    readonly VITE_TESTNET_ALGOD_TOKEN: string
    readonly VITE_TESTNET_ALGOD_SERVER: string
    readonly VITE_TESTNET_ALGOD_PORT: number
    readonly VITE_TESTNET_BLOCK_EXPLORER:
      | 'https://testnet.algoexplorer.io'
      | 'https://app.dappflow.org'
    readonly VITE_BETANET_ALGOD_TOKEN: string
    readonly VITE_BETANET_ALGOD_SERVER: string
    readonly VITE_BETANET_ALGOD_PORT: number
    readonly VITE_BETANET_BLOCK_EXPLORER:
      | 'https://betanet.algoexplorer.io'
      | 'https://app.dappflow.org'
    readonly VITE_LOCALNET_ALGOD_TOKEN: string
    readonly VITE_LOCALNET_ALGOD_SERVER: string
    readonly VITE_LOCALNET_ALGOD_PORT: number
    readonly VITE_LOCALNET_BLOCK_EXPLORER: 'https://app.dappflow.org'
    readonly VITE_WALLETCONNECT_PROJECT_ID: string
    readonly VITE_WALLETCONNECT_PROJECT_NAME: string
    readonly VITE_WALLETCONNECT_PROJECT_DESCRIPTION: string
    readonly VITE_WALLETCONNECT_PROJECT_URL: string
    readonly VITE_WALLETCONNECT_PROJECT_ICON: string
    NODE_ENV: 'production' | 'development'
    PROD: boolean
    DEV: boolean
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  // namespace NodeJS {
  //   interface ProcessEnv {
  //     NODE_ENV: 'production' | 'development'
  //     PROD: boolean
  //     DEV: boolean
  //   }
  // }
}

export {}
