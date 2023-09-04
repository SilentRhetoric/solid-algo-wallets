import { Algodv2, waitForConfirmation } from 'algosdk'
import { createComputed, createMemo, createRoot, createSignal } from 'solid-js'
import { AccountInfo, AssetData, ConfirmedTxn } from './types'
import { makeAlgoAssetDataObj, makeAssetDataObj } from './utilities'
// import appConfig from './networkConfig.json'

const MAINNET_ALGOD_TOKEN = import.meta.env.VITE_MAINNET_ALGOD_TOKEN
const MAINNET_ALGOD_SERVER = import.meta.env.VITE_MAINNET_ALGOD_SERVER
const MAINNET_ALGOD_PORT = import.meta.env.VITE_MAINNET_ALGOD_PORT
const MAINNET_WALLETCONNECT_CHAIN_ID = import.meta.env.VITE_MAINNET_WALLETCONNECT_CHAIN_ID
const MAINNET_PERA_CHAIN_ID = import.meta.env.VITE_MAINNET_PERA_CHAIN_ID
const MAINNET_BLOCK_EXPLORER = import.meta.env.VITE_MAINNET_BLOCK_EXPLORER
const MAINNET_NFD_SERVER = import.meta.env.VITE_MAINNET_NFD_SERVER

const TESTNET_ALGOD_TOKEN = import.meta.env.VITE_TESTNET_ALGOD_TOKEN
const TESTNET_ALGOD_SERVER = import.meta.env.VITE_TESTNET_ALGOD_SERVER
const TESTNET_ALGOD_PORT = import.meta.env.VITE_TESTNET_ALGOD_PORT
const TESTNET_WALLETCONNECT_CHAIN_ID = import.meta.env.VITE_TESTNET_WALLETCONNECT_CHAIN_ID
const TESTNET_PERA_CHAIN_ID = import.meta.env.VITE_TESTNET_PERA_CHAIN_ID
const TESTNET_BLOCK_EXPLORER = import.meta.env.TESTNET_BLOCK_EXPLORER
const TESTNET_NFD_SERVER = import.meta.env.TESTNET_NFD_SERVER

const BETANET_ALGOD_TOKEN = import.meta.env.VITE_BETANET_ALGOD_TOKEN
const BETANET_ALGOD_SERVER = import.meta.env.VITE_BETANET_ALGOD_SERVER
const BETANET_ALGOD_PORT = import.meta.env.VITE_BETANET_ALGOD_PORT
const BETANET_WALLETCONNECT_CHAIN_ID = import.meta.env.VITE_BETANET_WALLETCONNECT_CHAIN_ID
const BETANET_PERA_CHAIN_ID = import.meta.env.VITE_BETANET_PERA_CHAIN_ID
const BETANET_BLOCK_EXPLORER = import.meta.env.BETANET_BLOCK_EXPLORER
const BETANET_NFD_SERVER = import.meta.env.BETANET_NFD_SERVER

const LOCALNET_ALGOD_TOKEN = import.meta.env.VITE_LOCALNET_ALGOD_TOKEN
const LOCALNET_ALGOD_SERVER = import.meta.env.VITE_LOCALNET_ALGOD_SERVER
const LOCALNET_ALGOD_PORT = import.meta.env.VITE_LOCALNET_ALGOD_PORT
const LOCALNET_WALLETCONNECT_CHAIN_ID = import.meta.env.VITE_LOCALNET_WALLETCONNECT_CHAIN_ID
const LOCALNET_PERA_CHAIN_ID = import.meta.env.VITE_LOCALNET_PERA_CHAIN_ID
const LOCALNET_BLOCK_EXPLORER = import.meta.env.LOCALNET_BLOCK_EXPLORER
const LOCALNET_NFD_SERVER = import.meta.env.LOCALNET_NFD_SERVER

// type Config = {
//   // appID: number // The applicationID of the smart contract
//   algodToken: string // The Algod API token to use for the server
//   algodServer: string // The Algod API url to use
//   algodPort: string // The Algod port to use for a localhost network
//   blockExplorer: string // The block explorer to link out to
//   peraChainId: 416001 | 416002 | 416003 | 4160 // Chain ID for Pera Wallet and forks (WalletConnect v1)
//   walletConnect2ChainID: string // The algorand:... ID for each Algorand network
// }
// type ConfigDict = {
//   [K in NetworkName]: Config
// }

const MAINNET_CONFIG = {
  algodToken: MAINNET_ALGOD_TOKEN,
  algodServer: MAINNET_ALGOD_SERVER,
  algodPort: MAINNET_ALGOD_PORT,
  blockExplorer: MAINNET_BLOCK_EXPLORER,
  walletConnect2ChainID: MAINNET_WALLETCONNECT_CHAIN_ID,
  peraChainId: MAINNET_PERA_CHAIN_ID,
  nfdServer: MAINNET_NFD_SERVER,
}
const TESTNET_CONFIG = {
  algodToken: TESTNET_ALGOD_TOKEN,
  algodServer: TESTNET_ALGOD_SERVER,
  algodPort: TESTNET_ALGOD_PORT,
  blockExplorer: TESTNET_BLOCK_EXPLORER,
  walletConnect2ChainID: TESTNET_WALLETCONNECT_CHAIN_ID,
  peraChainId: TESTNET_PERA_CHAIN_ID,
  nfdServer: TESTNET_NFD_SERVER,
}
const BETANET_CONFIG = {
  algodToken: BETANET_ALGOD_TOKEN,
  algodServer: BETANET_ALGOD_SERVER,
  algodPort: BETANET_ALGOD_PORT,
  blockExplorer: BETANET_BLOCK_EXPLORER,
  walletConnect2ChainID: BETANET_WALLETCONNECT_CHAIN_ID,
  peraChainId: BETANET_PERA_CHAIN_ID,
  nfdServer: BETANET_NFD_SERVER,
}
const LOCALNET_CONFIG = {
  algodToken: LOCALNET_ALGOD_TOKEN,
  algodServer: LOCALNET_ALGOD_SERVER,
  algodPort: LOCALNET_ALGOD_PORT,
  blockExplorer: LOCALNET_BLOCK_EXPLORER,
  walletConnect2ChainID: LOCALNET_WALLETCONNECT_CHAIN_ID,
  peraChainId: LOCALNET_PERA_CHAIN_ID,
  nfdServer: LOCALNET_NFD_SERVER,
}

const networkConfigs = {
  MainNet: MAINNET_CONFIG,
  TestNet: TESTNET_CONFIG,
  BetaNet: BETANET_CONFIG,
  LocalNet: LOCALNET_CONFIG,
}

type NetworkName = 'MainNet' | 'TestNet' | 'BetaNet' | 'LocalNet'

// const networkConfigs = appConfig as ConfigDict
const networkNames = Object.keys(networkConfigs)

function useNetwork() {
  const [activeNetwork, setActiveNetwork] = createSignal<NetworkName>('TestNet')

  createComputed(() => console.debug(activeNetwork()))

  function getAlgodClient(network: NetworkName) {
    const config = networkConfigs[network]
    const token = config.algodToken ? config.algodToken : ''
    const server = config.algodServer ? config.algodServer : ''
    const port = config.algodPort ? config.algodPort : ''
    return new Algodv2(token, server, port)
  }

  const algodClient = createMemo(() => getAlgodClient(activeNetwork()))

  // function getAppID(): number {
  //   return networkConfigs[activeNetwork()]!.appID
  // }
  function getAddrUrl(addr: string): string {
    return `${networkConfigs[activeNetwork()].blockExplorer}/address/${addr}`
  }
  function getAsaUrl(index: number): string {
    return `${networkConfigs[activeNetwork()].blockExplorer}/asset/${index}`
  }
  function getTxUrl(txId: string): string {
    return `${networkConfigs[activeNetwork()].blockExplorer}/tx/${txId}`
  }
  function getChainId(): 416001 | 416002 | 416003 | 4160 {
    return networkConfigs[activeNetwork()].peraChainId
  }
  function getWalletConnect2ChainId(): string {
    return networkConfigs[activeNetwork()].walletConnect2ChainID
  }

  async function getAccountInfo(address: string) {
    const accountInfo = await algodClient().accountInformation(address).do()
    return accountInfo as AccountInfo
  }

  async function confirmTransaction(txId: string, timeout = 4) {
    const confirmation = (await waitForConfirmation(algodClient(), txId, timeout)) as ConfirmedTxn

    return { txId, ...confirmation }
  }

  async function getAssetData(assetData: AssetData): Promise<AssetData> {
    if (assetData.id > 0) {
      try {
        const asset = { ...assetData }
        const { params } = await algodClient().getAssetByID(asset.id).do()
        asset.name = params.name
        asset.unitName = params['unit-name']
        asset.url = params.url
        asset.decimals = params.decimals
        return asset
      } catch (e) {
        console.error('Error getting asset data: ', e)
        return assetData
      }
    } else {
      return assetData
    }
  }

  async function getAssetDataFromBigInts(assetIndex: BigInt, amount: BigInt): Promise<AssetData> {
    if (Number(assetIndex) == 0) {
      const newAlgoAsset = makeAlgoAssetDataObj(Number(amount))
      return newAlgoAsset
    } else {
      return await getAssetData(makeAssetDataObj(Number(assetIndex), Number(amount)))
    }
  }

  return {
    algodClient,
    activeNetwork,
    setActiveNetwork,
    // getAppID,
    getAddrUrl,
    getAsaUrl,
    getTxUrl,
    getChainId,
    getWalletConnect2ChainId,
    getAccountInfo,
    getAssetData,
    getAssetDataFromBigInts,
    confirmTransaction,
    networkConfigs,
    networkNames,
  }
}

export default createRoot(useNetwork)
