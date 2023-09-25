/*
 * Documentation:
 * https://github.com/LedgerHQ/ledger-live/tree/develop/libs/ledgerjs/packages/hw-app-algorand
 */
import { Transaction, encodeAddress } from 'algosdk'
import { WalletInterface, WalletAccount } from '../types'
import Algorand from '@ledgerhq/hw-app-algorand'
import { createRoot, createSignal } from 'solid-js'

function UseLedger(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<Algorand>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])

  const name = 'Ledger'

  function icon() {
    return (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 768.91 669.35"
        style="enable-background:new 0 0 768.91 669.35;"
        fill="black"
        height="32"
      >
        <path
          d="M0,479.29v190.06h289.22V627.2H42.14V479.29H0z M726.77,479.29V627.2H479.69v42.14h289.22V479.29H726.77z M289.64,190.06
	v289.22h190.05v-38.01H331.78V190.06H289.64z M0,0v190.06h42.14V42.14h247.08V0H0z M479.69,0v42.14h247.08v147.92h42.14V0H479.69z"
        />
      </svg>
    )
  }

  function image() {
    return (
      <svg
        enable-background="new 0 0 2000.58 669.35"
        viewBox="0 0 2000.58 669.35"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m1711.35 627.2v42.14h289.22v-190.05h-42.14v147.91zm0-627.2v42.14h247.08v147.92h42.14v-190.06zm-149.15 326v-97.92h66.11c32.23 0 43.8 10.74 43.8 40.08v17.35c0 30.16-11.16 40.49-43.8 40.49zm104.94 17.35c30.16-7.85 51.23-35.95 51.23-69.41 0-21.07-8.26-40.08-23.96-55.37-19.83-19.01-46.28-28.51-80.57-28.51h-92.96v289.22h41.32v-115.27h61.98c31.81 0 44.62 13.22 44.62 46.28v69h42.14v-62.39c0-45.45-10.74-62.8-43.8-67.76zm-347.88 9.5h127.26v-38.01h-127.26v-86.77h139.65v-38.01h-181.8v289.22h188v-38.01h-145.85zm-138.42 15.29v19.83c0 41.73-15.29 55.37-53.71 55.37h-9.09c-38.43 0-57.02-12.4-57.02-69.83v-77.68c0-57.84 19.42-69.83 57.84-69.83h8.26c37.6 0 49.58 14.05 49.99 52.89h45.45c-4.13-57.02-42.14-92.96-99.16-92.96-27.68 0-50.82 8.68-68.17 25.2-26.03 24.38-40.49 65.7-40.49 123.54 0 55.78 12.4 97.1 38.01 122.71 17.35 16.94 41.32 26.03 64.87 26.03 24.79 0 47.52-9.92 59.08-31.4h5.78v27.27h38.01v-149.15h-111.97v38.01zm-364.41-140.07h45.04c42.56 0 65.7 10.74 65.7 68.59v76.02c0 57.84-23.14 68.59-65.7 68.59h-45.04zm48.75 251.22c78.92 0 108.25-59.91 108.25-144.61 0-85.94-31.4-144.61-109.08-144.61h-89.25v289.22zm-289.63-126.44h127.26v-38.01h-127.26v-86.77h139.65v-38.01h-181.8v289.22h188v-38.01h-145.85zm-243.77-162.79h-42.14v289.22h190.06v-38.01h-147.92zm-331.78 289.23v190.06h289.22v-42.15h-247.08v-147.91zm0-479.29v190.06h42.14v-147.92h247.08v-42.14z" />
      </svg>
    )
  }

  async function getClient() {
    const client = walletClient()
    if (client) {
      return client
    } else {
      const Algorand = (await import('@ledgerhq/hw-app-algorand')).default
      const TransportWebUSB = (await import('@ledgerhq/hw-transport-webusb')).default
      try {
        const transport = await TransportWebUSB.create()
        const client = new Algorand(transport)
        setWalletClient(client)
        return client
      } catch (e) {
        console.error(e)
      }
    }
  }

  async function connect(): Promise<WalletAccount[]> {
    console.debug('Ledger: connect')
    const client = await getClient()
    const numOfAccs = 3
    const walletAccounts: WalletAccount[] = []
    if (client) {
      for (let i = 0; i < numOfAccs; i++) {
        const name = `Ledger ${i}`
        const path = `44'/283'/${i}'/0/0`
        try {
          const { address } = await client.getAddress(path)
          walletAccounts.push({ address, name })
        } catch (e) {
          const confirmResp = window.confirm(
            'Your Ledger device is locked.  To connect it, unlock it first and then click OK.',
          )
          if (confirmResp) {
            const { address } = await client.getAddress(path)
            walletAccounts.push({ address, name })
          } else {
            disconnect()
            break
          }
        }
      }
    }
    setAccounts(walletAccounts)
    return walletAccounts
  }

  async function reconnect() {
    console.debug('Ledger: reconnect')
    return await connect()
  }

  function disconnect() {
    setWalletClient(undefined)
    setAccounts([])
  }

  // Per @AlgoTools, sometimes the wallet apps don't support keyreg or other txns
  // and someone needs to connect as Acct A but sign with Ledger direct Acc B, to which A is rekeyed
  // async function getAuthAccts(address) {
  //   const { accounts } = await props.indexer
  //     .searchAccounts()
  //     .authAddr(address)
  //     .do();
  //   authAccts.value = accounts.map((a) => a.address);
  // }

  async function transactionSigner(
    txnGroup: Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> {
    console.debug('txnGroup: ', txnGroup)
    console.debug('indexesToSign: ', indexesToSign)
    const client = walletClient()
    if (client) {
      const signedtxnGroup: Uint8Array[] = []
      for (const [idx, txn] of txnGroup.entries()) {
        if (indexesToSign.includes(idx)) {
          const senderAddr = encodeAddress(txn.from.publicKey)
          const pathIndex = accounts().findIndex(acc => acc.address === senderAddr)
          if (pathIndex >= 0) {
            const unsignedTxnHex = Buffer.from(txn.toByte()).toString('hex')
            const { signature } = await client.sign(`44'/283'/${pathIndex}'/0/0`, unsignedTxnHex)
            if (signature) {
              const sigBytes = new Uint8Array(signature).slice(0, 64)
              const signedTxn = txn.attachSignature(senderAddr, sigBytes)
              signedtxnGroup.push(signedTxn)
            } else throw new Error('Error signing with Ledger')
          } else throw new Error(`Ledger signing path not found for sender ${senderAddr}`)
        } else signedtxnGroup.push(txn.toByte())
      }
      return signedtxnGroup
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

export default createRoot(UseLedger)
