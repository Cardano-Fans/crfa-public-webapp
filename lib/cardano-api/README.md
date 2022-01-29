# Cardano API
This is the Cardano API package inside the chain-lib monorepo. 

## Installation
To install run:
### yarn
```bash
yarn install @chain-lib/cardano-api
```
### npm
```bash
npm install @chain-lib/cardano-api
```
## Usage
Right now you can only initalize the package once, and then you can use your initial settings anywhere in your code. Below is an example using nami wallet api.
```javascript
import { CardanoAPI } from @chain-lib/cardano-api

const emurgoSerializationLib = await import('@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js');

const API = CardanoAPI;
await API.register({
    plugins : [],
    cardanoSerializationLibrary : emurgoSerializationLib
}),

```

**plugins** This accepts a list of plugins that work with the API. Default plugins will be discussed toward the bottom.

**cardanoSerializationLibrary** This accepts an async import of one of emurgos serialization libraries as an input. You can find them attached [here](https://www.npmjs.com/package/@emurgo/cardano-serialization-lib-browser). You can accept any of these as your input, just make sure you use the right ones for your use case.

## Development
Due to how the serization libraries work, you currently need to compile your code to es2017, and you need a few special rules. Specifically you need topLevelAwait by default. If you use emurgos WASM library you need asyncWebAssembly. Their libraries only seem to work well natively, with webpack, and eslint.

## Usage
These commands are organized as follows. Remember API is the initalized object from earlier.
### API.baseCommands
These commands follow the basic CIP[https://github.com/cardano-foundation/CIPs/pull/88] standard. All functions are promises. 

```javascript
CardanoAPI.baseCommands.enable: () => Promise<Boolean>;
```
If the user has one of the wallets references when constructing CardanoAPI this will ask the user to connect to the website for the first time, and retruns true. Otherwise it will throw an error. If they already have permision it will return true.

```javascript
CardanoAPI.baseCommands.isEnabled: () => Promise<Boolean>;
```
This returns true if the user has access to request the website, false otherwise.
```javascript
CardanoAPI.baseCommands.getBalance: () => Promise<Value>;
```
Value is a hex encoded cbor string.
```javascript
getUtxos: (amount?: Value | undefined, paginate?: {page: number; limit: number;} | undefined) => Promise<Array<TransactionUnspentOutput>>;
```
TransactionUnspentOutput is a hex encoded bytes string. Amount and paginate are optional parameters. They are meant to filter the utxos of the wallet.
```javascript
CardanoAPI.baseCommands.getCollateral: () => Promise<TransactionUnspentOutput>;
```
This will get the users smart contract collateral.
```javascript
CardanoAPI.baseCommands.getUnusedAddresses: (type?: string | undefined) => Promise<Array<BaseAddress>>;
CardanoAPI.baseCommands.getUsedAddresses: (type?: string | undefined) => Promise<Array<BaseAddress>>;
CardanoAPI.baseCommands.getChangeAddress: (type?: string | undefined) => Promise<BaseAddress>;
CardanoAPI.baseCommands.getRewardAddress: (type?: string | undefined) => Promise<RewardAddress>;
```
By default BaseAddress and RewardAddress will return by default a hex encoded bytes string. You have the option to return a bech32 (human readable) address with the type field. The accepted types are 'hex' or 'bech32'. You can also get theses types by using CardanoAPI.AddressReturnType.hex or CardanoAPI.AddressReturnType.bech32.
```javascript
CardanoAPI.baseCommands.getNetworkId: () => Promise<number>;
```
Returns 0 if on testnet, otherwise 1 if on mainnet.

```javascript
CardanoAPI.baseCommands.signData: (address: BaseAddress | RewardAddress, payload: string) => Promise<CoseSign1>;
```
Payload is a hex encoded utf8 string. CoseSign1 is a hex encoded bytes string.

If address is the BaseAddress the signature is returned with the Payment Credential, otherwise if the address is the RewardAddress the signature is returned with the Stake Credential.

The returned CoseSign1 object contains the payload, signature and the following protected headers:

key_id => PublicKey,
address => BaseAddress | RewardAddress
algorithm_id => EdDSA(0) (the algorithm used for Cardano addresses).
```javascript
CardanoAPI.baseCommands.signTx: (tx: Transaction, partialSign?: boolean | undefined) => Promise<TransactionWitnessSet>;
```
Transaction is a hex encoded cbor string. TransactionWitnessSet is a hex encoded cbor string.

partialSign is by default false and optional. The wallet needs to provide all required signatures. If it can't an error is thrown, otherwise the TransactionWitnessSet is returned.

If partialSign is true, the wallet doesn't need to provide all required signatures.
```javascript
CardanoAPI.baseCommands.submitTx: (tx: Transaction) => Promise<hash32>;
```
Returns the transaction hash, if transaction was submitted successfully, otherwise throws an error.

# Default Plugins

## Blockfrost
This plugin is for getting external data from the blockchain. Its namespace is data. If you make a plugin with the name data, and another plugin uses it, you can get offchain data using your api as opposed to this one. This currently allows you to make api calls based on a variable for ipfs, otherwise it will check the user, and check if they are using the testnet or the mainnet and make the appropriate api call. You do not need every key, primarily mainnet / testnet depending on what your application is doing. Please do not hard code your api keys. Use environmental variables.

```javascript
import { CardanoAPI, Blockfrost } from @chain-lib/cardano-api;

const emurgoSerializationLib = await import('@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js');

const API = CardanoAPI;
await API.register({
    plugins : [Blockfrost({
        mainnet : mainnetKey,
        testnet : testnetKey,
        ipfs : ipfsKey
    })],
    cardanoSerializationLibrary : emurgoSerializationLib
}),
```
## Spend

In order to use this plugin you must also intialize the blockfrost plugin as well. Se setup below.
```javascript
import { CardanoAPI, Blockfrost, Spend } from @chain-lib/cardano-api;

const emurgoSerializationLib = await import('@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js');
const API = CardanoAPI;
await API.register({
    plugins : [
        Blockfrost({
            mainnet : mainnetKey,
            testnet : testnetKey,
            ipfs : ipfsKey
        }),
        Spend()
    ],
    cardanoSerializationLibrary : emurgoSerializationLib
}),
```

### 
```javascript
CardanoAPI.plugins.spend.send: ({ address, amount, assets, metadata, metadataLabel }) => Promise<string>;
```
This allows you to send items from the users address to another address. Some examples are below. Adderess is a human readable bech32 address. Amount is a number which is in ADA. The value is not in lovelace, the value is in **ADA**. Metadatalabel is a number, with a default to 721. 
```javascript
await CardanoAPI.plugins.spend.send({
        address: "addr1qyzu9rqav3su8duqwz8eadj60 5ldx3qcpfm0e4epc3rffmw09arg9qq Hqd7hlrg64xp5uwmqry3h24np7xqfcXy09gtqh228zy",
        amount: 40
      })
    

await CardanoAPI.plugins.spend.send({
    address: "addr1qyzu9rqav3su8duqwz8eadj60 5ldx3qcpfm0e4epc3rffmw09arg9qq Hqd7hlrg64xp5uwmqry3h24np7xqfcXy09gtqh228zy",
    amount: 20,
    assets: [
        {
            "unit": "5230d16116431597796d250dcd7acf1e3afb717bf66c8108abdc83df.KnittieAstro031",
            "quantity": "1"
        }
    ],
    metadata: {
        "RandomData": "My random metadata"
    }
})
```
```javascript
CardanoAPI.plugins.spend.sendMultiple: ({ recipients, metadata, metadataLabel }: SendMultiple) => Promise<string>;
```
You can also send to multiple users with one command. See an example below.
```javascript
await CardanoAPI.plugins.spend.sendMultiple({
    recipients: [
        {
            address: "",
            amount: 5,
            assets: [
                {
                    "unit": "",
                    "quantity": "1"
                }
            ]
        },
        {
            address: "",
            amount: 47
        },
        {
            address: "",
            amount: 22
        }
    ],
})
```
```javascript
CardanoAPI.plugins.spend.delegate: ({ stakepoolId, metadata, metadataLabel }: Delegate) => Promise<string>;
```
This allows you to let the user stake with any stakepool. Currently due to some errors not related to this API, there is a chance this never resolves if the user cancels the transaction. Otherwise it will return the transaction hash. You can ignore the metadata and metadataLabel tag. StakepooId can either be the hex32 or bech stakepool address.
