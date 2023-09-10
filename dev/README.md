# Solid Algo Wallets Example

The Solid Algo Wallets Example provides a working demonstration of a SolidJS web application that integrates Algorand wallets via the [solid-algo-wallets](https://github.com/SilentRhetoric/solid-algo-wallets) library.

The example app utilizes [Vite](https://vitejs.dev) dev tooling, [Tailwind CSS](https://tailwindcss.com) styles, and [daisyUI](https://daisyui.com) components.

This work has been performed with support from the Algorand Foundation xGov Grants Program

## Quick Start

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Rename `.env.template` to `.env` and provide the variables you want to use.

**Important:** For WalletConnect v2, you need to obtain a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is a simple process with no waiting period. Every app needs its own unique Project ID to communicate via WalletConnect.

### Run Development Server

In the `example` directory, run:

`npm run dev` or `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

## Deployment

In the project directory, you can run:

`npm run build`

This builds the app for production to the `dist` folder.

It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

You can deploy the `dist` folder to any static host provider (e.g. Netlify).
