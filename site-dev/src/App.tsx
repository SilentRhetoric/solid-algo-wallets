import { For, type Component, Show, createMemo, onMount, createSignal } from 'solid-js'
import solidLogo from './assets/logo.svg'
import githubLogo from './assets/github-mark.svg'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import * as algokit from '@algorandfoundation/algokit-utils'
import { AtomicTransactionComposer, makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'
// Changed the exports to PascalCase to address Vite dev HMR issue
import { UseSolidAlgoWallets, UseNetwork, NetworkName } from '../../src/index'

export function ellipseString(string = '', width = 4): string {
  return `${string.slice(0, width)}...${string.slice(-width)}`
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
  } = UseSolidAlgoWallets
  const { algodClient, activeNetwork, setActiveNetwork, networkNames, getTxUrl } = UseNetwork
  const [confirmedTxn, setConfirmedTxn] = createSignal('')

  onMount(() => reconnectWallet())

  const transactionSignerAccount = createMemo<TransactionSignerAccount>(() => ({
    addr: address(),
    signer: transactionSigner,
  }))

  async function sendTestTxn() {
    setConfirmedTxn('')
    const suggestedParams = await algodClient().getTransactionParams().do()

    const payTxn = makePaymentTxnWithSuggestedParamsFromObject({
      from: address(),
      to: address(),
      amount: 1,
      suggestedParams,
    })
    const txn = await algokit.getTransactionWithSigner(payTxn, transactionSignerAccount())

    const atc = new AtomicTransactionComposer()
    atc.addTransaction(txn)
    const result = await atc.execute(algodClient(), 4)
    console.log('Txn confirmed: ', result)
    if (result.txIDs[0] !== undefined) {
      setConfirmedTxn(result.txIDs[0])
    }
  }

  return (
    <div class="flex flex-col items-center justify-center p-4 text-center">
      {/* <button
        class="btn btn-accent m-1 w-60"
        onClick={() => connect()}
      >
        MetaMask Connect
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => displayBalance()}
      >
        MetaMask Display Balance
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => getBalance()}
      >
        MetaMask Get Balance
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => getAddress()}
      >
        MetaMask Get Address
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => transfer()}
      >
        MetaMask Transfer
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => displayMnemonic()}
      >
        MetaMask Display Mnemonic
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => getTransactions()}
      >
        MetaMask Get Transactions
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => getAssets()}
      >
        MetaMask Get Assets
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => getAccounts()}
      >
        MetaMask Get Accounts
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => getCurrentAccount()}
      >
        MetaMask Get Current Account
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => setCurrentAccount()}
      >
        MetaMask Set Current Account
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => assetOptIn()}
      >
        MetaMask Opt In
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => assetOptOut()}
      >
        MetaMask Opt Out
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => transferAsset()}
      >
        MetaMask Transfer Asset
      </button>
      <button
        class="btn btn-accent m-1 w-60"
        onClick={() => signTxns()}
      >
        MetaMask Sign Txn
      </button> */}
      <img
        src={solidLogo}
        class="logo"
        alt="SolidJS logo"
      />
      <h1 class="text-3xl font-bold">Solid Algo Wallets</h1>
      <div class="flex flex-row">
        <h2 class="inline text-2xl">Example App</h2>
        <a
          href="https://github.com/SilentRhetoric/solid-algo-wallets-example"
          target="_blank"
        >
          <img
            src={githubLogo}
            class="ml-2 h-8 w-8"
            alt="GitHub logo"
          />
        </a>
      </div>
      <select
        class="select select-accent m-1 max-w-xs"
        onChange={e => setActiveNetwork(e.target.value as NetworkName)}
        value={activeNetwork()}
      >
        <option
          disabled
          selected
        >
          Select Network
        </option>
        <For each={networkNames}>{network => <option value={network}>{network}</option>}</For>
      </select>
      <Show
        when={activeWallet() === undefined}
        fallback={
          <>
            <p>Wallet Name: {walletName()}</p>
            <p>Address: {ellipseString(address())}</p>
            <button
              class="btn btn-accent m-1 w-60"
              onClick={() => sendTestTxn()}
              disabled={activeWallet() === undefined}
              aria-label="Send transaction"
            >
              Send Transaction
            </button>

            <button
              class="btn btn-accent m-1 w-60"
              disabled={confirmedTxn().length === 0}
            >
              <a
                href={getTxUrl(confirmedTxn())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View transaction"
              >
                View Transaction{confirmedTxn() && `: ${ellipseString(confirmedTxn())}`}
              </a>
            </button>
            <button
              class="btn btn-accent m-1 w-60"
              onClick={() => disconnectWallet()}
              disabled={activeWallet() === undefined}
              aria-label="Disconnect wallet"
            >
              Disconnect Wallet
            </button>
          </>
        }
      >
        <div class="flex flex-col gap-1">
          <For each={Object.values(walletInterfaces)}>
            {wallet => (
              <div class="flex gap-1">
                <button
                  class="btn btn-accent w-20"
                  onClick={() => connectWallet(wallet)}
                >
                  {wallet.icon()}
                </button>
                <button
                  class="btn btn-accent w-60"
                  onClick={() => connectWallet(wallet)}
                >
                  {wallet.image()}
                </button>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  )
}

export default App
