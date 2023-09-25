# Solid Algo Wallets

![solid-algo-wallets](https://assets.solidjs.com/banner?type=solid-algo-wallets&background=tiles&project=%20)

[![npm version](https://badge.fury.io/js/solid-algo-wallets.svg)](https://badge.fury.io/js/solid-algo-wallets)

The solid-algo-wallets library provides a simple, unified interface for integrating several Algorand wallets into a web application client built with SolidJS. A live demo can be found at <https://solid-algo-wallets-example.netlify.app>.

This work has been performed with support from the Algorand Foundation xGov Grants Program.

## Quick start

### Install it

```bash
npm i solid-algo-wallets
# or
yarn add solid-algo-wallets
# or
pnpm add solid-algo-wallets
```

### Use it

```js
import solid-algo-wallets from 'solid-algo-wallets'
```

## Overview

The solid-algo-wallets library provides a simple, unified interface for integrating Algorand wallets into a web application client built with SolidJS.

Importing solid-algo-wallet into your app client provides convenient functions to:

- Access multiple wallet interfaces
- Get icons and images for the wallets
- Connect to a wallet and get connected acounts
- Select an account to use in the app
- Provide the selected account as a reactive signal
- Sign transactions with the connected wallet account
- Reconnect to the wallet on page reload

## Example SolidJS Application

A working demo can be found here: <https://solid-algo-wallets-example.netlify.app>

The example app code can be found here: <https://github.com/SilentRhetoric/solid-algo-wallets-example>

## Supported Wallets

The following wallet interfaces are supported and the library provides icons & logos:

| Wallet                  | Home Page                                   | Technical Docs                                                                                | Notes                                                                            |
| ----------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Defly                   | <https://defly.app>                         | <https://docs.defly.app/app/overview>                                                         | Mobile                                                                           |
| Pera                    | <https://perawallet.app>                    | <https://docs.perawallet.app>                                                                 | Mobile & Web                                                                     |
| Exodus                  | <https://www.exodus.com>                    | <https://docs.exodus.com>                                                                     | Chrome extension, MainNet only                                                   |
| MyAlgo                  | <https://connect.myalgo.com>                | <https://connect.myalgo.com/docs/introduction>                                                | Web                                                                              |
| Ledger                  | <https://www.ledger.com/ledger-live>        | <https://github.com/LedgerHQ/ledger-live/tree/develop/libs/ledgerjs/packages/hw-app-algorand> | Direct USB in Chrome                                                             |
| WalletConnect           | <https://walletconnect.com>                 | <https://docs.walletconnect.com/2.0/>                                                         | Any compatible app                                                               |
| MetaMask (experimental) | <https://metamask.io> <https://snapalgo.io> | <https://snapalgo.io/docs>                                                                    | Pre-release Algorand Snap running in MetaMask Flask <https://metamask.io/flask/> |

### WalletConnect-compatible Wallets

The following wallets are known to be compatible with the generic WalletConnect interface:
| Wallet | Home Page | Technical Docs | Notes |
| ------------- | ---------------------------- | ---------------------------------------------- | ---|
| AWallet | <https://www.a-wallet.net/> | <https://github.com/scholtz/wallet/> | Manual connection to web wallet via copy/paste |

### Known Unsupported Wallets

- [Daffi Wallet](https://www.daffione.com) is not able to establish a WalletConnect session as of Sep 9th, 2023 and so is not included. A Pull Request would be accepted when the wallet can be successfully connected.

- [AlgoSigner](https://github.com/PureStake/algosigner/tree/develop) is no longer maintained by PureStake and so is not included.

## How It Works

### Configuration

The library is configured using environment variables from a .env file in the project which uses the library. A .env.template file is provided in this repo. The following things are configurable:

- Algod server/token/port for each public network as well as AlgoKit LocalNet
- Block explorer base URL to construct explorer links for each network. Supports AlgoExplorer and Dappflow linking.
- Project ID, Project Name, Project Description, Project URL, and Project ICON for the Dapp's project on WalletConnect

### UseSolidAlgoWallets

The `UseSolidAlgoWallets` function returns a reactive root that provides the active wallet/metadata/address, methods to connect/reconnect/disconnect wallets, and a `transactionSigher` function that enables signing transactions with the connected wallet.

### UseNetwork

The `UseNetwork` function returns a reactive root that provides an alogd client for the selected network, as well as helpful functions to create URLs for block explorer linking.

## Design Decisions

The solid-algo-wallets library was designed in an opinionated way to provide a large menu of wallet connectivity options in a simple package for developers and experience for users. Following are some of the design decisions and the rationale behind them.

### Signing Interface

The wallet signing function follows the type of the Algorand JavaScript SDK `TransactionSigner` type (<https://algorand.github.io/js-algorand-sdk/types/TransactionSigner.html>). This makes it easy to use the wallet signing function together with the rest of the JS SDK and its atomic transaction group functions.

This design was chosen because it makes it easy to invoke the signing function, which only requires providing an array of `algosdk.Transaction` class objects and an array of indexes to sign in that `Transaction` array. The app can simply pass in the JavaScript objects without needing to handle encoding/decoding.

### Single Active Wallet & Account

When using the library, a single wallet can be connected to the application at a time. From that wallet, multiple accounts can be selected on the wallet side and provided to the app as an array. The user can then choose a single account from that array to be the active account in the app's state for signing transactions via the connected wallet.

This design strives to implement the principle that blockchain apps should have clear, simple, and intuitive user interfaces that enable great user experiences. Using decentralized apps already involves a number of UX complexities, so this library avoids having multiple wallets connected simultaneously due to the additional UX complexity that introduces.

### State Management

The library is designed to manage state globally using SolidJS reactive roots on the client side of the web appplication. This allows a web app to consume/set the app's wallet state easily from anywhere in the code.

This design was chosen both for simplicity and also because truly decentralized web apps should allow users to use the client without dependency on a back-end server. These wallet interfaces should be managed on the client so that an end user can download and install a web app locally and continue using it even if the host server becomes unavailable.

> Note that this approach is not suitable for Solid Start apps which utilize server-side rendering (SSR) and _will_ cause problems. It may be possible to provide the reactive roots to a context provider, but this is untested as yet.

### Additional Resources

To learn more about SolidJS, visit <https://www.solidjs.com>.

To learn more about developing on Algorand, visit <https://developer.algorand.org>.
