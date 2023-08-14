import { Algodv2, waitForConfirmation } from 'algosdk'
import { createMemo, createRoot, createSignal } from 'solid-js'
import appConfig from './networkConfig.json'
import { AccountInfo, AssetData, ConfirmedTxn } from './types'
import { makeAlgoAssetDataObj, makeAssetDataObj } from './utilities'

type Config = {
  appID: number // The applicationID of the smart contract
  algodToken: string // The Algod API token to use for the server
  algodServer: string // The Algod API url to use
  algodPort: string // The Algod port to use for a localhost network
  blockExplorer: string // The block explorer to link out to
  peraChainId: 416001 | 416002 | 416003 | 4160 // Chain ID for Pera Wallet and forks (WalletConnect v1)
  walletConnect2ChainID: string // The algorand:... ID for each Algorand network
}

type NetworkName = 'MainNet' | 'TestNet' | 'BetaNet' | 'LocalNet'

type ConfigDict = {
  [K in NetworkName]: Config
}

const networkConfigs = appConfig as ConfigDict
const networkNames = Object.keys(networkConfigs)

function useNetwork() {
  const [activeNetwork, setActiveNetwork] = createSignal<NetworkName>('TestNet')

  function getAlgodClient(network: keyof typeof networkConfigs) {
    const config = networkConfigs[network]
    const token = config.algodToken ? config.algodToken : ''
    const server = config.algodServer ? config.algodServer : ''
    const port = config.algodPort ? config.algodPort : ''
    return new Algodv2(token, server, port)
  }

  const algodClient = createMemo(() => getAlgodClient(activeNetwork()))

  function getAppID(): number {
    return networkConfigs[activeNetwork()].appID
  }
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
    getAppID,
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
