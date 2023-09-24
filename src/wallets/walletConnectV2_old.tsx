/*
 * Documentation:
 * https://docs.walletconnect.com/2.0/
 * https://docs.walletconnect.com/2.0/web/sign/dapp-usage (now dead link)
 * https://docs.walletconnect.com/2.0/advanced/migration-from-v1.x/dapps/dapp-checklist#common-errors-and-fixes
 * 9/4/23 It appears their libs changed again https://docs.walletconnect.com/2.0/api/sign/dapp-usage
 */
import { createRoot, createSignal } from 'solid-js'
import { WalletAccount, WalletInterface } from '../types'
import { Transaction } from 'algosdk'
import {
  WalletConnectModalSign,
  WalletConnectModalSignOptions,
  WalletConnectModalSignSession,
} from '@walletconnect/modal-sign-html'
import type { WalletConnectModalConfig } from '@walletconnect/modal'
import useNetwork from '../useNetwork'

export type WalletConnectTransaction = {
  txn: string
  signers?: string[]
  message?: string
}

export interface SignTxnOpts {
  message?: string
  // other options may be present, but are not standard
}

export type SignTxnParams = [WalletConnectTransaction[], SignTxnOpts?]

export interface JsonRpcRequest<T = any> {
  id: number
  jsonrpc: string
  method: string
  params: T
}

const getPayloadId = (): number => {
  const date = Date.now() * Math.pow(10, 3)
  const extra = Math.floor(Math.random() * Math.pow(10, 3))
  return date + extra
}

const formatJsonRpcRequest = <T = any,>(method: string, params: T): JsonRpcRequest => {
  return {
    id: getPayloadId(),
    jsonrpc: '2.0',
    method,
    params,
  }
}

function useWalletConnectOld(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<WalletConnectModalSign>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  const { activeNetwork } = useNetwork

  const name = 'WalletConnect'
  const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  const metadata = {
    name: import.meta.env.VITE_WALLETCONNECT_PROJECT_NAME,
    description: import.meta.env.VITE_WALLETCONNECT_PROJECT_DESCRIPTION,
    url: import.meta.env.VITE_WALLETCONNECT_PROJECT_URL,
    icons: [import.meta.env.VITE_WALLETCONNECT_PROJECT_ICON],
  }
  const relayUrl = 'wss://relay.walletconnect.com'
  const modalOptions: Omit<WalletConnectModalConfig, 'projectId' | 'walletConnectVersion'> = {
    themeMode: 'light',
    explorerRecommendedWalletIds: 'NONE',
    explorerExcludedWalletIds: 'ALL',
    enableExplorer: false,
  }
  const clientOptions: WalletConnectModalSignOptions = {
    projectId,
    metadata,
    relayUrl,
    modalOptions,
  }

  // WalletConnect will not work on LocalNet
  enum algorand_chains {
    MainNet = 'algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k',
    TestNet = 'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe',
    BetaNet = 'algorand:mFgazF-2uRS1tMiL9dsj01hJGySEmPN2',
    LocalNet = '',
  }

  // Connecting to all three chains and filtering duplicate accounts returned
  const chains = [algorand_chains.MainNet, algorand_chains.TestNet, algorand_chains.BetaNet]
  const requiredNamespaces = {
    algorand: {
      chains: chains,
      methods: ['algo_signTxn'],
      events: [],
    },
  }

  function icon() {
    return (
      <svg
        fill="black"
        viewBox="0 0 480 332"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m126.613 93.9842c62.622-61.3123 164.152-61.3123 226.775 0l7.536 7.3788c3.131 3.066 3.131 8.036 0 11.102l-25.781 25.242c-1.566 1.533-4.104 1.533-5.67 0l-10.371-10.154c-43.687-42.7734-114.517-42.7734-158.204 0l-11.107 10.874c-1.565 1.533-4.103 1.533-5.669 0l-25.781-25.242c-3.132-3.066-3.132-8.036 0-11.102zm280.093 52.2038 22.946 22.465c3.131 3.066 3.131 8.036 0 11.102l-103.463 101.301c-3.131 3.065-8.208 3.065-11.339 0l-73.432-71.896c-.783-.767-2.052-.767-2.835 0l-73.43 71.896c-3.131 3.065-8.208 3.065-11.339 0l-103.4657-101.302c-3.1311-3.066-3.1311-8.036 0-11.102l22.9456-22.466c3.1311-3.065 8.2077-3.065 11.3388 0l73.4333 71.897c.782.767 2.051.767 2.834 0l73.429-71.897c3.131-3.065 8.208-3.065 11.339 0l73.433 71.897c.783.767 2.052.767 2.835 0l73.431-71.895c3.132-3.066 8.208-3.066 11.339 0z" />
      </svg>
    )
  }

  function image() {
    return (
      <svg
        height="32"
        viewBox="0 0 203 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#a)">
          <path d="M12.209 9.059c6.038-5.91 15.829-5.91 21.867 0l.727.711a.745.745 0 0 1 0 1.07l-2.486 2.433a.393.393 0 0 1-.547 0l-1-.979c-4.212-4.122-11.042-4.122-15.255 0l-1.071 1.048a.393.393 0 0 1-.547 0l-2.486-2.433a.745.745 0 0 1 0-1.07l.798-.78Zm27.009 5.031 2.212 2.166a.745.745 0 0 1 0 1.07l-9.976 9.764a.785.785 0 0 1-1.094 0l-7.08-6.93a.196.196 0 0 0-.274 0l-7.08 6.93a.785.785 0 0 1-1.094 0l-9.977-9.764a.745.745 0 0 1 0-1.07l2.213-2.166a.785.785 0 0 1 1.093 0l7.08 6.93a.196.196 0 0 0 .274 0l7.08-6.93a.785.785 0 0 1 1.094 0l7.081 6.93a.196.196 0 0 0 .274 0l7.08-6.93a.785.785 0 0 1 1.094 0ZM54.963 23.94l2.673-10.69c.158-.59.294-1.224.475-2.22.136.996.295 1.63.408 2.22l2.31 10.69h4.78L69.64 8.085h-3.67l-2.219 9.74a28.38 28.38 0 0 0-.52 2.808c-.182-1.064-.363-1.857-.567-2.786l-2.152-9.762H55.71l-2.333 9.762a47.123 47.123 0 0 0-.543 2.786 47.042 47.042 0 0 0-.544-2.786l-2.174-9.762h-3.828l4.009 15.855h4.666ZM72.376 24.348c1.812 0 2.967-.748 3.556-1.835-.068.34-.09.68-.09 1.02v.407h3.035v-6.546c0-3.125-1.427-4.937-4.915-4.937-3.013 0-4.983 1.676-5.164 3.986h3.33c.112-1.02.837-1.63 1.947-1.63 1.042 0 1.608.588 1.608 1.268 0 .498-.294.792-1.178.905l-1.585.182c-2.356.294-4.371 1.155-4.371 3.646 0 2.265 1.88 3.534 3.827 3.534Zm1.02-2.333c-.884 0-1.54-.498-1.54-1.36 0-.837.747-1.245 1.88-1.449l.77-.136c.656-.136 1.019-.249 1.245-.453v1.042c0 1.405-1.02 2.356-2.356 2.356ZM80.455 8.085V23.94h3.284V8.085h-3.284ZM85.639 8.085V23.94h3.284V8.085h-3.284ZM96.092 24.348c3.126 0 5.141-1.767 5.368-4.077h-3.307c-.159 1.019-1.02 1.585-2.061 1.585-1.404 0-2.424-1.132-2.446-2.695h7.882v-.634c0-3.67-2.016-6.07-5.504-6.07-3.352 0-5.708 2.355-5.708 5.911 0 3.85 2.424 5.98 5.776 5.98Zm-2.47-7.339c.137-1.268 1.066-2.197 2.38-2.197 1.268 0 2.15.883 2.174 2.197h-4.553ZM108.479 24.166c.725 0 1.427-.113 1.744-.203V21.47a4.678 4.678 0 0 1-.793.068c-1.2 0-1.63-.68-1.63-1.79v-4.348h2.672v-2.56H107.8v-3.94h-3.262v3.94h-2.401v2.56h2.401v4.802c0 2.627 1.314 3.963 3.941 3.963ZM119.565 24.348c4.485 0 7.203-2.628 7.543-6.41h-3.556c-.272 2.06-1.722 3.465-3.851 3.465-2.514 0-4.281-2.038-4.281-5.481 0-3.375 1.835-5.3 4.349-5.3 2.152 0 3.375 1.314 3.624 3.239h3.647c-.363-3.941-3.262-6.184-7.248-6.184-4.553 0-8.041 3.08-8.041 8.245 0 5.345 3.058 8.426 7.814 8.426ZM134.228 24.348c3.42 0 5.844-2.152 5.844-5.912 0-3.692-2.424-5.98-5.844-5.98-3.398 0-5.821 2.288-5.821 5.98 0 3.76 2.401 5.912 5.821 5.912Zm0-2.537c-1.518 0-2.492-1.246-2.492-3.375 0-2.174 1.02-3.397 2.492-3.397 1.495 0 2.514 1.223 2.514 3.397 0 2.13-.997 3.375-2.514 3.375ZM144.65 23.94v-6.5c0-1.382.861-2.401 2.084-2.401 1.155 0 1.835.883 1.835 2.355v6.546h3.284v-7.021c0-2.673-1.404-4.463-3.919-4.463-1.744 0-2.808.838-3.374 1.835a6.11 6.11 0 0 0 .09-1.02v-.43h-3.284V23.94h3.284ZM157.102 23.94v-6.5c0-1.382.86-2.401 2.083-2.401 1.156 0 1.835.883 1.835 2.355v6.546h3.284v-7.021c0-2.673-1.404-4.463-3.918-4.463-1.744 0-2.809.838-3.375 1.835.068-.408.091-.725.091-1.02v-.43h-3.285V23.94h3.285ZM171.371 24.348c3.125 0 5.141-1.767 5.368-4.077h-3.307c-.159 1.019-1.019 1.585-2.061 1.585-1.405 0-2.424-1.132-2.446-2.695h7.882v-.634c0-3.67-2.016-6.07-5.504-6.07-3.352 0-5.708 2.355-5.708 5.911 0 3.85 2.424 5.98 5.776 5.98Zm-2.469-7.339c.136-1.268 1.064-2.197 2.378-2.197 1.268 0 2.152.883 2.174 2.197h-4.552ZM183.859 24.348c3.443 0 5.323-1.88 5.685-4.802h-3.284c-.114 1.223-.816 2.265-2.288 2.265-1.495 0-2.514-1.382-2.514-3.42 0-2.22 1.178-3.352 2.582-3.352 1.382 0 2.061.996 2.152 2.151h3.284c-.249-2.695-2.084-4.734-5.459-4.734-3.284 0-5.889 2.175-5.889 5.935 0 3.714 2.197 5.957 5.731 5.957ZM196.648 24.166c.725 0 1.427-.113 1.744-.203V21.47a4.687 4.687 0 0 1-.793.068c-1.2 0-1.631-.68-1.631-1.79v-4.348h2.673v-2.56h-2.673v-3.94h-3.261v3.94h-2.401v2.56h2.401v4.802c0 2.627 1.313 3.963 3.941 3.963Z" />
        </g>
        <defs>
          <clipPath id="a">
            <path d="M0 0h202.602v32H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  }

  async function getClient(onDisconnect: () => void): Promise<WalletConnectModalSign> {
    const client = walletClient()
    if (client) {
      return client
    } else {
      const WalletConnectModalSign = (await import('@walletconnect/modal-sign-html'))
        .WalletConnectModalSign
      const client = new WalletConnectModalSign(clientOptions)
      client.onSessionEvent(e => console.debug('Session event:', e))
      client.onSessionUpdate(e => console.debug('Session update:', e))
      client.onSessionDelete(e => {
        console.debug('Session delete:', e)
        onDisconnect()
      })
      client.onSessionExpire(e => console.debug('Session expire:', e))
      return client
    }
  }

  async function connect(onDisconnect: () => void): Promise<WalletAccount[]> {
    console.debug('WalletConnect: connect')
    const client = await getClient(onDisconnect)
    const session: WalletConnectModalSignSession = await client.connect({
      requiredNamespaces,
    })
    console.debug('Session: ', session)
    const { accounts } = session.namespaces.algorand!
    console.debug('Accounts: ', accounts)
    if (accounts.length === 0) {
      throw new Error(`No accounts found`)
    }
    // WC returns each account once per network; reduce to unique accts only
    const walletAccounts = accounts.reduce<WalletAccount[]>(
      (acc: WalletAccount[], account: string, idx: number) => {
        const walletAccount = {
          address: account.split(':').pop() as string,
          name: `WalletConnect ${idx}`,
        }
        if (acc.find((wa: WalletAccount) => wa.address === walletAccount.address) === undefined) {
          acc.push(walletAccount)
        }
        return acc
      },
      [],
    )
    setWalletClient(client)
    setAccounts(walletAccounts)
    console.debug('Wallet accounts: ', walletAccounts)
    return walletAccounts
  }

  async function reconnect(onDisconnect: () => void) {
    console.debug('WalletConnectV2: reconnect')
    const client = await getClient(onDisconnect)
    const session = await client.getSession()
    console.debug('Session: ', session)
    if (session) {
      const { accounts } = session.namespaces.algorand
      if (accounts.length === 0) {
        throw new Error(`No accounts found`)
      }
      const walletAccounts: WalletAccount[] = accounts.map((account: string, index: number) => ({
        address: account.split(':').pop() as string,
        name: `WalletConnect ${index}`,
      }))
      setWalletClient(client)
      setAccounts(walletAccounts)
      console.debug('Wallet accounts: ', walletAccounts)
      return walletAccounts
    } else {
      console.debug('Connect to get new session')
      return connect(onDisconnect)
    }
  }

  async function disconnect(onDisconnect: () => void) {
    console.debug('Disconnecting WalletConnectV2')
    const client = walletClient()
    if (client) {
      const session = await client.getSession()
      console.debug('Session to disconnect: ', session)
      if (session) {
        try {
          client.disconnect({
            topic: session.topic,
            reason: {
              message: 'User disconnected',
              code: 6000,
            },
          })
          console.debug('Disconnected WalletConnect session')
        } catch (e) {
          console.error('Error disconnecting session:', e)
        }
      }
    }
    console.debug('WalletConnect disconnected')
    setWalletClient(undefined)
    setAccounts([])
    onDisconnect()
  }

  async function transactionSigner(
    txnGroup: Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> {
    console.debug('WalletConnectV2 transactionSigner')
    const client = walletClient()
    if (client) {
      const session = await client.getSession()
      console.debug('Session: ', session)
      if (session) {
        const txnsToSign = txnGroup.reduce<WalletConnectTransaction[]>((acc, txn, idx) => {
          if (indexesToSign.includes(idx)) {
            const walletTxn: WalletConnectTransaction = {
              txn: Buffer.from(txn.toByte()).toString('base64'),
            }
            acc.push(walletTxn)
          }
          return acc
        }, [])
        console.debug('txnsToSign: ', txnsToSign)

        const request = formatJsonRpcRequest('algo_signTxn', [txnsToSign])

        // Sign the txns with the wallet
        const signingResult = await client.request<Array<string | null>>({
          chainId: algorand_chains[activeNetwork()],
          topic: session.topic,
          request,
        })
        console.debug('Signing result: ', signingResult)

        const signedTxnGroup = txnGroup.reduce<Uint8Array[]>((acc, txn, idx) => {
          if (indexesToSign.includes(idx)) {
            const nextSignedTxn = signingResult.shift()
            if (nextSignedTxn) {
              acc.push(new Uint8Array(Buffer.from(nextSignedTxn, 'base64')))
            } else {
              throw new Error('Error reconstructing signedTxns array')
            }
          } else {
            acc.push(txn.toByte())
          }
          return acc
        }, [])
        return signedTxnGroup
      } else {
        throw new Error('Wallet client session not found')
      }
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

export default createRoot(useWalletConnectOld)
