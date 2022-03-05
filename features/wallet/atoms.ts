import { atom } from 'jotai'

const atomWithLocalStorage = (key: string, initialValue: any) => {
  const getInitialValue = () => {
    try {
      const item = localStorage.getItem(key)
      if (item !== null) {
        return JSON.parse(item)
      }
      return initialValue
    } catch (e) {
      return initialValue
    }
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}

export const walletAtom = atomWithLocalStorage('wallet', null)
export const walletStatusAtom = atom('disconnected')
export const premiumAccessAtom = atom(false)
export const selectWalletModalAtom = atom(false)
export const donateModalAtom = atom(false)
