<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-algo-wallets&background=tiles&project=%20" alt="solid-algo-wallets">
</p>

# Solid Algo Wallets

[![npm version](https://badge.fury.io/js/solid-algo-wallets.svg)](https://badge.fury.io/js/solid-algo-wallets)

![License](https://img.shields.io/github/license/SilentRhetoric/solid-algo-wallets)

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

The solid-algo-wallets library provides a simple, unified interface for integrating Algorand wallets into a decentralized web application client built with SolidJS.

## Quick start

Install it:

```bash
npm i solid-algo-wallets
# or
yarn add solid-algo-wallets
# or
pnpm add solid-algo-wallets
```

Use it:

```tsx
import solid-algo-wallets from 'solid-algo-wallets'
```

## Overview

The solid-algo-wallets library provides a simple, unified interface for integrating Algorand wallets into a decentralized web application client built with SolidJS.

Importing solid-algo-wallet into your app client provides convenient functions to:

- Access multiple wallet interfaces
- Get icons and images for the wallets
- Connect to a wallet and get connected acounts
- Select an account to use in the app
- Provide the selected account as a reactive signal
- Sign transactions with the connected wallet account
- Reconnect to the wallet on page reload

## Example Application

An example web application built with SolidJS which integrates solid-algo-wallets can be found here:

- [ ] TODO: Add example app link

## Design Decisions

The solid-algo-wallets library was designed in an opinionated way. These are some of the key design decisions and the rationale behind them.

### Signing Interface

The wallet signing function follows the type of the Algorand JavaScript SDK `TransactionSigner` type (<https://algorand.github.io/js-algorand-sdk/types/TransactionSigner.html>). This makes it easy to use the wallet signing function together with the rest of the JS SDK and its atomic transaction group functions.

This design was chosen because it makes it easy to invoke the signing function, which only requires providing an array of `algosdk.Transaction` class objects and an array of indexes to sign in that `Transaction` array. The app can simply pass in the JavaScript objects without needing to handle encoding/decoding.

### Single Active Wallet & Account

When using the library, a single wallet can be connected to the application at a time. From that wallet, multiple accounts can be selected on the wallet side and provided to the app as an array. The user can then choose a single account from that array to be the active account in the app's state for signing transactions via the connected wallet.

This design strives to implement the principle that blockchain apps should have clear, simple, and intuitive user interfaces that enable great user experiences. Using decentralized apps already involves a number of UX complexities, so this library avoids having multiple wallets connected simultaneously due to the additional UX complexity that introduces.

### State Management

The library is designed to manage state globally using SolidJS reactive roots on the client side of the web appplication. This allows a web app to consume/set the app's wallet state easily from anywhere in the code. However, this is not suitable for apps which utilize server-side rendering.

This design was chosen both for simplicity and also because truly decentralized web apps should allow users to use the client without dependency on a back-end server. These wallet interfaces should be managed on the client so that an end user can download and install a web app locally and continue using it even if the host server becomes unavailable.
