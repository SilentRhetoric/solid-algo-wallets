/*
 * Documentation:
 * https://docs.exodus.com/api-reference/algorand-provider-arc-api
 */
import { Transaction } from 'algosdk'
import { WalletAccount, WalletInterface } from '../types'
import { createRoot, createSignal } from 'solid-js'

type WindowExtended = { algorand: Exodus } & Window & typeof globalThis

interface EnableNetworkOpts {
  genesisID?: string
  genesisHash?: string
}

interface EnableAccountsOpts {
  accounts?: string[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EnableOpts = EnableNetworkOpts & EnableAccountsOpts

interface EnableNetworkResult {
  genesisID: string
  genesisHash: string
}

interface EnableAccountsResult {
  accounts: string[]
}

type EnableResult = EnableNetworkResult & EnableAccountsResult

interface WalletTransaction {
  // Base64 encoding of the canonical msgpack encoding of a Transaction.
  txn: string
  // Optional authorized address used to sign the transaction when the account
  // is rekeyed. Also called the signor/sgnr.
  authAddr?: string
  // Optional list of addresses that must sign the transactions
  signers?: string[]
  // Optional base64 encoding of the canonical msgpack encoding of a
  // SignedTxn corresponding to txn, when signers=[]
  stxn?: string
}

// https://docs.exodus.com/api-reference/algorand-provider-arc-api#algorandsigntxns
type SignTxnsResult = (string | null)[]

type Exodus = {
  isConnected: boolean
  address: string | null
  enable: () => Promise<EnableResult>
  signTxns(transactions: WalletTransaction[]): Promise<SignTxnsResult>
}

function useExodus(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<Exodus>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])

  const name = 'Exodus'

  function icon() {
    return (
      <svg
        width="100%"
        height="32"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M298.203 83.7645L170.449 0V46.8332L252.405 100.089L242.763 130.598H170.449V169.402H242.763L252.405 199.911L170.449 253.167V300L298.203 216.503L277.313 150.134L298.203 83.7645Z"
          fill="url(#paint0_linear_1661_295)"
        />
        <path
          d="M59.3007 169.402H131.346V130.598H59.0329L49.6589 100.089L131.346 46.8332V0L3.59253 83.7645L24.4831 150.134L3.59253 216.503L131.614 300V253.167L49.6589 199.911L59.3007 169.402Z"
          fill="url(#paint1_linear_1661_295)"
        />
        <mask
          id="mask0_1661_295"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="3"
          y="0"
          width="296"
          height="300"
        >
          <path
            d="M298.204 83.7645L170.45 0V46.8332L252.405 100.089L242.763 130.598H170.45V169.402H242.763L252.405 199.911L170.45 253.167V300L298.204 216.503L277.313 150.134L298.204 83.7645Z"
            fill="url(#paint2_linear_1661_295)"
          />
          <path
            d="M59.301 169.402H131.347V130.598H59.0332L49.6592 100.089L131.347 46.8332V0L3.59277 83.7645L24.4834 150.134L3.59277 216.503L131.615 300V253.167L49.6592 199.911L59.301 169.402Z"
            fill="url(#paint3_linear_1661_295)"
          />
        </mask>
        <g mask="url(#mask0_1661_295)">
          <rect
            x="3.75024"
            width="292.5"
            height="300"
            fill="url(#paint4_linear_1661_295)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1661_295"
            x1="256.875"
            y1="320.625"
            x2="171.3"
            y2="-32.9459"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1661_295"
            x1="256.875"
            y1="320.625"
            x2="171.3"
            y2="-32.9459"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1661_295"
            x1="256.875"
            y1="320.625"
            x2="171.3"
            y2="-32.9459"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint3_linear_1661_295"
            x1="256.875"
            y1="320.625"
            x2="171.3"
            y2="-32.9459"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint4_linear_1661_295"
            x1="22.5002"
            y1="67.5"
            x2="170.625"
            y2="178.125"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0.119792"
              stop-color="#8952FF"
              stop-opacity="0.87"
            />
            <stop
              offset="1"
              stop-color="#DABDFF"
              stop-opacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  function image() {
    return (
      <svg
        width="100%"
        height="32"
        viewBox="0 0 1000 206"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M204.107 57.3331L116.665 0V32.0552L172.76 68.5066L166.161 89.3883H116.665V115.948H166.161L172.76 136.83L116.665 173.281V205.337L204.107 148.187L189.808 102.76L204.107 57.3331Z"
          fill="url(#paint0_linear_1661_261)"
        />
        <path
          d="M40.5888 115.948H89.9009V89.3883H40.4055L33.9894 68.5066L89.9009 32.0552V0L2.45898 57.3331L16.7577 102.76L2.45898 148.187L90.0842 205.337V173.281L33.9894 136.83L40.5888 115.948Z"
          fill="url(#paint1_linear_1661_261)"
        />
        <mask
          id="mask0_1661_261"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="0"
          width="203"
          height="206"
        >
          <path
            d="M204.107 57.3331L116.665 0V32.0552L172.76 68.5066L166.161 89.3883H116.665V115.948H166.161L172.76 136.83L116.665 173.281V205.337L204.107 148.187L189.809 102.76L204.107 57.3331Z"
            fill="url(#paint2_linear_1661_261)"
          />
          <path
            d="M40.589 115.948H89.9012V89.3883H40.4057L33.9897 68.5066L89.9012 32.0552V0L2.45923 57.3331L16.7579 102.76L2.45923 148.187L90.0845 205.337V173.281L33.9897 136.83L40.589 115.948Z"
            fill="url(#paint3_linear_1661_261)"
          />
        </mask>
        <g mask="url(#mask0_1661_261)">
          <rect
            x="2.56689"
            width="200.203"
            height="205.337"
            fill="url(#paint4_linear_1661_261)"
          />
        </g>
        <path
          d="M378.076 56.4673V74.4188H295.347V92.7878H365.639V110.739H295.347V130.917H378.076V148.869H274.124V56.4673H378.076Z"
          fill="#1F2033"
        />
        <path
          d="M389.809 148.869L437.339 102.111L391.156 56.4673H420.374L452.959 89.4479L484.197 56.4673H511.53L465.481 102.111L513.011 148.869H483.523L452.959 114.914L418.085 148.869H389.809V148.869Z"
          fill="#1F2033"
        />
        <path
          d="M570.006 56.4673C608.515 56.4673 631.673 75.7511 631.673 102.668C631.673 129.585 608.515 148.869 570.006 148.869C531.497 148.869 508.471 129.585 508.471 102.668C508.471 75.7511 531.497 56.4673 570.006 56.4673ZM570.006 73.7423C546.848 73.7423 529.777 85.393 529.777 102.668C529.777 119.943 546.848 131.594 570.006 131.594C593.297 131.594 610.368 119.943 610.368 102.668C610.368 85.393 593.297 73.7423 570.006 73.7423Z"
          fill="#1F2033"
        />
        <path
          d="M708.434 56.4673C739.276 56.4673 757.862 73.5838 757.862 102.529C757.862 131.752 739.411 148.869 708.703 148.869H646.211V56.4673H708.434ZM736.044 102.529C736.044 84.4382 725.269 74.4188 705.74 74.4188H667.356V130.917H705.74C725.269 130.917 736.044 120.759 736.044 102.529Z"
          fill="#1F2033"
        />
        <path
          d="M827.799 148.869C795.32 148.869 770.69 134.128 770.69 106.967V56.4673H791.937V104.92C791.937 121.708 809.394 129.488 827.799 129.488C846.339 129.488 863.797 121.844 863.797 104.92V56.4673H884.908V106.967C884.908 134.128 860.414 148.869 827.799 148.869Z"
          fill="#1F2033"
        />
        <path
          d="M944.383 148.869C926.935 148.869 908.124 145.655 894.765 139.629L901.717 122.487C913.713 127.978 930.207 131.46 945.065 131.46C962.104 131.46 978.053 127.844 978.053 121.416C978.053 116.729 973.01 114.72 962.513 113.113L932.797 109.899C909.896 106.819 898.718 98.9184 898.718 84.9912C898.718 67.0466 917.666 56.4673 945.474 56.4673C962.241 56.4673 985.278 59.5473 997.137 64.9039L990.185 81.2416C978.462 76.4206 958.56 74.0102 944.52 74.0102C930.07 74.0102 920.528 77.3581 920.528 83.5182C920.528 87.8034 925.299 89.9461 937.568 91.687L966.466 94.9009C988.549 97.981 1000 105.48 1000 120.077C1000 138.557 975.736 148.869 944.383 148.869Z"
          fill="#1F2033"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1661_261"
            x1="175.82"
            y1="219.454"
            x2="117.247"
            y2="-22.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1661_261"
            x1="175.82"
            y1="219.454"
            x2="117.247"
            y2="-22.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1661_261"
            x1="175.82"
            y1="219.454"
            x2="117.247"
            y2="-22.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint3_linear_1661_261"
            x1="175.82"
            y1="219.454"
            x2="117.247"
            y2="-22.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0B46F9" />
            <stop
              offset="1"
              stop-color="#BBFBE0"
            />
          </linearGradient>
          <linearGradient
            id="paint4_linear_1661_261"
            x1="15.4004"
            y1="46.2008"
            x2="116.785"
            y2="121.919"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0.119792"
              stop-color="#8952FF"
              stop-opacity="0.87"
            />
            <stop
              offset="1"
              stop-color="#DABDFF"
              stop-opacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  async function getClient(): Promise<Exodus> {
    const client = walletClient()
    if (client !== undefined) {
      return client
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (typeof window == 'undefined' || (window as WindowExtended).algorand === undefined) {
        throw new Error('Exodus is not available')
      }
      const client = (window as WindowExtended).algorand
      setWalletClient(client)
      return client
    }
  }

  async function connect(): Promise<WalletAccount[]> {
    console.debug('Exodus: connect')
    const client = await getClient()
    const resp = await client.enable()
    const accounts = resp.accounts
    if (accounts.length === 0) {
      throw new Error(`No accounts found`)
    }
    const walletAccounts: WalletAccount[] = accounts.map((account, index) => ({
      address: account,
      name: `Exodus ${index}`,
    }))
    setAccounts(walletAccounts)
    console.debug(walletAccounts)
    return walletAccounts
  }

  async function reconnect() {
    console.debug('Exodus: reconnect')
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

      // Sign the txns with Exodus
      const signingResult = await client.signTxns(txnsToSign)
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

export default createRoot(useExodus)
