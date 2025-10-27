# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CRFA (Cardano Reserve and Forward Application) Public Webapp - A Next.js 15 application for Cardano stake pool operations, featuring wallet integration, delegation, donations, and token-gated premium content.

## Setup Commands

```bash
# Installation (note: uses yarn, not npm)
yarn install --ignore-engines

# Development server
yarn dev

# Production build
yarn build
yarn start

# Linting
yarn lint
```

### Environment Setup

Create `.env.local` with:
```
BLOCKFROST_MAINNET_KEY="your-key"
BLOCKFROST_MAINNET_URL="https://cardano-mainnet.blockfrost.io/api/v0"
BLOCKFROST_TESTNET_KEY="your-key"
BLOCKFROST_TESTNET_URL="https://cardano-testnet.blockfrost.io/api/v0"
PREDICTION_API_URL="https://europe-west2-cognitivo-ai.cloudfunctions.net/ada_price"
```

### Docker Commands

```bash
# Build image
docker build -t crfa-public-webapp .

# Run container
docker run -p 3000:3000 crfa-public-webapp

# Save/load image for deployment
docker save -o crfa-public-webapp-latest.tar crfa-public-webapp:latest
docker load -i crfa-public-webapp-latest.tar
```

## Architecture Overview

### State Management - Hybrid Approach

**Jotai (Atomic State)** - Primary state store in `/features/wallet/atoms.ts`:
- `walletAtom` - Wallet connection state (persisted to localStorage via custom `atomWithLocalStorage`)
- `walletStatusAtom` - Connection status tracking
- `premiumAccessStatusAtom` - Token-gated content access control
- Modal atoms for wallet selection and donations

**PubSub (Event Bus)** - Decoupled event-driven communication:
- `'wallet.connected'` - Published after successful wallet connection
- `'donation.confirmed'` - Published when user confirms donation amount
- Pattern: Enables modal flows to operate independently of wallet state restoration

**Note**: XState is in dependencies but not actively used (legacy).

### Cardano Integration - Three-Layer Plugin Architecture

**Layer 1: CardanoAPI Core** (`/lib/cardano-api/CardanoAPI.ts`)
- Central abstraction over wallet extensions accessed via `window.cardano[walletKey]`
- Manages Cardano serialization library and buffer utilities
- Provides plugin registration system

**Layer 2: Plugin System**
- **Blockfrost Plugin** (`/lib/cardano-api/Blockfrost.ts`): Proxies requests to `/api/blockfrost/[...path]` backend endpoint for blockchain queries
- **Spend Plugin** (`/lib/cardano-api/Spend.ts`): Implements transaction building (`send()`, `sendMultiple()`, `delegate()`), UTxO selection via randomImprove algorithm, fee calculation, and change handling

**Layer 3: Base Commands** (`/lib/cardano-api/Commands.ts`)
- Direct CIP-30 wallet API wrappers: `enable()`, `getBalance()`, `getUtxos()`, `signTx()`, `submitTx()`

### Supported Wallets

Defined in `/shared/config.ts`:
- Eternl (`eternl`)
- Typhon (`typhoncip30`)
- Lace (`lace`)
- Yoroi (`yoroi`)

### API Routes & Integrations

**Blockfrost Proxy** - `/pages/api/blockfrost/[...path].ts`
- Security pattern: Hides API keys from client, enables CORS bypass
- Forwards all requests to Blockfrost API with authentication

**Price Prediction** - `/pages/api/price-prediction.ts`
- Fetches ADA price predictions from external ML service
- Token-gated: Only accessible to users holding CRFA access token

**Medium Blog** - `/pages/api/medium-posts.ts`
- Uses `meed` library to scrape Medium RSS feed from `@cardano-fans`
- Extracts featured images via cheerio DOM parsing

### Key User Flows

**Wallet Connection Flow:**
1. User clicks connect → `SelectWalletModal` opens
2. `useWallet.connectWallet()` → `waitForExtension()` → `CardanoAPI.register()` → `CardanoAPI.baseCommands.enable()`
3. Balance/address fetched and stored in `walletAtom` (persisted to localStorage)
4. `'wallet.connected'` event published

**Delegation Flow:**
1. `DelegateButton` → `useWallet.delegate()`
2. Checks wallet connected; if not, waits for `'wallet.connected'` event
3. `CardanoAPI.plugins.spend.delegate()` queries pool hex via Blockfrost
4. Builds transaction with stake registration + delegation certificates
5. Signs & submits via wallet, shows toast notification
6. **Target Pool**: `6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c468` (mainnet CRFA)

**Donation Flow:**
1. `DonateButton` → opens `DonationModal`
2. User confirms amount → `'donation.confirmed'` event published
3. `CardanoAPI.plugins.spend.send()` sends ADA with metadata `{ label: '674', msg: ['CBI'] }`
4. **Donation Address**: `addr1q8nq8wdhrpq402qj4hyn5rxn624l0ccua8k3epl2xl3fz57zddeldn7syvs5x2uvuefk66azhr7lelrj423lxapuxkksknwfdj` (mainnet)

**Premium Content Access:**
1. `/protected` page → `useWallet.checkPremiumAccessByToken()`
2. Queries reward address assets via `CardanoAPI.plugins.spend.getAssets()`
3. Checks for CRFA token: `5ffd4803f2d1352196d6cf80c254712199b814d945a84393f24eeca443524641`
4. Updates `premiumAccessStatusAtom`, conditionally renders `PricePrediction` component

### Transaction Building

**UTxO Selection** (`/lib/cardano-api/SelectCoin.ts`):
- Implements `randomImprove` algorithm (Cardano best practice)
- Respects protocol parameters from Blockfrost (`/epochs/{epoch}/parameters`)
- Handles multi-asset scenarios and change splitting

**Transaction Flow**:
1. Fetch protocol parameters → 2. Get UTxOs → 3. Select via randomImprove → 4. Build inputs/outputs → 5. Add certificates/metadata → 6. Calculate fees → 7. Add change → 8. Sign → 9. Submit

### Path Aliases

Configured in `tsconfig.json`:
- `@lib/*` → `/lib/*`
- `@components/*` → `/components/*`
- `@features/*` → `/features/*`
- `@shared/*` → `/shared/*`

### Webpack Configuration

`next.config.js` enables WebAssembly support for Cardano serialization library:
- `asyncWebAssembly: true` - Required for `@emurgo/cardano-serialization-lib-browser`
- `topLevelAwait: true` - Enables async WASM initialization
- Remote image patterns allowed: Medium CDN domains

### Project Structure

```
/pages                  - Next.js pages and API routes
  /api                  - Backend endpoints (Blockfrost proxy, price prediction, Medium)
/features               - Feature-specific logic (wallet atoms, hooks)
/components             - React components
  /home                 - Homepage-specific components
  /shared               - Global/reusable components
  /protected            - Premium content components
/lib                    - Core libraries
  /cardano-api          - Cardano integration layer (CardanoAPI, plugins, commands)
/hooks                  - Custom React hooks
/utils                  - Utility functions (SelectCoin algorithm)
/shared                 - Configuration (wallets, access tokens)
/styles                 - Global CSS/Tailwind
/public                 - Static assets
```

## Development Guidelines

### Working with Cardano Transactions

- All transaction building goes through `CardanoAPI.plugins.spend`
- Always fetch fresh protocol parameters before building transactions
- Use `randomImprove` for UTxO selection - don't implement custom selection without justification
- Test transactions on testnet before mainnet deployment

### State Management Patterns

- Use Jotai atoms for global state that needs persistence or cross-component access
- Use PubSub events for decoupled communication between features
- Never directly mutate `walletAtom` - always use `useWallet` hook methods

### API Development

- Backend API routes should proxy external calls to hide credentials
- Always validate environment variables on API route initialization
- Use TypeScript for type safety on API responses

### Component Development

- Use Tailwind classes for styling
- Leverage Headless UI for accessible modal/popover patterns
- Use Next.js `Image` component for optimized image loading
- Follow existing patterns: separate container components from presentational components

## Common Issues

### Wallet Connection
- Extension detection: Use `waitForExtension()` utility - wallet extensions inject asynchronously
- LocalStorage persistence: Wallet state auto-restores on page load via `atomWithLocalStorage`

### Transaction Building
- WASM errors: Ensure `asyncWebAssembly` is enabled in webpack config
- Fee calculation: Always call `fixFee()` after initial transaction build
- Change output: May need splitting if value exceeds size limits (handled automatically)

### Premium Content
- Token check uses **reward address**, not payment address
- Access token is the concatenation of policyId + assetName (no separator)

## Testing

No test suite currently configured. When adding tests:
- Consider integration tests for transaction building
- Mock wallet extensions for component tests
- Use testnet environment variables for API tests
