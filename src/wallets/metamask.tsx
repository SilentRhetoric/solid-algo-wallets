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
    return (
      <svg
        width="32"
        viewBox="0 0 154 142"
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
            id="SVG_MetaMask_Icon_Color"
            fill-rule="nonzero"
          >
            <g
              id="MM_Head_background__x28_Do_not_edit_x29_"
              fill="#F5841F"
            >
              <path
                d="M141.8,70.5 L148.7,62.4 L145.7,60.2 L150.5,55.8 L146.8,53 L151.6,49.4 L148.5,47 L153.5,22.6 L145.9,0 M145.9,0 L97.1,18.1 L97.1,18.1 L97.1,18.1 L56.4,18.1 L56.4,18.1 L7.6,0 L7.9,0.2 L7.6,0 L7.10542736e-15,22.6 L5.1,47 L1.9,49.4 L6.8,53 L3.1,55.8 L7.9,60.2 L4.9,62.4 L11.8,70.5 L1.3,102.9 L1.3,102.9 L1.3,102.9 L11,136 L45.1,126.6 L45.1,126.5 L45.1,126.6 L45.1,126.6 L45.1,126.6 L45.1,126.6 L45.1,126.6 L45.1,126.6 L45.1,126.6 L45.1,126.6 L51.7,132 L65.2,141.2 L88.3,141.2 L101.8,132 L108.4,126.6 L108.4,126.6 L108.4,126.6 L108.4,126.6 L108.4,126.6 L142.6,136 L152.4,102.9 L152.4,102.9 L152.4,102.9 L141.8,70.5"
                id="Shape"
              ></path>
            </g>
            <g id="Group">
              <polygon
                id="Path"
                fill="#E27625"
                points="145.9 7.10542736e-15 86 44.1 97.1 18.1"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="7.6 7.10542736e-15 67 44.5 56.4 18.1"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="124.4 102.3 108.4 126.5 142.6 135.9 152.4 102.8"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="1.3 102.8 11 135.9 45.1 126.5 29.2 102.3"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="43.3 61.3 33.8 75.6 67.6 77.1 66.5 40.9"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="110.3 61.3 86.7 40.5 86 77.1 119.8 75.6"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="45.1 126.5 65.6 116.7 47.9 103.1"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="88 116.7 108.4 126.5 105.6 103.1"
              ></polygon>
              <polygon
                id="Path"
                fill="#D7C1B3"
                points="108.4 126.5 88 116.7 89.7 129.9 89.5 135.5"
              ></polygon>
              <polygon
                id="Path"
                fill="#D7C1B3"
                points="45.1 126.5 64.1 135.5 64 129.9 65.6 116.7"
              ></polygon>
              <polygon
                id="Path"
                fill="#2F343B"
                points="64.4 94.3 47.5 89.4 59.5 83.9"
              ></polygon>
              <polygon
                id="Path"
                fill="#2F343B"
                points="89.1 94.3 94.1 83.9 106.1 89.4"
              ></polygon>
              <polygon
                id="Path"
                fill="#CC6228"
                points="45.1 126.5 48.1 102.3 29.2 102.8"
              ></polygon>
              <polygon
                id="Path"
                fill="#CC6228"
                points="105.5 102.3 108.4 126.5 124.4 102.8"
              ></polygon>
              <polygon
                id="Path"
                fill="#CC6228"
                points="119.8 75.6 86 77.1 89.1 94.3 94.1 83.9 106.1 89.4"
              ></polygon>
              <polygon
                id="Path"
                fill="#CC6228"
                points="47.5 89.4 59.5 83.9 64.4 94.3 67.6 77.1 33.8 75.6"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="33.8 75.6 47.9 103.1 47.5 89.4"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="106.1 89.4 105.6 103.1 119.8 75.6"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="67.6 77.1 64.4 94.3 68.4 114.7 69.3 87.9"
              ></polygon>
              <polygon
                id="Path"
                fill="#E27625"
                points="86 77.1 84.3 87.8 85.1 114.7 89.1 94.3"
              ></polygon>
              <polygon
                id="Path"
                fill="#F5841F"
                points="89.1 94.3 85.1 114.7 88 116.7 105.6 103.1 106.1 89.4"
              ></polygon>
              <polygon
                id="Path"
                fill="#F5841F"
                points="47.5 89.4 47.9 103.1 65.6 116.7 68.4 114.7 64.4 94.3"
              ></polygon>
              <polygon
                id="Path"
                fill="#C0AD9E"
                points="89.5 135.5 89.7 129.9 88.1 128.6 65.4 128.6 64 129.9 64.1 135.5 45.1 126.5 51.7 131.9 65.2 141.2 88.3 141.2 101.8 131.9 108.4 126.5"
              ></polygon>
              <polygon
                id="Path"
                fill="#2F343B"
                points="88 116.7 85.1 114.7 68.4 114.7 65.6 116.7 64 129.9 65.4 128.6 88.1 128.6 89.7 129.9"
              ></polygon>
              <polygon
                id="Path"
                fill="#763E1A"
                points="148.5 47 153.5 22.6 145.9 7.10542736e-15 88 42.6 110.3 61.3 141.8 70.5 148.7 62.4 145.7 60.2 150.5 55.9 146.8 53 151.6 49.4"
              ></polygon>
              <polygon
                id="Path"
                fill="#763E1A"
                points="7.10542736e-15 22.6 5.1 47 1.9 49.4 6.7 53.1 3 55.9 7.8 60.2 4.8 62.4 11.8 70.5 43.3 61.3 65.6 42.6 7.6 7.10542736e-15"
              ></polygon>
              <polygon
                id="Path"
                fill="#F5841F"
                points="141.8 70.5 110.3 61.3 119.8 75.6 105.6 103.1 124.4 102.8 152.4 102.8"
              ></polygon>
              <polygon
                id="Path"
                fill="#F5841F"
                points="43.3 61.3 11.8 70.5 1.3 102.8 29.2 102.8 47.9 103.1 33.8 75.6"
              ></polygon>
              <polygon
                id="Path"
                fill="#F5841F"
                points="86 77.1 88 42.6 97.1 18.1 56.4 18.1 65.6 42.6 67.6 77.1 68.4 87.9 68.4 114.7 85.1 114.7 85.2 87.9"
              ></polygon>
            </g>
          </g>
        </g>
      </svg>
    )
  }

  function image() {
    return (
      <svg
        viewBox="0 0 642 117"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        height="32"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="SVG_MetaMask_Horizontal_Color"
            fill-rule="nonzero"
          >
            <g
              id="MM_Head_background__x28_Do_not_edit_x29_"
              transform="translate(0.1, 0)"
              fill="#F5841F"
            >
              <path
                d="M121.3,1.42108547e-14 L80.7,15 L80.7,15 L80.7,15 L46.9,15 L46.9,15 L6.3,1.42108547e-14 L6.6,0.2 L6.3,1.42108547e-14 L2.84217094e-14,18.7 L4.2,38.8 L1.5,40.8 L5.5,43.8 L2.4,46.1 L6.4,49.7 L3.9,51.5 L9.7,58.3 L1,85.1 L1,85.1 L1,85.1 L9.1,112.5 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L37.5,104.8 L43,109.3 L54.2,116.9 L73.4,116.9 L84.7,109.3 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L90.2,104.8 L118.6,112.5 L126.7,85.1 L126.7,85.1 L126.7,85.1 L117.9,58.3 M117.8,58.3 L123.6,51.6 L121.1,49.8 L125.1,46.2 L122,43.9 L126,40.9 L123.4,38.9 L127.6,18.8 L121.3,0.1"
                id="Shape"
              ></path>
            </g>
            <g id="Group">
              <g
                transform="translate(176.2, 29)"
                fill="#161616"
              >
                <path
                  d="M390.6,29.8 C387.3,27.6 383.6,26 380.1,24.1 C377.8,22.8 375.4,21.7 373.5,20.1 C370.2,17.4 370.9,12 374.3,9.6 C379.3,6.3 387.6,8.1 388.5,14.9 C388.5,15 388.6,15.1 388.8,15.1 L396.4,15.1 C396.6,15.1 396.7,15 396.7,14.8 C396.3,10.1 394.5,6.2 391.2,3.7 C388,1.3 384.4,1.42108547e-14 380.5,1.42108547e-14 C360.5,1.42108547e-14 358.7,21.1 369.5,27.8 C370.7,28.6 381.3,33.9 385,36.2 C388.7,38.5 389.9,42.7 388.3,46.1 C386.8,49.1 383,51.2 379.2,51 C375,50.8 371.8,48.5 370.7,45 C370.5,44.4 370.4,43.1 370.4,42.6 C370.4,42.5 370.3,42.3 370.1,42.3 L361.9,42.3 C361.8,42.3 361.6,42.4 361.6,42.6 C361.6,48.5 363.1,51.8 367.1,54.8 C370.9,57.6 375,58.8 379.3,58.8 C390.5,58.8 396.3,52.5 397.4,45.9 C398.2,39.4 396.3,33.6 390.6,29.8 Z"
                  id="Path"
                ></path>
                <path
                  d="M39.8,1.1 L27.4,1.1 C27.3,1.1 27.2,1.2 27.1,1.3 L20.4,23.5 C20.3,23.8 19.9,23.8 19.8,23.5 L13.1,1.3 C13.1,1.2 13,1.1 12.8,1.1 L0.3,1.1 C0.2,1.1 -5.68434189e-14,1.2 -5.68434189e-14,1.4 L-5.68434189e-14,58 C-5.68434189e-14,58.1 0.1,58.3 0.3,58.3 L8.5,58.3 C8.6,58.3 8.8,58.2 8.8,58 L8.8,15 C8.8,14.7 9.3,14.6 9.4,14.9 L16.2,37.2 L16.7,38.8 C16.7,38.9 16.8,39 17,39 L23.3,39 C23.4,39 23.5,38.9 23.6,38.8 L24.1,37.2 L30.9,14.9 C31,14.6 31.5,14.7 31.5,15 L31.5,58 C31.5,58.1 31.6,58.3 31.8,58.3 L40,58.3 C40.1,58.3 40.3,58.2 40.3,58 L40.3,1.4 C40.1,1.2 40,1.1 39.8,1.1 Z"
                  id="Path"
                ></path>
                <path
                  d="M265.2,1.1 C265.1,1.1 265,1.2 264.9,1.3 L258.2,23.5 C258.1,23.8 257.7,23.8 257.6,23.5 L250.9,1.3 C250.9,1.2 250.8,1.1 250.6,1.1 L238.1,1.1 C238,1.1 237.8,1.2 237.8,1.4 L237.8,58 C237.8,58.1 237.9,58.3 238.1,58.3 L246.3,58.3 C246.4,58.3 246.6,58.2 246.6,58 L246.6,15 C246.6,14.7 247.1,14.6 247.2,14.9 L254,37.2 L254.5,38.8 C254.5,38.9 254.6,39 254.8,39 L261.1,39 C261.2,39 261.3,38.9 261.4,38.8 L261.9,37.2 L268.7,14.9 C268.8,14.6 269.3,14.7 269.3,15 L269.3,58 C269.3,58.1 269.4,58.3 269.6,58.3 L277.8,58.3 C277.9,58.3 278.1,58.2 278.1,58 L278.1,1.4 C278.1,1.3 278,1.1 277.8,1.1 C277.8,1.1 265.2,1.1 265.2,1.1 Z"
                  id="Path"
                ></path>
                <path
                  d="M159.6,1.1 L120.9,1.1 C120.8,1.1 120.6,1.2 120.6,1.4 L120.6,8.5 C120.6,8.6 120.7,8.8 120.9,8.8 L135.9,8.8 L135.9,58 C135.9,58.1 136,58.3 136.2,58.3 L144.4,58.3 C144.5,58.3 144.7,58.2 144.7,58 L144.7,8.8 L159.7,8.8 C159.8,8.8 160,8.7 160,8.5 L160,1.4 C159.9,1.2 159.8,1.1 159.6,1.1 Z"
                  id="Path"
                ></path>
                <path
                  d="M188.3,33.2 L194.3,11.1 C194.4,10.8 194.8,10.8 194.9,11.1 L200.9,33.2 C200.9,33.4 200.8,33.6 200.6,33.6 L188.6,33.6 C188.4,33.6 188.2,33.4 188.3,33.2 Z M207.9,58.2 L215.4,58.2 C215.6,58.2 215.7,58 215.7,57.8 L200.3,1 C200.3,0.9 200.2,0.8 200,0.8 L189.3,0.8 C189.2,0.8 189.1,0.9 189,1 L173.6,57.8 C173.6,58 173.7,58.2 173.9,58.2 L181.4,58.2 C181.5,58.2 181.6,58.1 181.7,58 L186.2,41.5 C186.2,41.4 186.3,41.3 186.5,41.3 L203,41.3 C203.1,41.3 203.2,41.4 203.3,41.5 L207.8,58 C207.6,58.1 207.8,58.2 207.9,58.2 Z"
                  id="Shape"
                ></path>
                <path
                  d="M315.4,33.2 L321.4,11.1 C321.5,10.8 321.9,10.8 322,11.1 L328,33.2 C328,33.4 327.9,33.6 327.7,33.6 L315.7,33.6 C315.5,33.6 315.3,33.4 315.4,33.2 Z M335,58.2 L342.5,58.2 C342.7,58.2 342.8,58 342.8,57.8 L327.4,1 C327.4,0.9 327.3,0.8 327.1,0.8 L316.4,0.8 C316.3,0.8 316.2,0.9 316.1,1 L300.6,57.8 C300.6,58 300.7,58.2 300.9,58.2 L308.4,58.2 C308.5,58.2 308.6,58.1 308.7,58 L313.2,41.5 C313.2,41.4 313.3,41.3 313.5,41.3 L330,41.3 C330.1,41.3 330.2,41.4 330.3,41.5 L334.8,58 C334.7,58.1 334.8,58.2 335,58.2 Z"
                  id="Shape"
                ></path>
                <path
                  d="M73.4,49.9 L73.4,32.3 C73.4,32.2 73.5,32 73.7,32 L95.5,32 C95.6,32 95.8,31.9 95.8,31.7 L95.8,24.6 C95.8,24.5 95.7,24.3 95.5,24.3 L73.7,24.3 C73.6,24.3 73.4,24.2 73.4,24 L73.4,9 C73.4,8.9 73.5,8.7 73.7,8.7 L98.5,8.7 C98.6,8.7 98.8,8.6 98.8,8.4 L98.8,1.3 C98.8,1.2 98.7,1 98.5,1 L64.9,1 C64.8,1 64.6,1.1 64.6,1.3 L64.6,57.8 C64.6,57.9 64.7,58.1 64.9,58.1 L99.5,58.1 C99.6,58.1 99.8,58 99.8,57.8 L99.8,50.3 C99.8,50.2 99.7,50 99.5,50 L73.6,50 C73.5,50.2 73.4,50.1 73.4,49.9 Z"
                  id="Path"
                ></path>
                <path
                  d="M465.4,57.8 L437.1,28.5 C437,28.4 437,28.2 437.1,28.1 L462.6,1.6 C462.8,1.4 462.6,1.1 462.4,1.1 L452,1.1 C451.9,1.1 451.9,1.1 451.8,1.2 L430.2,23.7 C430,23.9 429.7,23.7 429.7,23.5 L429.7,1.4 C429.7,1.3 429.6,1.1 429.4,1.1 L421.2,1.1 C421.1,1.1 420.9,1.2 420.9,1.4 L420.9,58 C420.9,58.1 421,58.3 421.2,58.3 L429.4,58.3 C429.5,58.3 429.7,58.2 429.7,58 L429.7,33.1 C429.7,32.9 430,32.7 430.2,32.9 L454.7,58.2 C454.7,58.2 454.8,58.3 454.9,58.3 L465.3,58.3 C465.4,58.3 465.6,57.9 465.4,57.8 Z"
                  id="Path"
                ></path>
              </g>
              <g
                transform="translate(0, 0)"
                id="Path"
              >
                <polygon
                  fill="#E27625"
                  points="121.4 1.42108547e-14 71.5 36.5 80.8 14.9"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="6.3 1.42108547e-14 55.8 36.8 46.9 14.9"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="103.4 84.6 90.2 104.6 118.6 112.4 126.7 85"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="1 85 9.1 112.4 37.5 104.6 24.3 84.6"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="36 50.7 28.1 62.5 56.2 63.8 55.3 33.8"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="91.7 50.7 72.1 33.5 71.5 63.8 99.6 62.5"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="37.5 104.6 54.5 96.5 39.9 85.2"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="73.2 96.5 90.2 104.6 87.8 85.2"
                ></polygon>
                <polygon
                  fill="#D7C1B3"
                  points="90.2 104.6 73.2 96.5 74.6 107.4 74.4 112"
                ></polygon>
                <polygon
                  fill="#D7C1B3"
                  points="37.5 104.6 53.3 112 53.2 107.4 54.5 96.5"
                ></polygon>
                <polygon
                  fill="#2F343B"
                  points="53.6 78 39.5 73.9 49.4 69.4"
                ></polygon>
                <polygon
                  fill="#2F343B"
                  points="74.1 78 78.3 69.4 88.3 73.9"
                ></polygon>
                <polygon
                  fill="#CC6228"
                  points="37.5 104.6 40 84.6 24.3 85"
                ></polygon>
                <polygon
                  fill="#CC6228"
                  points="87.7 84.6 90.2 104.6 103.4 85"
                ></polygon>
                <polygon
                  fill="#CC6228"
                  points="99.6 62.5 71.5 63.8 74.1 78 78.3 69.4 88.3 73.9"
                ></polygon>
                <polygon
                  fill="#CC6228"
                  points="39.5 73.9 49.4 69.4 53.6 78 56.2 63.8 28.1 62.5"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="28.1 62.5 39.9 85.2 39.5 73.9"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="88.3 73.9 87.8 85.2 99.6 62.5"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="56.2 63.8 53.6 78 56.9 94.9 57.6 72.7"
                ></polygon>
                <polygon
                  fill="#E27625"
                  points="71.5 63.8 70.1 72.6 70.8 94.9 74.1 78"
                ></polygon>
                <polygon
                  fill="#F5841F"
                  points="74.1 78 70.8 94.9 73.2 96.5 87.8 85.2 88.3 73.9"
                ></polygon>
                <polygon
                  fill="#F5841F"
                  points="39.5 73.9 39.9 85.2 54.5 96.5 56.9 94.9 53.6 78"
                ></polygon>
                <polygon
                  fill="#C0AD9E"
                  points="74.4 112 74.6 107.4 73.3 106.4 54.4 106.4 53.2 107.4 53.3 112 37.5 104.6 43 109.1 54.2 116.8 73.4 116.8 84.7 109.1 90.2 104.6"
                ></polygon>
                <polygon
                  fill="#2F343B"
                  points="73.2 96.5 70.8 94.9 56.9 94.9 54.5 96.5 53.2 107.4 54.4 106.4 73.3 106.4 74.6 107.4"
                ></polygon>
                <polygon
                  fill="#763E1A"
                  points="123.5 38.8 127.7 18.7 121.4 1.42108547e-14 73.2 35.2 91.7 50.7 117.9 58.3 123.7 51.6 121.2 49.8 125.2 46.2 122.1 43.9 126.1 40.8"
                ></polygon>
                <polygon
                  fill="#763E1A"
                  points="-1.42108547e-14 18.7 4.2 38.8 1.5 40.8 5.6 43.9 2.5 46.2 6.5 49.8 4 51.6 9.8 58.3 36 50.7 54.5 35.2 6.3 1.42108547e-14"
                ></polygon>
                <polygon
                  fill="#F5841F"
                  points="117.9 58.3 91.7 50.7 99.6 62.5 87.8 85.2 103.4 85 126.7 85"
                ></polygon>
                <polygon
                  fill="#F5841F"
                  points="36 50.7 9.8 58.3 1 85 24.3 85 39.9 85.2 28.1 62.5"
                ></polygon>
                <polygon
                  fill="#F5841F"
                  points="71.5 63.8 73.2 35.2 80.8 14.9 46.9 14.9 54.5 35.2 56.2 63.8 56.8 72.7 56.9 94.9 70.8 94.9 70.9 72.7"
                ></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
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
    const response: ConnectResult = await client.request({
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

  // Fails on amount 0
  // https://github.com/algorandfoundation/algo-metamask/blob/8e59119afed02c343f32075e0d704ee14cdcd167/src/TxnVerifier.js#L116
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
