import { For, type Component, Show, createMemo, onMount } from 'solid-js'
import logo from './assets/logo.svg'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import * as algokit from '@algorandfoundation/algokit-utils'
import { AtomicTransactionComposer, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { useWallet, useNetwork, NetworkName } from 'solid-algo-wallets'

export function ellipseAddress(address = '', width = 4): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`
}

const App: Component = () => {
  const {
    activeWallet,
    walletName,
    address,
    connectWallet,
    reconnectWallet,
    disconnectWallet,
    walletInterfaces,
    transactionSigner,
  } = useWallet
  const { algodClient, activeNetwork, setActiveNetwork, networkNames } = useNetwork

  onMount(() => reconnectWallet())

  const transactionSignerAccount = createMemo<TransactionSignerAccount>(() => ({
    addr: address(),
    signer: transactionSigner,
  }))

  async function sendTestTxn() {
    const suggestedParams = await algodClient().getTransactionParams().do()

    const payTxn = makePaymentTxnWithSuggestedParamsFromObject({
      from: address(),
      to: address(),
      amount: 0,
      suggestedParams,
    })
    const txn = await algokit.getTransactionWithSigner(payTxn, transactionSignerAccount())

    const atc = new AtomicTransactionComposer()
    atc.addTransaction(txn)
    const result = await atc.execute(algodClient(), 4)
    console.log('Txn confirmed: ', result.txIDs)
  }

  return (
    <div class="flex flex-col justify-center items-center text-center p-4">
      <img src={logo} class="logo" alt="logo" />
      <h1 class="text-3xl font-bold">Solid Algo Wallets</h1>
      <h2 class="text-2xl">Example App</h2>
      <select
        class="select select-secondary max-w-xs m-1 w-60"
        onChange={e => setActiveNetwork(e.target.value as NetworkName)}
        value={activeNetwork()}
      >
        <option disabled selected>
          Select Network
        </option>
        <For each={networkNames}>{network => <option value={network}>{network}</option>}</For>
      </select>
      <Show
        when={activeWallet() === undefined}
        fallback={
          <>
            <p class="text-lg">Wallet Name: {walletName()}</p>
            <p class="text-lg">Connected Address: {ellipseAddress(address())}</p>
            <button
              class="btn btn-accent m-1 w-60"
              onClick={() => sendTestTxn()}
              disabled={activeWallet() === undefined}
            >
              Send 0A Transaction
            </button>
            <button
              class="btn btn-accent m-1 w-60"
              onClick={() => disconnectWallet()}
              disabled={activeWallet() === undefined}
            >
              Disconnect Wallet
            </button>
          </>
        }
      >
        <For each={Object.values(walletInterfaces)}>
          {wallet => (
            <button class="btn btn-secondary m-1 w-60" onClick={() => connectWallet(wallet)}>
              {wallet.image}
            </button>
          )}
        </For>
      </Show>
    </div>
  )
}

export default App
