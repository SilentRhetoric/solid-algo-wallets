// import { makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk'

// // https://arc.algorand.foundation/ARCs/arc-0001
// export type AlgorandAddress = string
// export type SignedTxnStr = string
// export interface MultisigMetadata {
//   /**
//    * Multisig version.
//    */
//   version: number

//   /**
//    * Multisig threshold value. Authorization requires a subset of signatures,
//    * equal to or greater than the threshold value.
//    */
//   threshold: number

//   /**
//    * List of Algorand addresses of possible signers for this
//    * multisig. Order is important.
//    */
//   addrs: AlgorandAddress[]
// }

// export interface WalletTransaction {
//   /**
//    * Base64 encoding of the canonical msgpack encoding of a Transaction.
//    */
//   txn: string

//   /**
//    * Optional authorized address used to sign the transaction when the account
//    * is rekeyed. Also called the signor/sgnr.
//    */
//   authAddr?: AlgorandAddress

//   /**
//    * Multisig metadata used to sign the transaction
//    */
//   msig?: MultisigMetadata

//   /**
//    * Optional list of addresses that must sign the transactions
//    */
//   signers?: AlgorandAddress[]

//   /**
//    * Optional base64 encoding of the canonical msgpack encoding of a
//    * SignedTxn corresponding to txn, when signers=[]
//    */
//   stxn?: SignedTxnStr

//   /**
//    * Optional message explaining the reason of the transaction
//    */
//   message?: string

//   /**
//    * Optional message explaining the reason of this group of transaction
//    * Field only allowed in the first transaction of a group
//    */
//   groupMessage?: string
// }

// interface Request {
//   method: string
//   params: {
//     'npm:@algorandfoundation/algorand-metamask-snap'?: {}
//     snapId?: string
//     request?: {
//       method?: string
//       params?: { testnet?: boolean; [key: string]: any }
//     }
//   }
// }

// type MetaMask = {
//   request: (req: Request) => Promise<any>
// }

// type WindowExtended = { ethereum: MetaMask } & Window & typeof globalThis

// export async function connect() {
//   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//   if (typeof window == 'undefined' || (window as WindowExtended).ethereum === undefined) {
//     throw new Error('MetaMask is not available')
//   }
//   const client = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_requestSnaps',
//     params: {
//       'npm:@algorandfoundation/algorand-metamask-snap': {},
//     },
//   })
//   console.debug('Client: ', client)
// }

// export async function displayBalance() {
//   await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'displayBalance',
//         params: { testnet: true },
//       },
//     },
//   })
// }

// export async function getBalance() {
//   const balance = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'getBalance',
//         params: { testnet: true },
//       },
//     },
//   })
//   console.debug('Balance: ', balance)
//   return balance
// }

// export async function getAddress() {
//   const address = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'getAddress',
//         params: { testnet: true },
//       },
//     },
//   })
//   console.debug('Address: ', address)
//   return address
// }

// export async function transfer() {
//   const address = prompt("Please enter recipient's Algorand address")
//   if (address) {
//     const response = await (window as WindowExtended).ethereum.request({
//       method: 'wallet_invokeSnap',
//       params: {
//         snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//         request: {
//           method: 'transfer',
//           params: {
//             to: address,
//             amount: 0,
//             testnet: true,
//           },
//         },
//       },
//     })
//     console.debug('Transfer response: ', response)
//     // Response is a Transaction ID
//     return response
//   }
// }

// export async function displayMnemonic() {
//   await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'displayMnemonic',
//       },
//     },
//   })
// }

// export async function getTransactions() {
//   const response = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'getTransactions',
//         params: {
//           testnet: true,
//         },
//       },
//     },
//   })
//   console.debug('Transactions response: ', response)
//   // Response is an object with a transactions array in newest->oldest order
//   return response
// }

// export async function getAssets() {
//   const response = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'getAssets',
//         params: {
//           testnet: true,
//         },
//       },
//     },
//   })
//   console.debug('Assets response: ', JSON.stringify(response))
//   // Response is an array of assets with amount, asset, asset-id, deleted, is-frozen, opted-in-at-round, etc.
//   /*
//   [{"amount":0,"asset-id":10458941,"deleted":false,"is-frozen":false,"opted-in-at-round":33055176,"asset":[{"created-at-round":7879744,"deleted":false,"index":10458941,"params":{"clawback":"XM2W7VZODABS6RAL3FENBRKCOF6XLOQZZWIVVZTBYCVH2ADRYKN53CQLXM","creator":"VETIGP3I6RCUVLVYNDW5UA2OJMXB5WP6L6HJ3RWO2R37GP4AVETICXC55I","decimals":6,"default-frozen":false,"freeze":"JTDZXA72SNBU5JCFO6MI5LITSR7YDBLQI2K5LERAIIYSG4P7GZRS6ZLTJE","manager":"6FLEYABEB3G7ZKHL4NBCXHMMXVTEITBXI4AU3CMVXKJVEBKRRKOEY5UQEI","name":"USDC","name-b64":"VVNEQw==","reserve":"UJBZPEMXLD6KZOLUBUDSZ3DXECXYDADZZLBH6O7CMYXHE2PLTCW44VK5T4","total":18446744073709552000,"unit-name":"USDC","unit-name-b64":"VVNEQw==","url":"https://centre.io","url-b64":"aHR0cHM6Ly9jZW50cmUuaW8="}}]}]
//   */
//   return response
// }

// export async function getAccounts() {
//   const response = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'getAccounts',
//         params: {
//           testnet: true,
//         },
//       },
//     },
//   })
//   console.debug('Accounts response: ', response)
//   // Response is an object keyed by addr with child objects with addr, name, path, swaps, type
//   return response
// }

// export async function getCurrentAccount() {
//   const response = await (window as WindowExtended).ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//       request: {
//         method: 'getCurrentAccount',
//         params: {
//           testnet: true,
//         },
//       },
//     },
//   })
//   console.debug('Current Account response: ', response)
//   // Response is an object with addr, name, path, swaps, type
//   return response
// }

// export async function setCurrentAccount() {
//   const address = prompt("Please enter recipient's Algorand address")
//   if (address) {
//     try {
//       const response = await (window as WindowExtended).ethereum.request({
//         method: 'wallet_invokeSnap',
//         params: {
//           snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//           request: {
//             method: 'setAccount',
//             params: {
//               address: address,
//               testnet: true,
//             },
//           },
//         },
//       })
//       console.debug('Set Current Account response: ', response)
//       // Response is true if successful
//       return response
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }

// export async function assetOptIn() {
//   const assetId = prompt('Please enter asset ID')
//   if (assetId) {
//     try {
//       const response = await (window as WindowExtended).ethereum.request({
//         method: 'wallet_invokeSnap',
//         params: {
//           snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//           request: {
//             method: 'assetOptIn',
//             params: {
//               assetIndex: Number(assetId),
//               testnet: true,
//             },
//           },
//         },
//       })
//       console.debug('Opt In response: ', response)
//       // Response is Transaction ID
//       return response
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }
// export async function assetOptOut() {
//   const assetId = prompt('Please enter asset ID')
//   if (assetId) {
//     try {
//       const response = await (window as WindowExtended).ethereum.request({
//         method: 'wallet_invokeSnap',
//         params: {
//           snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//           request: {
//             method: 'assetOptOut',
//             params: {
//               assetIndex: Number(assetId),
//               testnet: true,
//             },
//           },
//         },
//       })
//       console.debug('Opt Out response: ', response)
//       // Response is Transaction ID
//       return response
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }

// // Currently throwing RPC Error: result is not defined
// // Docs say the amount should be a string but that throws Amount must be a positive number and smaller than 2^64-1. If the number is larger than 2^53-1, use bigint.
// export async function transferAsset() {
//   const assetId = prompt('Please enter asset ID')
//   const amount = prompt('Please enter asset amount to send')
//   const address = prompt("Please enter recipient's Algorand address")
//   if (assetId && address) {
//     try {
//       const response = await (window as WindowExtended).ethereum.request({
//         method: 'wallet_invokeSnap',
//         params: {
//           snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//           request: {
//             method: 'transferAsset',
//             params: {
//               assetIndex: Number(assetId),
//               to: address,
//               amount: Number(amount),
//               testnet: true,
//             },
//           },
//         },
//       })
//       console.debug('Transfer Asset response: ', response)
//       // Response is Transaction ID
//       return response
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }

// // Just a POC
// // Errors on sending amount = 0
// export async function signTxns() {
//   const { algodClient } = useNetwork
//   const suggestedParams = await algodClient().getTransactionParams().do()

//   const payTxn = makePaymentTxnWithSuggestedParamsFromObject({
//     from: '2IRWABDUYCUOYJZBCRSYQXTS4UM3WNIHTOFT73MHGSXCXWYZORUPT5SSWA',
//     to: '2IRWABDUYCUOYJZBCRSYQXTS4UM3WNIHTOFT73MHGSXCXWYZORUPT5SSWA',
//     amount: Number(1),
//     suggestedParams,
//   })

//   try {
//     const txnToSign = Buffer.from(payTxn.toByte()).toString('base64')
//     const txnsToSign = [{ txn: txnToSign }]
//     console.debug('txnsToSign: ', txnsToSign)
//     const response = await (window as WindowExtended).ethereum.request({
//       method: 'wallet_invokeSnap',
//       params: {
//         snapId: 'npm:@algorandfoundation/algorand-metamask-snap',
//         request: {
//           method: 'signTxns',
//           params: {
//             txns: txnsToSign,
//             testnet: true,
//           },
//         },
//       },
//     })
//     console.debug('Sign Transactions response: ', response)
//     // Response is ['gqNzaWfEQP2fFZnmkMQq6z93F4HQDYKL2Qec9QSVHMlcBlxzM4…0wKjsJyEUZYhecuUZuzUHm4s/7Yc0rivbGXRopHR5cGWjcGF5']
//     return response
//   } catch (e) {
//     console.error(e)
//   }
// }

// // TODO: Swaps
// // https://github.com/algorandfoundation/algo-metamask#swapping-functions
