import { CardanoAPIObject } from './CardanoAPI'

export const Blockfrost = (config: {
  mainnet?: string
  testnet?: string
  ipfs?: string
}) => {
  if (!config) {
    throw new Error(
      'You must have a config file with either mainnet or testnet for this to work'
    )
  }
  if (config.mainnet || config.testnet || config.ipfs) {
    return {
      name: 'data',
      exec: {
        request: async (
          endpoint: string,
          type?: string,
          ipfs?: boolean
        ): Promise<any> => {
          if (!type) {
            type = 'get'
          }
          const networkEndpoint = ipfs
            ? 'https://ipfs.blockfrost.io/api/v0'
            : (await CardanoAPIObject.baseCommands.getNetworkId()) == 0
            ? 'https://Cardano-testnet.blockfrost.io/api/v0'
            : 'https://Cardano-mainnet.blockfrost.io/api/v0'

          const apiKey = ipfs
            ? config.ipfs
            : (await CardanoAPIObject.baseCommands.getNetworkId()) == 0
            ? config.testnet
            : config.mainnet

          if (!apiKey) {
            throw new Error('That api key does not exist on type config')
          }

          const address = `${networkEndpoint}${endpoint}`

          const response = await fetch(address, {
            headers: { 'Content-Type': 'application/json', project_id: apiKey },
            //@ts-ignore
            method: type,
          })
            .then((r) => r.json())
            .catch((e: any) => Promise.reject(e))

          return response
        },
      },
    }
  }
  throw new Error('Blockfrost plugin not loading. It likely has a bad config.')
}
