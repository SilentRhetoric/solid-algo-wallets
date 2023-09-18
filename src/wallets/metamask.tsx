/*
 * Documentation:
 * https://github.com/algorandfoundation/algo-metamask/tree/main
 */
import { Transaction } from 'algosdk'
import { WalletAccount, WalletInterface } from '../types'
import { createRoot, createSignal } from 'solid-js'

type ConnectResult = {
  'npm:@algorandfoundation/algorand-metamask-snap': {
    blocked: boolean
    enabled: boolean
    id: string
    initialPermissions: {
      'endowment:ethereum-provider': {}
      'endowment:network-access': {}
      'endowment:rpc': {
        dapps: boolean
        snaps: false
      }
      snap_dialog: {}
      snap_getBig44Entropy: [{ coinType: number }]
      snap_manageState: {}
      snap_notify: {}
    }
    version: string
  }
}

interface Request {
  method: string
  params: {
    'npm:@algorandfoundation/algorand-metamask-snap'?: {}
    snapId?: string
    request?: {
      method?: string
      params?: { testnet?: boolean; [key: string]: any }
    }
  }
}

type SignTxnsResult = (string | null)[]

type MetaMask = {
  request: (req: Request) => Promise<any>
  signTxns(transactions: WalletTransaction[]): Promise<SignTxnsResult>
}

type WindowExtended = { ethereum: MetaMask } & Window & typeof globalThis

type MetaMaskAccount = {
  addr: string
  name: string
  path: number
  swaps: []
  type: string
}

type AccountsResponse = {
  [key: string]: MetaMaskAccount
}

// https://arc.algorand.foundation/ARCs/arc-0001
type AlgorandAddress = string
type SignedTxnStr = string
interface WalletTransaction {
  /**
   * Base64 encoding of the canonical msgpack encoding of a Transaction.
   */
  txn: string
  /**
   * Optional authorized address used to sign the transaction when the account
   * is rekeyed. Also called the signor/sgnr.
   */
  authAddr?: AlgorandAddress
  /**
   * Optional list of addresses that must sign the transactions
   */
  signers?: AlgorandAddress[]
  /**
   * Optional base64 encoding of the canonical msgpack encoding of a
   * SignedTxn corresponding to txn, when signers=[]
   */
  stxn?: SignedTxnStr
  /**
   * Optional message explaining the reason of the transaction
   */
  message?: string
  /**
   * Optional message explaining the reason of this group of transaction
   * Field only allowed in the first transaction of a group
   */
  groupMessage?: string
}

function useMetaMask(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<MetaMask>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])

  const name = 'MetaMask'

  function icon() {
    return <p>MetaMask</p>
  }

  function image() {
    return <p>MetaMask</p>
  }

  async function getClient(): Promise<MetaMask> {
    const client = walletClient()
    if (client !== undefined) {
      return client
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (typeof window == 'undefined' || (window as WindowExtended).ethereum === undefined) {
        throw new Error('MetaMask is not available')
      }
      const client = (window as WindowExtended).ethereum
      setWalletClient(client)
      return client
    }
  }

  async function connect(): Promise<WalletAccount[]> {
    console.debug('MetaMask: connect')
    const client = await getClient()
    const response = await client.request({
      method: 'wallet_requestSnaps',
      params: {
        'npm:@algorandfoundation/algorand-metamask-snap': {},
      },
    })
    console.debug('MetaMask response: ', response)
    if (response['npm:@algorandfoundation/algorand-metamask-snap'].enabled !== true) {
      throw new Error('MetaMask is not enabled')
    }
    const accts: AccountsResponse = await client.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
        request: {
          method: 'getAccounts',
          params: {
            testnet: true,
          },
        },
      },
    })
    const walletAccounts: WalletAccount[] = Object.values(accts).map(acct => ({
      address: acct.addr,
      name: acct.name,
    }))
    setAccounts(walletAccounts)
    console.debug(walletAccounts)
    return walletAccounts
  }

  async function reconnect() {
    console.debug('MetaMask: reconnect')
    return await connect()
  }

  function disconnect() {
    setWalletClient(undefined)
    setAccounts([])
  }

  async function transactionSigner(
    txnGroup: Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> {
    console.debug('txnGroup: ', txnGroup)
    console.debug('indexesToSign: ', indexesToSign)
    const client = walletClient()
    if (client) {
      // Marshal the transactions
      const txnsToSign = txnGroup.reduce<WalletTransaction[]>((acc, txn, idx) => {
        if (indexesToSign.includes(idx)) {
          const walletTxn: WalletTransaction = {
            txn: Buffer.from(txn.toByte()).toString('base64'),
          }
          acc.push(walletTxn)
        }
        return acc
      }, [])
      console.debug('txnsToSign: ', txnsToSign)

      // Sign the txns with MetaMask
      const signingResult = await client.request({
              method: 'wallet_invokeSnap',
              params: {
                snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
                request: {
                  method: 'signTxns',
                  params: {
                    txns: txnsToSign,
                    testnet: true,
                  },
                },
              },
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

export default createRoot(useMetaMask)
