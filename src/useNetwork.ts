import { Algodv2, waitForConfirmation } from 'algosdk'
import { createMemo, createRoot, createSignal } from 'solid-js'
import {
  AccountInfo,
  AssetData,
  ConfirmedTxn,
  NetworkConfig,
  NetworkConfigs,
  NetworkName,
} from './types'

function UseNetwork() {
  const MAINNET_ALGOD_TOKEN = import.meta.env.VITE_MAINNET_ALGOD_TOKEN
  const MAINNET_ALGOD_SERVER = import.meta.env.VITE_MAINNET_ALGOD_SERVER
  const MAINNET_ALGOD_PORT = import.meta.env.VITE_MAINNET_ALGOD_PORT
  const MAINNET_BLOCK_EXPLORER = import.meta.env.VITE_MAINNET_BLOCK_EXPLORER

  const TESTNET_ALGOD_TOKEN = import.meta.env.VITE_TESTNET_ALGOD_TOKEN
  const TESTNET_ALGOD_SERVER = import.meta.env.VITE_TESTNET_ALGOD_SERVER
  const TESTNET_ALGOD_PORT = import.meta.env.VITE_TESTNET_ALGOD_PORT
  const TESTNET_BLOCK_EXPLORER = import.meta.env.VITE_TESTNET_BLOCK_EXPLORER

  const BETANET_ALGOD_TOKEN = import.meta.env.VITE_BETANET_ALGOD_TOKEN
  const BETANET_ALGOD_SERVER = import.meta.env.VITE_BETANET_ALGOD_SERVER
  const BETANET_ALGOD_PORT = import.meta.env.VITE_BETANET_ALGOD_PORT
  const BETANET_BLOCK_EXPLORER = import.meta.env.VITE_BETANET_BLOCK_EXPLORER

  const LOCALNET_ALGOD_TOKEN = import.meta.env.VITE_LOCALNET_ALGOD_TOKEN
  const LOCALNET_ALGOD_SERVER = import.meta.env.VITE_LOCALNET_ALGOD_SERVER
  const LOCALNET_ALGOD_PORT = import.meta.env.VITE_LOCALNET_ALGOD_PORT
  const LOCALNET_BLOCK_EXPLORER = import.meta.env.VITE_LOCALNET_BLOCK_EXPLORER

  const MAINNET_CONFIG: NetworkConfig = {
    algodToken: MAINNET_ALGOD_TOKEN,
    algodServer: MAINNET_ALGOD_SERVER,
    algodPort: MAINNET_ALGOD_PORT,
    blockExplorer: MAINNET_BLOCK_EXPLORER,
  }
  const TESTNET_CONFIG: NetworkConfig = {
    algodToken: TESTNET_ALGOD_TOKEN,
    algodServer: TESTNET_ALGOD_SERVER,
    algodPort: TESTNET_ALGOD_PORT,
    blockExplorer: TESTNET_BLOCK_EXPLORER,
  }
  const BETANET_CONFIG: NetworkConfig = {
    algodToken: BETANET_ALGOD_TOKEN,
    algodServer: BETANET_ALGOD_SERVER,
    algodPort: BETANET_ALGOD_PORT,
    blockExplorer: BETANET_BLOCK_EXPLORER,
  }
  const LOCALNET_CONFIG: NetworkConfig = {
    algodToken: LOCALNET_ALGOD_TOKEN,
    algodServer: LOCALNET_ALGOD_SERVER,
    algodPort: LOCALNET_ALGOD_PORT,
    blockExplorer: LOCALNET_BLOCK_EXPLORER,
  }

  const networkConfigs: NetworkConfigs = {
    MainNet: MAINNET_CONFIG,
    TestNet: TESTNET_CONFIG,
    BetaNet: BETANET_CONFIG,
    LocalNet: LOCALNET_CONFIG,
  }

  const networkNames = Object.keys(networkConfigs) as NetworkName[]

  const [activeNetwork, setActiveNetwork] = createSignal<NetworkName>('MainNet')

  const algodClient = createMemo(() => {
    const config = networkConfigs[activeNetwork()]
    const token = config.algodToken ? config.algodToken : ''
    const server = config.algodServer ? config.algodServer : ''
    const port = config.algodPort ? config.algodPort : ''
    return new Algodv2(token, server, port)
  })

  // TODO: Need to utilize URLs for Allo on other networks when available
  function getAddrUrl(addr: string): string {
    const config = networkConfigs[activeNetwork()]
    const url = config.blockExplorer
    if (url === 'https://app.dappflow.org') {
      if (activeNetwork() === 'LocalNet') {
        return `${url}/setnetwork?name=sandbox&redirect=explorer/account/${addr}`
      } else {
        return `${url}/setnetwork?name=algonode_${activeNetwork().toLowerCase()}&redirect=explorer/account/${addr}`
      }
    } else {
      return `${url}/account/${addr}` // Allo uses account instead of AE-style "address"
    }
  }
  function getAsaUrl(index: number): string {
    const config = networkConfigs[activeNetwork()]
    const url = config.blockExplorer
    if (url === 'https://app.dappflow.org') {
      if (activeNetwork() === 'LocalNet') {
        return `${url}/setnetwork?name=sandbox&redirect=explorer/asset/${index}`
      } else {
        return `${url}/setnetwork?name=algonode_${activeNetwork().toLowerCase()}&redirect=explorer/asset/${index}`
      }
    } else {
      return `${url}/asset/${index}`
    }
  }
  function getTxUrl(txId: string): string {
    const config = networkConfigs[activeNetwork()]
    const url = config.blockExplorer
    if (url === 'https://app.dappflow.org') {
      if (activeNetwork() === 'LocalNet') {
        return `${url}/setnetwork?name=sandbox&redirect=explorer/transaction/${txId}`
      } else {
        return `${url}/setnetwork?name=algonode_${activeNetwork().toLowerCase()}&redirect=explorer/transaction/${txId}`
      }
    } else {
      return `${url}/tx/${txId}`
    }
  }
  function getAppUrl(appId: number): string {
    const config = networkConfigs[activeNetwork()]
    const url = config.blockExplorer
    if (url === 'https://app.dappflow.org') {
      if (activeNetwork() === 'LocalNet') {
        return `${url}/setnetwork?name=sandbox&redirect=explorer/application/${appId}`
      } else {
        return `${url}/setnetwork?name=algonode_${activeNetwork().toLowerCase()}&redirect=explorer/application/${appId}`
      }
    } else {
      return `${url}/application/${appId}`
    }
  }

  async function confirmTransaction(txId: string, timeout = 4) {
    const confirmation = (await waitForConfirmation(algodClient(), txId, timeout)) as ConfirmedTxn
    return { txId, ...confirmation }
  }

  async function getAccountInfo(address: string): Promise<AccountInfo> {
    const accountInfo = await algodClient().accountInformation(address).do()
    return accountInfo as AccountInfo
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

  return {
    algodClient,
    activeNetwork,
    setActiveNetwork,
    getAddrUrl,
    getAppUrl,
    getAsaUrl,
    getTxUrl,
    getAccountInfo,
    getAssetData,
    confirmTransaction,
    networkConfigs,
    networkNames,
  }
}

export default createRoot(UseNetwork)
