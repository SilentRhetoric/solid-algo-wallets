import { For, type Component, Show, createMemo, onMount } from 'solid-js'
import logo from './assets/logo.svg'
import styles from './App.module.css'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import * as algokit from '@algorandfoundation/algokit-utils'
import { AtomicTransactionComposer, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
import { useWallet, useNetwork } from 'solid-algo-wallets'

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
    <div class={styles.App}>
      <img src={logo} class={styles.logo} alt="logo" />
      <h1>Solid Algo Wallets</h1>
      <h2>Example App</h2>
      <p>Wallet Name: {walletName()}</p>
      <select
        onChange={e => setActiveNetwork(e.target.value as NetworkName)}
        value={activeNetwork()}
      >
        <For each={networkNames}>{network => <option value={network}>{network}</option>}</For>
      </select>
      <Show when={activeWallet() !== undefined}>
        <button class={styles.button} onClick={() => sendTestTxn()}>
          Send 0A Test Transaction
        </button>
        <button class={styles.button} onClick={() => disconnectWallet()}>
          Disconnect Wallet
        </button>
      </Show>
      <p>Connected Address: {address()}</p>
      <For each={Object.values(walletInterfaces)}>
        {wallet => (
          <button class={styles.button} onClick={() => connectWallet(wallet)}>
            {wallet.image}
          </button>
        )}
      </For>
    </div>
  )
}

export default App
