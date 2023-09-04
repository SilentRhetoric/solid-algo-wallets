import { makePersisted } from '@solid-primitives/storage'
import { WalletAccount, WalletInterface } from './types'
import { createRoot, createSignal } from 'solid-js'
import useMyAlgo from './wallets/myalgo'
import useExodus from './wallets/exodus'
import useLedger from './wallets/ledger'
import usePera from './wallets/pera'
import useDefly from './wallets/defly'
import useWalletConnect from './wallets/walletConnectV2'
import useWalletConnectNew from './wallets/walletConnectV2_new'
import useDaffi from './wallets/daffi'
import useLocalnet from './wallets/localnet'
import { audio } from './audio'
import { Transaction } from 'algosdk'

const getIsIOS = () => {
  if (typeof window !== 'undefined') {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any)?.MSStream
  } else {
    return false
  }
}

const isIOS = getIsIOS()
const keepWCAlive: HTMLAudioElement = new Audio()

function useWallet() {
  const walletInterfaces: WalletInterface[] = [
    useDefly,
    usePera,
    useWalletConnect,
    useLedger,
    useExodus,
    useMyAlgo,
    useDaffi,
    useLocalnet,
    useWalletConnectNew,
  ]
  const [activeWallet, setActiveWallet] = createSignal<WalletInterface>()
  const [walletName, setWalletName] = makePersisted(createSignal(''), { name: 'walletName' })
  const [address, setAddress] = createSignal('')

  function keepWCAliveStart() {
    // Playing an audio file preventsWalletConnect's web socket connection from
    // being dropped when iOS goes into background mode
    if (!isIOS) {
      return
    }
    keepWCAlive.src = audio
    keepWCAlive.autoplay = true
    keepWCAlive.volume = 0
    keepWCAlive.loop = true
    keepWCAlive.play()
  }

  function keepWCAliveStop() {
    if (!isIOS) {
      return
    }
    keepWCAlive.pause()
  }

  function resetApp() {
    setActiveWallet(undefined)
    setAddress('')
    setWalletName('')
  }

  async function connectWallet(wallet: WalletInterface) {
    // Using the iOS background audio for all wallet interactions
    keepWCAliveStart()
    try {
      let accounts: WalletAccount[] = []
      if (wallet.name === walletName()) {
        accounts = await wallet.reconnect(resetApp)
      } else {
        accounts = await wallet.connect(resetApp)
      }
      if (accounts.length > 0 && accounts[0]) {
        setAddress(accounts[0]?.address)
        setActiveWallet(wallet)
        setWalletName(wallet.name)
        // setWalletStore("name", wallet.name)
      } else {
        resetApp()
      }
    } catch (e) {
      console.error(e)
      resetApp()
    }

    keepWCAliveStop()
  }

  async function reconnectWallet() {
    console.debug('Attempting to reconnect wallet')
    try {
      const walletToReconnect = walletInterfaces.find(wallet => wallet.name === walletName())
      if (walletToReconnect) {
        console.debug('Attempting to reconnect wallet:', walletName())
        connectWallet(walletToReconnect)
      } else {
        console.debug('No wallet found to reconnect')
      }
    } catch (e) {
      console.error('Error reconnecting wallet: ', e)
      console.debug('Resetting app')
      resetApp()
    }
  }

  async function disconnectWallet() {
    console.debug('Disconnecting wallet')
    try {
      activeWallet()?.disconnect(resetApp)
    } catch (e) {
      console.error('Error disconnecting wallet: ', e)
    } finally {
      console.debug('Resetting app')
      resetApp()
    }
  }

  // createComputed(on(address, () => console.debug("Address changed: ", address()), { defer: true }))

  async function signTransactions() {}

  async function transactionSigner(
    txnGroup: Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> {
    const wallet = activeWallet()
    if (wallet !== undefined && wallet.transactionSigner) {
      // Using the iOS background audio for all wallet interactions
      keepWCAliveStart()
      const signedTxns = await wallet.transactionSigner(txnGroup, indexesToSign)
      keepWCAliveStop()
      return signedTxns
    } else {
      throw new Error('Error while signing')
    }
  }

  return {
    activeWallet,
    setActiveWallet,
    walletName,
    setWalletName,
    address,
    setAddress,
    connectWallet,
    reconnectWallet,
    disconnectWallet,
    walletInterfaces,
    signTransactions,
    transactionSigner,
  }
}

export default createRoot(useWallet)
