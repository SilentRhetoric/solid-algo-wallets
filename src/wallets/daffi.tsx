/*
 * Documentation:
 * https://github.com/RDinitiativ/daffiwallet_connect
 */
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { WalletAccount, WalletInterface } from '../types'
import type { Transaction } from 'algosdk'
import { createRoot, createSignal } from 'solid-js'
// import useNetwork from '../useNetwork'

function useDaffi(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<DaffiWalletConnect>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  // const { getChainId } = useNetwork

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

  function image() {
    return (
      <svg
        width="100%"
        height="32px"
        viewBox="0 0 409 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="daffi"
            transform="translate(2, 1)"
            fill-rule="nonzero"
          >
            <path
              d="M80.9006522,75.8709661 L72.2032169,90.8651645 C79.6553035,86.5999702 85.8575401,80.3987339 90.1612451,72.9536492 C90.1687472,72.9406456 90.1762493,72.927642 90.1837515,72.9146383 L88.1811907,63.3214522 L80.9011523,75.8714662 L80.9006522,75.8709661 Z"
              id="Path"
              fill="#E1CA20"
            ></path>
            <path
              d="M88.1806906,63.3209521 L90.1832513,72.9141382 C94.2969031,65.7811409 96.6690673,57.5073243 96.67857,48.6708501 L88.1806906,63.3204519 L88.1806906,63.3209521 Z"
              id="Path"
              fill="#F5941F"
            ></path>
            <path
              d="M33.1512824,69.8152705 C28.7560517,66.9894793 24.7814388,62.6337597 23.042952,57.6688695 C20.99988,51.8352361 20.5437523,45.0263296 23.1099708,39.2767197 C24.878466,35.3131099 27.8958108,32.0071842 31.3077662,29.3784482 C32.4835954,28.4726946 33.7169407,27.6374607 34.9997999,26.8907516 C35.3368943,26.6931963 36.0871044,26.0780241 36.5022206,26.0780241 L36.5717401,26.0780241 L24.1307566,6.56255974 L9.27659745,32.4858183 L0.0025007002,48.6713502 L15.7804185,75.8709661 L24.4778538,90.8651645 L35.2848798,70.9700938 C34.5311687,70.6800126 33.8164686,70.2438905 33.1507822,69.8147704 L33.1512824,69.8152705 Z"
              id="Path"
              fill="#23B7A5"
            ></path>
            <path
              d="M2.42017765,33.4685934 C0.863241708,38.2369286 1.77635684e-15,43.3208521 1.77635684e-15,48.613334 L0.0025007002,48.6713502 L9.27659745,32.4858183 L2.42017765,33.4685934 Z"
              id="Path"
              fill="#F5941F"
            ></path>
            <path
              d="M24.1297563,6.5620596 C13.9559077,12.4997221 6.15022206,22.0553977 2.42017765,33.4685934 L9.27659745,32.4858183 L24.1297563,6.5620596 Z"
              id="Path"
              fill="#E1CA20"
            ></path>
            <path
              d="M0.0025007002,48.6713502 C0.0120033609,57.5238289 2.39266995,65.8121496 6.52032569,72.9536492 C9.22208218,73.8974135 12.7675749,75.0747432 15.7804185,75.8709661 L0.0025007002,48.6713502 Z"
              id="Path"
              fill="#E1CA20"
            ></path>
            <path
              d="M6.52032569,72.9536492 C10.8240307,80.3987339 17.0262674,86.5994701 24.4783539,90.8651645 L15.7809187,75.8709661 C12.7680751,75.0747432 9.22208218,73.8974135 6.52082583,72.9536492 L6.52032569,72.9536492 Z"
              id="Path"
              fill="#F5941F"
            ></path>
            <path
              d="M48.3020246,6.55855862 L72.5513144,6.5620596 C65.4423239,2.41339797 57.1910135,0.019727746 48.3790461,0.000222284462 L48.3790461,0.000222284462 C48.3660425,-0.000277855577 48.353539,0.000222284462 48.3405353,0.000222284462 C48.3275317,0.000222284462 48.3150282,0.000222284462 48.3020246,0.000222284462 L48.3020246,0.000222284462 C39.4900572,0.020227886 31.2387468,2.41389811 24.1297563,6.56255974 L48.3020246,6.55905876 L48.3020246,6.55855862 Z"
              id="Path"
              fill="#E51E25"
            ></path>
            <polygon
              id="Path"
              fill="#69CCB2"
              points="60.1098308 26.0780241 72.5513144 6.5620596 48.3020246 6.55855862 24.1297563 6.5620596 36.5712399 26.0780241"
            ></polygon>
            <path
              d="M72.5513144,6.5620596 L60.1103309,26.0775239 L60.1798504,26.0775239 C60.5949666,26.0775239 61.3446765,26.6926962 61.682271,26.8902515 C62.9646301,27.6374607 64.1979754,28.4726946 65.3743048,29.377948 C68.7862602,32.0066841 71.8031049,35.3126098 73.5721002,39.2762196 C76.1383187,45.0258295 75.682191,51.8352361 73.639119,57.6683694 C71.9006322,62.6332595 67.9260193,66.9889791 63.5307886,69.8147704 C62.8651022,70.2438905 62.1504021,70.6800126 61.3966911,70.9700938 L72.203717,90.8651645 L80.9011523,75.8709661 L96.6790701,48.6713502 L87.4049734,32.4858183 L72.5513144,6.5620596 Z"
              id="Path"
              fill="#23B7A5"
            ></path>
            <path
              d="M87.4044733,32.4858183 L96.67857,48.6713502 L96.6810707,48.613334 C96.6810707,43.3208521 95.817829,38.2364284 94.2608931,33.4685934 L87.4044733,32.4858183 L87.4044733,32.4858183 Z"
              id="Path"
              fill="#E1CA20"
            ></path>
            <path
              d="M87.4044733,32.4858183 L94.2608931,33.4685934 C90.5308486,22.0558979 82.725163,12.4997221 72.5513144,6.56255974 L87.4044733,32.4858183 Z"
              id="Path"
              fill="#F5941F"
            ></path>
            <path
              d="M48.3020246,90.9856982 L48.3020246,90.9856982 L24.4783539,90.8651645 C31.5093226,94.8897914 39.6350978,97.2074403 48.3020246,97.2264456 L48.3020246,97.2264456 C48.3150282,97.2269458 48.3275317,97.2264456 48.3405353,97.2264456 C48.353539,97.2264456 48.3660425,97.2264456 48.3790461,97.2264456 L48.3790461,97.2264456 C57.0459729,97.2069402 65.1717481,94.8897914 72.2027168,90.8646643 L48.3020246,90.9851981 L48.3020246,90.9856982 Z"
              id="Path"
              fill="#E51E25"
            ></path>
            <path
              d="M60.903553,71.1441426 L48.3405353,71.1901555 L35.7775177,71.1441426 C35.6104709,71.0976296 35.4479254,71.0331115 35.2853799,70.970594 L24.4783539,90.8656646 L48.3020246,90.9856982 L48.3020246,90.9856982 L72.2027168,90.8656646 L61.3956908,70.970594 C61.2326451,71.0331115 61.0700996,71.0981297 60.903553,71.1441426 Z"
              id="Path"
              fill="#69CCB2"
            ></path>
          </g>
          <text
            id="DaffiWallet"
            font-family="Helvetica"
            font-size="60"
            font-weight="normal"
            fill="#000000"
          >
            <tspan
              x="114.064453"
              y="72"
            >
              Daffi
            </tspan>
            <tspan
              x="237.433594"
              y="72"
              font-family="Helvetica-Oblique, Helvetica"
              font-style="italic"
            >
              Wallet
            </tspan>
          </text>
        </g>
      </svg>
    )
  }

  async function getClient(): Promise<DaffiWalletConnect> {
    const client = walletClient()
    if (client) {
      return client
    } else {
      // const DaffiWalletConnect = (await import('@daffiwallet/connect')).DaffiWalletConnect
      const client = new DaffiWalletConnect({
        // shouldShowSignTxnToast: false, // Enabled by default
        // chainId: getChainId(),
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
