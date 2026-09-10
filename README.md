# Telegram Web3 Mini App

Portfolio showcase of a Telegram Web3 Mini App frontend. The project keeps the original app structure, UI flows, wallet connection screens, NFT mining demo screens, tokenomics page, theme setup, and Telegram Mini App browser integration, but all production details have been replaced with local demo data.

## Demo Mode

This repository is safe to run locally and does not call production APIs, payment providers, backend endpoints, or live smart contracts. NFT verification, mining, rewards, transfers, and purchase flows are handled by the mock layer in `src/lib/demo-api.ts`. Wallet authorization uses TON Connect.

When opened inside Telegram, the app uses `window.Telegram.WebApp` if available. In a normal browser, it falls back to browser demo mode.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo Credentials

No login, OTP, or seed phrase is required by the app. Use any TON Connect compatible wallet for authorization.

## Scripts

```bash
npm run build
npm run lint
```


