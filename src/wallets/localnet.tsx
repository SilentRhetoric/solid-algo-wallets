import { createRoot, createSignal } from 'solid-js'
import { WalletAccount, WalletInterface } from '../types'
import algosdk, { Transaction, encodeAddress } from 'algosdk'
import useNetwork from '../useNetwork'

// Borrowed from https://github.com/algorand-devrel/beaker-ts/blob/master/src/sandbox/accounts.ts
const kmd_token = 'a'.repeat(64)
const kmd_host = 'http://localhost'
const kmd_port = '4002'
const kmd_wallet = 'unencrypted-default-wallet'
const kmd_password = ''

export type SandboxAccount = {
  addr: string
  privateKey: Buffer
  signer: algosdk.TransactionSigner
}

export type KMDConfig = {
  host: string
  port: string
  token: string
  wallet: string
  password: string
}

export const DefaultKMDConfig = {
  host: kmd_host,
  token: kmd_token,
  port: kmd_port,
  wallet: kmd_wallet,
  password: kmd_password,
} as KMDConfig

export async function getSandboxAccounts(
  config: KMDConfig = DefaultKMDConfig,
): Promise<SandboxAccount[]> {
  const kmdClient = new algosdk.Kmd(config.token, config.host, config.port)

  const wallets = await kmdClient.listWallets()

  let walletId
  for (const wallet of wallets['wallets']) {
    if (wallet['name'] === config.wallet) walletId = wallet['id']
  }

  if (walletId === undefined) throw Error('No wallet named: ' + config.wallet)

  const handleResp = await kmdClient.initWalletHandle(walletId, config.password)
  const handle = handleResp['wallet_handle_token']

  const addresses = await kmdClient.listKeys(handle)
  const acctPromises: Promise<{ private_key: Buffer }>[] = []
  for (const addr of addresses['addresses']) {
    acctPromises.push(kmdClient.exportKey(handle, config.password, addr))
  }
  const keys = await Promise.all(acctPromises)

  // Don't need to wait for it
  kmdClient.releaseWalletHandle(handle)

  return keys.map(k => {
    const addr = algosdk.encodeAddress(k.private_key.subarray(32))
    const acct = { sk: k.private_key, addr: addr } as algosdk.Account
    const signer = algosdk.makeBasicAccountTransactionSigner(acct)
    return {
      addr: acct.addr,
      privateKey: acct.sk,
      signer: signer,
    } as SandboxAccount
  })
}

function useLocalnet(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  const [sandboxAccounts, setSandboxAccounts] = createSignal<SandboxAccount[]>([])
  const { setActiveNetwork } = useNetwork

  const name = 'LocalNet KMD'

  function icon() {
    return <p>AlgoKit LocalNet</p>
  }
  const image = <p>AlgoKit LocalNet</p>

  async function connect(): Promise<WalletAccount[]> {
    console.debug('Localnet: connect')

    // Automatically switch the network to LocalNet when using this wallet
    setActiveNetwork('LocalNet')

    if (walletClient() == undefined) {
      setWalletClient('LocalNet')
    }
    const sandboxAccts = await getSandboxAccounts()
    // console.debug("Sandbox accounts: ", accounts)

    if (sandboxAccts.length === 0) {
      throw new Error('No accounts found')
    }

    setSandboxAccounts(sandboxAccts)

    const walletAccounts: WalletAccount[] = sandboxAccts.map((account, idx) => ({
      address: account.addr,
      name: `Localnet Account ${idx}`,
    }))
    console.debug(walletAccounts)
    setAccounts(walletAccounts)
    return walletAccounts
  }

  async function reconnect() {
    console.debug('Localnet: reconnect')
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
    const sandboxAccts = sandboxAccounts()
    if (client) {
      // Get the unsigned transactions
      const txnsToSign = txnGroup.reduce<Transaction[]>((acc, txn, idx) => {
        if (indexesToSign.includes(idx)) {
          console.debug(`txn #${idx}: `, txn)
          acc.push(txn)
        }
        return acc
      }, [])
      console.debug('txnsToSign: ', txnsToSign)

      // Sign them with the client
      const signingResult = await Promise.all(
        txnsToSign.map(async txn => {
          console.debug('Txn addr: ', encodeAddress(txn.from.publicKey))
          console.debug('Sandbox accts: ', sandboxAccts)
          const sandboxAcct = sandboxAccts.find(acct => {
            console.debug('Find acct.addr: ', acct.addr)
            console.debug('Find encoded txn.from.publicKey: ', encodeAddress(txn.from.publicKey))
            return acct.addr === encodeAddress(txn.from.publicKey)
          })
          console.debug('Sandbox acct: ', sandboxAcct)
          if (sandboxAcct !== undefined) {
            const [signedTxn] = await sandboxAcct.signer([txn], [0])
            return signedTxn
          } else {
            throw new Error('Corresponding Sandbox account not found')
          }
        }),
      )
      console.debug('Signing result: ', signingResult)

      // Join the newly signed transactions with the original group of transactions
      const signedTxns = txnGroup.reduce<Uint8Array[]>((acc, txn, idx) => {
        if (indexesToSign.includes(idx)) {
          const nextSignedTxn = signingResult.shift()
          if (nextSignedTxn) {
            acc.push(nextSignedTxn)
          } else {
            throw new Error('Error reconstructing signedTxns array')
          }
        } else {
          acc.push(txn.toByte())
        }
        return acc
      }, [])
      return signedTxns
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

export default createRoot(useLocalnet)
