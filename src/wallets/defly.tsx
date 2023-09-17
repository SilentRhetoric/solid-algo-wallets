/*
 * Documentation:
 * https://github.com/blockshake-io/defly-connect
 */
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { WalletAccount, WalletInterface } from '../types'
import type { Transaction } from 'algosdk'
import { createRoot, createSignal } from 'solid-js'
// import useNetwork from '../useNetwork'

function useDefly(): WalletInterface {
  const [walletClient, setWalletClient] = createSignal<DeflyWalletConnect>()
  const [accounts, setAccounts] = createSignal<WalletAccount[]>([])
  // const { getChainId } = useNetwork

  const name = 'Defly'

  function icon() {
    return (
      <svg
        width="100%"
        height="32"
        viewBox="0 0 340 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M327.049 280.192L169.524 13L12 280.192L169.524 189.084L327.049 280.192Z" />
        <path d="M299.546 307L169.525 238.473L39.5039 307L169.525 264.67L299.546 307Z" />
      </svg>
    )
  }

  function image() {
    return (
      <svg
        width="100%"
        height="32"
        viewBox="0 0 980 340"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M446 279.676C435.568 279.676 426.603 276.865 419.105 271.241C411.607 265.536 405.861 257.508 401.868 247.158C397.956 236.808 396 224.664 396 210.728C396 196.303 398.2 183.996 402.601 173.809C407.002 163.54 413.156 155.716 421.061 150.337C428.966 144.877 438.094 142.146 448.445 142.146C455.128 142.146 460.873 143.287 465.682 145.569C470.572 147.851 474.524 150.908 477.54 154.738C480.555 158.568 482.552 162.766 483.53 167.33L487.931 179.799L481.941 188.479C481.126 185.382 479.74 182.733 477.784 180.532C475.91 178.251 473.465 176.498 470.449 175.276C467.516 174.053 464.011 173.442 459.936 173.442C451.705 173.442 445.307 176.58 440.743 182.855C436.261 189.049 434.019 198.585 434.019 211.461C434.019 223.768 436.179 233.018 440.499 239.212C444.899 245.406 451.256 248.503 459.569 248.503C463.563 248.503 467.149 247.932 470.327 246.791C473.587 245.569 476.236 244.102 478.273 242.39C480.311 240.597 481.533 238.845 481.941 237.134L483.408 238.723L481.941 246.791C480.8 251.681 479.251 256.164 477.295 260.239C475.339 264.232 472.935 267.696 470.083 270.63C467.23 273.482 463.807 275.724 459.814 277.354C455.902 278.902 451.297 279.676 446 279.676ZM482.063 278.087L481.941 87.8679H519.838V278.087H482.063Z" />
        <path d="M607.332 279.921C593.803 279.921 582.271 277.231 572.735 271.852C563.2 266.473 555.906 258.69 550.853 248.503C545.8 238.234 543.273 225.846 543.273 211.339C543.273 196.343 545.963 183.711 551.342 173.442C556.721 163.092 564.3 155.268 574.08 149.97C583.86 144.673 595.311 142.024 608.432 142.024C621.146 142.024 631.822 144.428 640.461 149.237C649.182 154.045 655.783 161.136 660.265 170.508C664.748 179.88 666.989 191.413 666.989 205.104C666.989 206.816 666.908 208.813 666.745 211.095C666.663 213.295 666.541 215.822 666.378 218.674H580.559C581.456 229.758 584.145 237.867 588.628 243.002C593.11 248.055 599.386 250.581 607.454 250.581C614.137 250.581 619.19 249.114 622.613 246.18C626.117 243.246 628.196 239.375 628.848 234.566H665.278C664.544 243.776 661.732 251.804 656.842 258.649C652.034 265.414 645.433 270.671 637.038 274.42C628.644 278.087 618.742 279.921 607.332 279.921ZM596.085 197.281H630.437C630.111 188.723 628.033 182.325 624.202 178.088C620.453 173.85 614.667 171.731 606.843 171.731C597.633 171.731 590.91 175.031 586.672 181.633C582.434 188.153 580.274 197.444 580.193 209.505C580.845 204.86 582.434 201.682 584.96 199.97C587.487 198.177 591.195 197.281 596.085 197.281Z" />
        <path d="M697.196 278.087V186.767C697.196 182.692 697.889 179.758 699.274 177.965C700.741 176.172 702.779 174.95 705.387 174.298L697.196 150.093V128.821C697.196 118.389 699.274 109.71 703.431 102.782C707.587 95.8549 713.17 90.6797 720.179 87.2567C727.188 83.7522 734.889 82 743.284 82C749.07 82 753.431 82.163 756.364 82.489C759.38 82.7335 762.355 83.141 765.289 83.7115V116.352C763.496 115.7 761.214 115.211 758.443 114.885C755.672 114.477 752.616 114.274 749.274 114.274C746.503 114.274 744.058 114.803 741.939 115.863C739.82 116.841 738.149 118.675 736.927 121.364C735.786 123.972 735.215 127.68 735.215 132.489V278.087H697.196ZM680.815 174.298V144.591H760.032V174.298H680.815ZM782.281 278.087V87.1345H820.423V278.087H782.281Z" />
        <path d="M852.8 330.776V298.503H867.347C873.215 298.503 877.698 298.014 880.795 297.036C883.892 296.139 886.173 294.794 887.64 293.001C889.189 291.29 890.411 289.252 891.308 286.889C892.367 284.118 893.386 282.08 894.364 280.776C895.342 279.472 896.605 278.576 898.154 278.087H883.362L838.985 144.714H880.061L897.787 215.985L903.9 241.901H905L910.623 216.107L927.616 144.714H968.447L926.149 278.087C923.541 286.237 920.607 293.572 917.347 300.092C914.087 306.612 910.216 312.154 905.733 316.718C901.251 321.282 895.872 324.745 889.596 327.109C883.321 329.554 875.905 330.776 867.347 330.776H852.8Z" />
        <path d="M329.049 290.192L171.524 23L14 290.192L171.524 199.084L329.049 290.192Z" />
        <path d="M301.546 317L171.525 248.473L41.5039 317L171.525 274.67L301.546 317Z" />
      </svg>
    )
  }

  async function getClient(): Promise<DeflyWalletConnect> {
    const client = walletClient()
    if (client) {
      return client
    } else {
      // const DeflyWalletConnect = (await import('@blockshake/defly-connect')).DeflyWalletConnect
      const client = new DeflyWalletConnect({
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
    console.debug('Defly: connect')
    const client = await getClient()
    try {
      const accounts = await client.connect()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }
      const walletAccounts: WalletAccount[] = accounts.map((address: string, index: number) => ({
        name: `Defly Wallet ${index + 1}`,
        address,
      }))
      client.connector?.on('disconnect', event => {
        console.debug('Disconnect from Defly')
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
    console.debug('Defly: reconnect')
    const client = await getClient()
    try {
      const accounts = await client.reconnectSession()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }
      const walletAccounts: WalletAccount[] = accounts.map((address: string, index: number) => ({
        name: `Defly Wallet ${index + 1}`,
        address,
      }))
      client.connector?.on('disconnect', event => {
        console.debug('Disconnect from Defly')
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
    console.debug('Disconnecting Defly')
    const client = walletClient()
    // console.debug("Client: ", JSON.stringify(client))
    if (client) {
      await client.disconnect().catch(error => {
        console.error('Error disconnecting Defly', error)
      })
    }
    console.debug('Defly disconnected')
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

export default createRoot(useDefly)
