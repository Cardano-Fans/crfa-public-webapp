## Introduction

CRFA public webapp. It is Next.js application. Read more here: Next.README.md

```
yarn install --ignore-engines
```

Create .env.local file with the following content:

```
BLOCKFROST_MAINNET_KEY="KEY"
BLOCKFROST_MAINNET_URL="https://Cardano-mainnet.blockfrost.io/api/v0"

BLOCKFROST_TESTNET_KEY="KEY"
BLOCKFROST_TESTNET_URL="https://Cardano-testnet.blockfrost.io/api/v0"
PREDICTION_API_URL="https://europe-west2-cognitivo-ai.cloudfunctions.net/ada_price"
```

## Dev server

```
yarn dev
```

## Prod build

```
yarn build
yarn start
```

## Docker prod build

```
docker build . -t crfa-public-webapp
```

## Docker prod start

```
docker run -p 3000:3000 crfa-public-webapp
```

## Docker save and restore image

```
docker save -o crfa-public-webapp-latest.tar crfa-public-webapp:latest
```

transfer to webserver and restore:

```
docker load -i crfa-public-webapp-latest.tar
```

## Support / Donation
If you find this tool useful, you can donate any amount in ADA to the following Cardano address:
```
addr1qy05muetmauqfs992qd74scaeqzejjntaass68tyecfx247zddeldn7syvs5x2uvuefk66azhr7lelrj423lxapuxkks90meng
```
