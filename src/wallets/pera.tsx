/*
 * Documentation:
 * https://github.com/perawallet/connect
 */
import { PeraWalletConnect } from '@perawallet/connect'
import { WalletAccount, WalletInterface } from '../types'
import type { Transaction } from 'algosdk'
import { createRoot, createSignal } from 'solid-js'
// import useNetwork from '../useNetwork'

function UsePera(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<PeraWalletConnect>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  // const { getChainId } = useNetwork

  const name = 'Pera'

  function icon() {
    return (
      <svg
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

  function image() {
    return (
      <svg
        height="32"
        viewBox="0 0 660 246"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>pera-logo-black@1x</title>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="pera-logo-black"
            transform="translate(0, -0)"
            fill-rule="nonzero"
          >
            <path
              d="M125.396286,36.4381132 C130.683286,58.3459132 128.896286,77.6163132 121.403286,79.4803132 C113.911286,81.3443132 103.550286,65.0961132 98.2632858,43.1883132 C92.9752858,21.2805132 94.7622858,2.00961322 102.255286,0.145613215 C109.748286,-1.71838678 120.108286,14.5303132 125.396286,36.4381132 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M212.709286,55.2736132 C200.999286,42.8625132 177.701286,46.2264132 160.672286,62.7872132 C143.644286,79.3483132 139.332286,102.834313 151.042286,115.245313 C162.753286,127.656313 186.050286,124.292313 203.079286,107.731313 C220.107286,91.1713132 224.419286,67.6847132 212.709286,55.2736132 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M119.572286,245.317313 C127.065286,243.453313 128.589286,223.092313 122.977286,199.839313 C117.365286,176.587313 106.741286,159.248313 99.2492858,161.112313 C91.7562858,162.976313 90.2322858,183.337313 95.8442858,206.590313 C101.456286,229.842313 112.080286,247.181313 119.572286,245.317313 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M43.1933858,66.6361132 C64.8102858,73.0103132 80.6052858,84.1943132 78.4732858,91.6153132 C76.3412858,99.0353132 57.0891858,99.8833132 35.4726858,93.5093132 C13.8560858,87.1343132 -1.93921418,75.9513132 0.192785819,68.5303132 C2.32488582,61.1096132 21.5768858,60.2615132 43.1933858,66.6361132 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M183.494286,150.431313 C206.437286,157.197313 223.308286,168.698313 221.176286,176.118313 C219.044286,183.539313 198.716286,184.070313 175.773286,177.304313 C152.830286,170.538313 135.959286,159.038313 138.091286,151.617313 C140.223286,144.196313 160.550286,143.665313 183.494286,150.431313 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M67.5172858,134.861313 C62.1562858,129.304313 44.5736858,137.392313 28.2448858,152.925313 C11.9159858,168.458313 3.02438582,185.555313 8.38498582,191.112313 C13.7455858,196.668313 31.3282858,188.581313 47.6571858,173.048313 C63.9862858,157.515313 72.8772858,140.418313 67.5172858,134.861313 Z"
              id="Path"
              fill="#000000"
            ></path>
            <path
              d="M307.475286,68.9323132 L307.475286,64.1800132 L287.886286,64.1800132 L287.886286,190.909313 L307.475286,190.909313 L307.475286,156.762313 C307.475286,153.066313 307.475286,150.074313 307.118286,146.026313 L307.475286,146.026313 C314.598286,157.643313 326.707286,163.803313 340.952286,163.803313 C364.992286,163.803313 386.005286,145.674313 386.005286,112.055313 C386.005286,79.1413132 364.992286,61.3638132 340.952286,61.3638132 C327.241286,61.3638132 315.132286,67.3482132 307.475286,79.1413132 L307.118286,79.1413132 C307.475286,75.2683132 307.475286,72.4526132 307.475286,68.9323132 Z M335.966286,147.082313 C317.803286,146.906313 307.296286,131.593313 307.296286,111.879313 C307.296286,93.2223132 317.803286,78.2613132 335.966286,78.0853132 C353.774286,77.9093132 365.527286,91.6383132 365.527286,112.055313 C365.527286,133.001313 353.774286,147.258313 335.966286,147.082313 Z"
              id="Shape"
              fill="#0D0D0D"
            ></path>
            <path
              d="M488.865286,103.783313 C488.865286,79.4933132 469.277286,61.3638132 442.566286,61.3638132 C414.074286,61.3638132 394.308286,80.5493132 394.308286,112.583313 C394.308286,143.385313 413.718286,163.803313 442.566286,163.803313 C466.249286,163.803313 483.879286,150.074313 487.974286,131.241313 L466.606286,131.241313 C463.222286,140.745313 453.962286,147.082313 442.566286,147.082313 C427.964286,147.082313 417.279286,136.697313 414.964286,119.448313 L488.865286,119.448313 L488.865286,103.783313 Z M442.566286,78.0853132 C456.990286,78.0853132 466.962286,87.9413132 469.099286,102.198313 L415.142286,102.198313 C417.635286,88.4693132 427.786286,78.0853132 442.566286,78.0853132 Z"
              id="Shape"
              fill="#0D0D0D"
            ></path>
            <path
              d="M503.265286,160.987313 L522.853286,160.987313 L522.853286,106.423313 C522.853286,87.7653132 533.181286,78.0853132 549.208286,78.0853132 L559.714286,78.0853132 L559.714286,61.3638132 L551.345286,61.3638132 C536.921286,61.3638132 528.017286,70.8685132 522.853286,79.1413132 L522.497286,79.1413132 L522.497286,64.1800132 L503.265286,64.1800132 L503.265286,160.987313 Z"
              id="Path"
              fill="#0D0D0D"
            ></path>
            <path
              d="M651.286286,144.090313 C648.615286,144.090313 647.368286,142.505313 647.368286,139.337313 L647.368286,96.7423132 C647.368286,76.3253132 637.396286,61.3638132 608.014286,61.3638132 C579.522286,61.3638132 566.523286,75.4453132 565.098286,95.5103132 L584.686286,95.5103132 C585.933286,84.5973132 594.659286,78.0853132 608.014286,78.0853132 C619.411286,78.0853132 627.246286,83.0133132 627.246286,90.7583132 C627.246286,97.0943132 622.794286,100.966313 608.192286,100.966313 L600.357286,100.966313 C577.029286,100.966313 561.359286,110.295313 561.359286,131.593313 C561.359286,153.946313 577.920286,164.155313 597.330286,164.155313 C611.754286,164.155313 624.041286,157.819313 628.849286,144.266313 C629.383286,154.122313 635.972286,160.987313 648.437286,160.987313 L659.477286,160.987313 L659.477286,144.090313 L651.286286,144.090313 Z M627.780286,115.927313 C627.780286,137.753313 615.849286,147.258313 600.535286,147.258313 C587.179286,147.258313 581.837286,139.513313 581.837286,131.593313 C581.837286,124.024313 586.467286,117.864313 600.713286,117.864313 L603.562286,117.864313 C617.274286,117.864313 625.821286,113.111313 627.602286,104.839313 L627.780286,104.839313 L627.780286,115.927313 Z"
              id="Shape"
              fill="#0D0D0D"
            ></path>
          </g>
        </g>
      </svg>
    )
  }

  async function getClient(): Promise<PeraWalletConnect> {
    const client = walletClient()
    if (client) {
      return client
    } else {
      // const PeraWalletConnect = (await import('@perawallet/connect')).PeraWalletConnect
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

export default createRoot(UsePera)
