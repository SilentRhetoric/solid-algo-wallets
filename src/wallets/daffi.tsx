/*
 * Documentation:
 * https://github.com/RDinitiativ/daffiwallet_connect
 */
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { WalletAccount, WalletInterface } from '../types'
import type { Transaction } from 'algosdk'
import { createRoot, createSignal } from 'solid-js'
import useNetwork from '../useNetwork'

function useDaffi(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<DaffiWalletConnect>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  const { getChainId } = useNetwork

  const name = 'Daffi'

  function icon() {
    return (
      <svg
        width="100%"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1999.44 1999.44"
      >
        <path
          fill="#e1ca20"
          d="M1650.74,1544.72l-173.9,299.8c149-85.28,273.01-209.27,359.06-358.13,.15-.26,.3-.52,.45-.78l-40.04-191.81-145.56,250.93Z"
        />
        <path
          fill="#f5941f"
          d="M1796.3,1293.79l40.04,191.81c82.25-142.62,129.68-308.05,129.87-484.73l-169.91,292.91Z"
        />
        <path
          fill="#23b7a5"
          d="M696.02,1423.64c-87.88-56.5-167.35-143.59-202.11-242.86-40.85-116.64-49.97-252.78,1.34-367.74,35.36-79.25,95.69-145.35,163.91-197.91,23.51-18.11,48.17-34.81,73.82-49.74,6.74-3.95,21.74-16.25,30.04-16.25h1.39l-248.75-390.2L218.66,677.26,33.23,1000.88l315.47,543.84,173.9,299.8,216.08-397.79c-15.07-5.8-29.36-14.52-42.67-23.1Z"
        />
        <path
          fill="#f5941f"
          d="M81.57,696.91c-31.13,95.34-48.39,196.99-48.39,302.81l.05,1.16,185.43-323.62-137.09,19.65Z"
        />
        <path
          fill="#e1ca20"
          d="M515.64,158.93C312.22,277.65,156.15,468.71,81.57,696.91l137.09-19.65L515.64,158.93Z"
        />
        <path
          fill="#e1ca20"
          d="M33.23,1000.88c.19,177,47.79,342.72,130.32,485.51,54.02,18.87,124.91,42.41,185.15,58.33L33.23,1000.88Z"
        />
        <path
          fill="#f5941f"
          d="M163.55,1486.39c86.05,148.86,210.06,272.84,359.06,358.13l-173.9-299.8c-60.24-15.92-131.14-39.46-185.15-58.33Z"
        />
        <path
          fill="#e51e25"
          d="M998.95,158.86l484.85,.07C1341.66,75.98,1176.68,28.12,1000.49,27.73h0c-.26-.01-.51,0-.77,0-.26,0-.51,0-.77,0h0c-176.19,.4-341.17,48.26-483.31,131.21l483.31-.07Z"
        />
        <polygon
          fill="#69ccb2"
          points="1235.04 549.14 1483.8 158.93 998.95 158.86 515.64 158.93 764.4 549.14 1235.04 549.14"
        />
        <path
          fill="#23b7a5"
          d="M1483.8,158.93l-248.75,390.2h1.39c8.3,0,23.29,12.3,30.04,16.25,25.64,14.94,50.3,31.64,73.82,49.74,68.22,52.56,128.54,118.66,163.91,197.91,51.31,114.96,42.19,251.11,1.34,367.74-34.76,99.27-114.23,186.36-202.11,242.86-13.31,8.58-27.6,17.3-42.67,23.1l216.08,397.79,173.9-299.8,315.47-543.84-185.43-323.62L1483.8,158.93Z"
        />
        <path
          fill="#e1ca20"
          d="M1780.78,677.26l185.43,323.62,.05-1.16c0-105.82-17.26-207.48-48.39-302.81l-137.09-19.65Z"
        />
        <path
          fill="#f5941f"
          d="M1780.78,677.26l137.09,19.65c-74.58-228.19-230.65-419.26-434.07-537.97l296.98,518.32Z"
        />
        <path
          fill="#e51e25"
          d="M998.95,1846.93h0l-476.34-2.41c140.58,80.47,303.05,126.81,476.34,127.19h0c.26,.01,.51,0,.77,0s.51,0,.77,0h0c173.29-.39,335.76-46.72,476.34-127.2l-477.88,2.41Z"
        />
        <path
          fill="#69ccb2"
          d="M1250.91,1450.21l-251.19,.92-251.19-.92c-3.34-.93-6.59-2.22-9.84-3.47l-216.08,397.79,476.34,2.4h0l477.88-2.4-216.08-397.79c-3.26,1.25-6.51,2.55-9.84,3.47Z"
        />
      </svg>
    )
  }

  const image = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1999.44 1999.44" width="100%" height="32">
      <path
        fill="#e1ca20"
        d="M1650.74,1544.72l-173.9,299.8c149-85.28,273.01-209.27,359.06-358.13,.15-.26,.3-.52,.45-.78l-40.04-191.81-145.56,250.93Z"
      />
      <path
        fill="#f5941f"
        d="M1796.3,1293.79l40.04,191.81c82.25-142.62,129.68-308.05,129.87-484.73l-169.91,292.91Z"
      />
      <path
        fill="#23b7a5"
        d="M696.02,1423.64c-87.88-56.5-167.35-143.59-202.11-242.86-40.85-116.64-49.97-252.78,1.34-367.74,35.36-79.25,95.69-145.35,163.91-197.91,23.51-18.11,48.17-34.81,73.82-49.74,6.74-3.95,21.74-16.25,30.04-16.25h1.39l-248.75-390.2L218.66,677.26,33.23,1000.88l315.47,543.84,173.9,299.8,216.08-397.79c-15.07-5.8-29.36-14.52-42.67-23.1Z"
      />
      <path
        fill="#f5941f"
        d="M81.57,696.91c-31.13,95.34-48.39,196.99-48.39,302.81l.05,1.16,185.43-323.62-137.09,19.65Z"
      />
      <path
        fill="#e1ca20"
        d="M515.64,158.93C312.22,277.65,156.15,468.71,81.57,696.91l137.09-19.65L515.64,158.93Z"
      />
      <path
        fill="#e1ca20"
        d="M33.23,1000.88c.19,177,47.79,342.72,130.32,485.51,54.02,18.87,124.91,42.41,185.15,58.33L33.23,1000.88Z"
      />
      <path
        fill="#f5941f"
        d="M163.55,1486.39c86.05,148.86,210.06,272.84,359.06,358.13l-173.9-299.8c-60.24-15.92-131.14-39.46-185.15-58.33Z"
      />
      <path
        fill="#e51e25"
        d="M998.95,158.86l484.85,.07C1341.66,75.98,1176.68,28.12,1000.49,27.73h0c-.26-.01-.51,0-.77,0-.26,0-.51,0-.77,0h0c-176.19,.4-341.17,48.26-483.31,131.21l483.31-.07Z"
      />
      <polygon
        fill="#69ccb2"
        points="1235.04 549.14 1483.8 158.93 998.95 158.86 515.64 158.93 764.4 549.14 1235.04 549.14"
      />
      <path
        fill="#23b7a5"
        d="M1483.8,158.93l-248.75,390.2h1.39c8.3,0,23.29,12.3,30.04,16.25,25.64,14.94,50.3,31.64,73.82,49.74,68.22,52.56,128.54,118.66,163.91,197.91,51.31,114.96,42.19,251.11,1.34,367.74-34.76,99.27-114.23,186.36-202.11,242.86-13.31,8.58-27.6,17.3-42.67,23.1l216.08,397.79,173.9-299.8,315.47-543.84-185.43-323.62L1483.8,158.93Z"
      />
      <path
        fill="#e1ca20"
        d="M1780.78,677.26l185.43,323.62,.05-1.16c0-105.82-17.26-207.48-48.39-302.81l-137.09-19.65Z"
      />
      <path
        fill="#f5941f"
        d="M1780.78,677.26l137.09,19.65c-74.58-228.19-230.65-419.26-434.07-537.97l296.98,518.32Z"
      />
      <path
        fill="#e51e25"
        d="M998.95,1846.93h0l-476.34-2.41c140.58,80.47,303.05,126.81,476.34,127.19h0c.26,.01,.51,0,.77,0s.51,0,.77,0h0c173.29-.39,335.76-46.72,476.34-127.2l-477.88,2.41Z"
      />
      <path
        fill="#69ccb2"
        d="M1250.91,1450.21l-251.19,.92-251.19-.92c-3.34-.93-6.59-2.22-9.84-3.47l-216.08,397.79,476.34,2.4h0l477.88-2.4-216.08-397.79c-3.26,1.25-6.51,2.55-9.84,3.47Z"
      />
    </svg>
  )
  async function getClient(): Promise<DaffiWalletConnect> {
    const client = walletClient()
    if (client) {
      return client
    } else {
      const DaffiWalletConnect = (await import('@daffiwallet/connect')).DaffiWalletConnect
      const client = new DaffiWalletConnect({
        // shouldShowSignTxnToast: false, // Enabled by default
        chainId: getChainId(),
        // chainId: 416001, // MainNet
        // chainId: 416002, // TestNet
        // chainId: 416003, // BetaNet
        // chainId: 4160, // All networks
      })
      setWalletClient(client)
      return client
    }
  }

  async function connect(onDisconnect: () => void): Promise<WalletAccount[]> {
    console.debug('Daffi: connect')
    const client = await getClient()
    try {
      const accounts = await client.connect()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }
      const walletAccounts: WalletAccount[] = accounts.map((address: string, index: number) => ({
        name: `Daffi Wallet ${index + 1}`,
        address,
      }))
      client.connector?.on('disconnect', event => {
        console.debug('Disconnect from Daffi')
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
    console.debug('Daffi: reconnect')
    const client = await getClient()
    try {
      const accounts = await client.reconnectSession()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }
      const walletAccounts: WalletAccount[] = accounts.map((address: string, index: number) => ({
        name: `Daffi Wallet ${index + 1}`,
        address,
      }))
      client.connector?.on('disconnect', event => {
        console.debug('Disconnect from Daffi')
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
    console.debug('Disconnecting Daffi')
    const client = walletClient()
    // console.debug("Client: ", JSON.stringify(client))
    if (client) {
      await client.disconnect().catch(error => {
        console.error('Error disconnecting Daffi', error)
      })
    }
    console.debug('Daffi disconnected')
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

  // Successfully tested 8/12/23 with pay txn group on iOS app
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

export default createRoot(useDaffi)
