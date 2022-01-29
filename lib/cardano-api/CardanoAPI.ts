import { Commands } from './Commands'
import type * as CardanoSerializationLibrary from '@emurgo/cardano-serialization-lib-browser'
import * as buffer from 'buffer'

type Plugin = { name: string; exec: object }

export type Configure = {
  plugins: Plugin[]
  cardanoSerializationLibrary: typeof CardanoSerializationLibrary
  wallet: any
}

declare let window: any

export const CardanoAPIExperimental = async (configure: Configure) => {
  const API = CardanoAPIObject
  await API.register(configure)
  return API
}

export const CardanoAPIObject = {
  extendedApi: null,
  _wallet: null,
  get wallet(): any {
    if (this._wallet) {
      return this._wallet
    }
    throw new Error('window.cardano() is not injected by the user')
  },
  _serializationLib: undefined as
    | undefined
    | typeof CardanoSerializationLibrary,
  get serializationLib(): typeof CardanoSerializationLibrary {
    if (this._serializationLib) {
      return this._serializationLib
    }
    throw new Error(
      'You must initialize one of @emurgo/cardano-serialization-library'
    )
  },
  set serializationLib(serializationLib: typeof CardanoSerializationLibrary) {
    if (serializationLib) {
      this._serializationLib = serializationLib
      return
    }
    throw new Error(`cardanoSerializationLib is invalid. Please initalize 
    one of @emurgo/cardano-serialization-library`)
  },
  buffer: buffer.Buffer,
  plugins: {},
  _addressReturnType: {
    hex: 'hex',
    bech32: 'bech32',
  },
  get addressReturnType(): { hex: string; bech32: string } {
    return this._addressReturnType
  },
  baseCommands: Commands,
  async register(configuration: Configure): Promise<void> {
    // Checks for a valid config file
    if (!Array.isArray(configuration.plugins)) {
      throw new Error('Registered plugins must be an array.')
    }
    if (!configuration.cardanoSerializationLibrary) {
      throw new Error(
        'You must include one of the @emurgo/cardano-serialization-library'
      )
    }
    // Sets a list of plugins
    configuration.plugins.forEach((plugin) => {
      if (!plugin.name || typeof plugin.name !== 'string') {
        throw new Error(`Plugin: ${plugin.toString()} name must be a string.`)
      }
      if (!plugin.exec || typeof plugin.exec !== 'object') {
        throw new Error(
          `Plugin: ${plugin.toString()} name must use object notation for exec.`
        )
      }
      const obj = { [plugin.name]: plugin.exec }
      Object.assign(this.plugins, obj)
    })
    // Sets serialization Library
    this.serializationLib = configuration.cardanoSerializationLibrary

    // Sets the wallet
    this._wallet = window.cardano[configuration.wallet]
  },
}

export const errorIfUndefined = <T>(item: T | undefined): T => {
  if (!item) {
    throw new Error('Value is undefined')
  }
  return item
}
