/*
 * Documentation:
 * https://github.com/perawallet/connect
 */
import { PeraWalletConnect } from '@perawallet/connect'
import { WalletAccount, WalletInterface } from '../types'
import type { Transaction } from 'algosdk'
import { createComputed, createRoot, createSignal } from 'solid-js'
import useNetwork from '../useNetwork'

function usePera(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<PeraWalletConnect>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  const { getChainId } = useNetwork

  createComputed(() => console.debug(getChainId()))

  const name = 'Pera'

  function icon() {
    return (
      <svg
        width="100%"
        height="32"
        viewBox="0 0 86 96"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M48.5471 14.107C50.5942 22.5886 49.9022 30.0494 47.0014 30.771C44.1007 31.4926 40.0896 25.202 38.0425 16.7203C35.9953 8.23873 36.6874 0.778021 39.5881 0.056374C42.4889 -0.665273 46.4999 5.62542 48.5471 14.107Z" />
        <path d="M82.3504 21.3992C77.8168 16.5942 68.7972 17.8966 62.2045 24.3081C55.6118 30.7196 53.9426 39.8123 58.4762 44.6173C63.0098 49.4222 72.0294 48.1199 78.6221 41.7084C85.2148 35.2969 86.884 26.2041 82.3504 21.3992Z" />
        <path d="M46.2926 94.9747C49.1934 94.253 49.7835 86.3702 47.6107 77.368C45.4379 68.3657 41.325 61.653 38.4242 62.3746C35.5235 63.0963 34.9333 70.9791 37.1061 79.9813C39.2789 88.9836 43.3918 95.6963 46.2926 94.9747Z" />
        <path d="M16.7223 25.7982C25.0912 28.2661 31.2064 32.5958 30.3809 35.4687C29.5555 38.3417 22.1021 38.67 13.7332 36.2021C5.36438 33.7341 -0.750778 29.4045 0.0746392 26.5315C0.900056 23.6586 8.35349 23.3302 16.7223 25.7982Z" />
        <path d="M71.0398 58.2396C79.9223 60.859 86.4539 65.3115 85.6285 68.1844C84.8031 71.0574 76.9332 71.2629 68.0507 68.6435C59.1681 66.024 52.6365 61.5716 53.4619 58.6986C54.2873 55.8257 62.1572 55.6201 71.0398 58.2396Z" />
        <path d="M26.1392 52.2116C24.0639 50.0603 17.2567 53.1913 10.935 59.205C4.61326 65.2187 1.17089 71.8377 3.24624 73.989C5.32159 76.1403 12.1288 73.0093 18.4505 66.9956C24.7722 60.9819 28.2146 54.3629 26.1392 52.2116Z" />
      </svg>
    )
  }

  const image = (
    <svg width="100%" height="32" viewBox="0 0 699 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M164.782 63.7108C170.069 85.6186 168.282 104.889 160.789 106.753C153.297 108.617 142.936 92.3688 137.649 70.461C132.361 48.5532 134.148 29.2823 141.641 27.4183C149.134 25.5543 159.494 41.803 164.782 63.7108Z" />
      <path d="M252.095 82.5463C240.385 70.1352 217.087 73.4991 200.058 90.0599C183.03 106.621 178.718 130.107 190.428 142.518C202.139 154.929 225.436 151.565 242.465 135.004C259.493 118.444 263.805 94.9574 252.095 82.5463Z" />
      <path d="M158.958 272.59C166.451 270.726 167.975 250.365 162.363 227.112C156.751 203.86 146.127 186.521 138.635 188.385C131.142 190.249 129.618 210.61 135.23 233.863C140.842 257.115 151.466 274.454 158.958 272.59Z" />
      <path d="M82.5791 93.9088C104.196 100.283 119.991 111.467 117.859 118.888C115.727 126.308 96.4749 127.156 74.8584 120.782C53.2418 114.407 37.4465 103.224 39.5785 95.803C41.7106 88.3823 60.9626 87.5342 82.5791 93.9088Z" />
      <path d="M222.88 177.704C245.823 184.47 262.694 195.971 260.562 203.391C258.43 210.812 238.102 211.343 215.159 204.577C192.216 197.811 175.345 186.311 177.477 178.89C179.609 171.469 199.936 170.938 222.88 177.704Z" />
      <path d="M106.903 162.134C101.542 156.577 83.9594 164.665 67.6306 180.198C51.3017 195.731 42.4101 212.828 47.7707 218.385C53.1313 223.941 70.714 215.854 87.0429 200.321C103.372 184.788 112.263 167.691 106.903 162.134Z" />
      <path d="M346.861 96.205V91.4527H327.272V218.182H346.861V184.035C346.861 180.339 346.861 177.347 346.504 173.299H346.861C353.984 184.916 366.093 191.076 380.338 191.076C404.378 191.076 425.391 172.947 425.391 139.328C425.391 106.414 404.378 88.6365 380.338 88.6365C366.627 88.6365 354.518 94.6209 346.861 106.414H346.504C346.861 102.541 346.861 99.7253 346.861 96.205ZM375.352 174.355C357.189 174.179 346.682 158.866 346.682 139.152C346.682 120.495 357.189 105.534 375.352 105.358C393.16 105.182 404.913 118.911 404.913 139.328C404.913 160.274 393.16 174.531 375.352 174.355Z" />
      <path d="M528.251 131.056C528.251 106.766 508.663 88.6365 481.952 88.6365C453.46 88.6365 433.694 107.822 433.694 139.856C433.694 170.658 453.104 191.076 481.952 191.076C505.635 191.076 523.265 177.347 527.36 158.514H505.992C502.608 168.018 493.348 174.355 481.952 174.355C467.35 174.355 456.665 163.97 454.35 146.721H528.251V131.056ZM481.952 105.358C496.376 105.358 506.348 115.214 508.485 129.471H454.528C457.021 115.742 467.172 105.358 481.952 105.358Z" />
      <path d="M542.651 188.26H562.239V133.696C562.239 115.038 572.567 105.358 588.594 105.358H599.1V88.6365H590.731C576.307 88.6365 567.403 98.1412 562.239 106.414H561.883V91.4527H542.651V188.26Z" />
      <path d="M690.672 171.363C688.001 171.363 686.754 169.778 686.754 166.61V124.015C686.754 103.598 676.782 88.6365 647.4 88.6365C618.908 88.6365 605.909 102.718 604.484 122.783H624.072C625.319 111.87 634.045 105.358 647.4 105.358C658.797 105.358 666.632 110.286 666.632 118.031C666.632 124.367 662.18 128.239 647.578 128.239H639.743C616.415 128.239 600.745 137.568 600.745 158.866C600.745 181.219 617.306 191.428 636.716 191.428C651.14 191.428 663.427 185.092 668.235 171.539C668.769 181.395 675.358 188.26 687.823 188.26H698.863V171.363H690.672ZM667.166 143.2C667.166 165.026 655.235 174.531 639.921 174.531C626.565 174.531 621.223 166.786 621.223 158.866C621.223 151.297 625.853 145.137 640.099 145.137H642.948C656.66 145.137 665.207 140.384 666.988 132.112H667.166V143.2Z" />
    </svg>
  )

  async function getClient(): Promise<PeraWalletConnect> {
    const client = walletClient()
    if (client) {
      return client
    } else {
      const PeraWalletConnect = (await import('@perawallet/connect')).PeraWalletConnect
      // Apparently Pera works better if you just don't specify the chainId at all
      // const chainId = getChainId()
      // console.debug(chainId)
      // https://github.com/perawallet/connect#options
      const client = new PeraWalletConnect({
        // shouldShowSignTxnToast: false, // Enabled by default
        // chainId,
        // chainId: 416001, // MainNet
        // chainId: 416002, // TestNet
        // chainId: 416003, // BetaNet
        // chainId: 4160, // All networks
      })
      console.debug('Pera Client: ', client)
      setWalletClient(client)
      return client
    }
  }

  async function connect(onDisconnect: () => void): Promise<WalletAccount[]> {
    console.debug('Pera: connect')
    const client = await getClient()
    try {
      const accounts = await client.connect()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }
      const walletAccounts: WalletAccount[] = accounts.map((address: string, index: number) => ({
        name: `Pera Wallet ${index + 1}`,
        address,
      }))
      client.connector?.on('disconnect', event => {
        console.debug('Disconnect from Pera')
        event && console.debug('Event message: ', event.message)
        onDisconnect()
      })
      setAccounts(walletAccounts)
      return walletAccounts
    } catch (error: any) {
      if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        console.log(error)
      }
      return []
    }
  }

  async function reconnect(onDisconnect: () => void) {
    console.debug('Pera: reconnect')
    const client = await getClient()
    try {
      const accounts = await client.reconnectSession()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }
      const walletAccounts: WalletAccount[] = accounts.map((address: string, index: number) => ({
        name: `Pera Wallet ${index + 1}`,
        address,
      }))
      client.connector?.on('disconnect', event => {
        console.debug('Disconnect from Pera')
        event && console.debug('Event message: ', event.message)
        onDisconnect()
      })
      setAccounts(walletAccounts)
      return walletAccounts
    } catch (error: any) {
      if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        console.log(error)
      }
      onDisconnect()
      return []
    }
  }

  async function disconnect(onDisconnect: () => void) {
    console.debug('Disconnecting Pera')
    const client = walletClient()
    // console.debug("Client: ", JSON.stringify(client))
    if (client) {
      await client.disconnect().catch(error => {
        console.error('Error disconnecting Pera', error)
      })
    }
    console.debug('Pera disconnected')
    setAccounts([])
    onDisconnect()
  }

  interface SignerTransaction {
    txn: Transaction
    /**
     * Optional list of addresses that must sign the transactions.
     * Wallet skips to sign this txn if signers is empty array.
     * If undefined, wallet tries to sign it.
     */
    signers?: string[]
  }

  // Successfully tested with pay & app call groups 8/12/23, web & mobile
  async function transactionSigner(
    txnGroup: Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> {
    const client = walletClient()
    if (client) {
      const txnsToSign = txnGroup.reduce<SignerTransaction[]>((acc, txn, idx) => {
        if (indexesToSign.includes(idx)) {
          acc.push({ txn: txn })
        } else {
          acc.push({ txn: txn, signers: [] })
        }
        return acc
      }, [])
      console.debug('txnsToSign: ', txnsToSign)

      const signingResult = await client.signTransaction([txnsToSign])
      return signingResult
    } else {
      throw new Error('Wallet client is not initialized')
    }
  }

  return {
    name,
    icon,
    image,
    accounts,
    connect,
    disconnect,
    reconnect,
    transactionSigner,
  }
}

export default createRoot(usePera)
