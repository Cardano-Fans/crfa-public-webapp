import { Fragment } from 'react'
import { faWallet, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, Transition } from '@headlessui/react'
import { useWallet } from '../useWallet'

function shortenAddress(address: string = '') {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

function formatBalance(balance: number) {
  return (Number(balance) / 1000000).toFixed(2) + ' ₳'
}

//@ts-ignore
export const ConnectWallet = (props) => {
  const { wallet, status, selectWallet, disconnectWallet } = useWallet()

  return (
    <div {...props}>
      {status === 'connected' && (
        <Popover className="relative">
          <Popover.Button>
            <div className="flex items-center relative">
              <div className="flex items-center z-10 p-3 bg-slate-900 text-primary rounded-full border-2 border-primary">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <div className="bg-slate-200/20 hover:bg-slate-200/25 transition-all  text-slate-200 pl-4 pr-3 rounded-l-none rounded-3xl  py-1 -ml-2 flex items-center tracking-wider">
                {shortenAddress(wallet.address)}

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-3"
                  size="sm"
                />
              </div>
            </div>
          </Popover.Button>

          <Popover.Panel className="absolute z-10">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-900 text-slate-200 p-7 border border-slate-800">
                  <div className="flex justify-between mb-3">
                    <div className="font-medium">Connected to:</div>
                    <div>{wallet.walletKey}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Balance:</div>
                    <div>{formatBalance(wallet.balance)}</div>
                  </div>
                  <div className="flex justify-center mt-4 border-t border-t-slate-800 pt-4">
                    <button
                      className="text-primary font-medium"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover.Panel>
        </Popover>
      )}

      {status === 'disconnected' && (
        <button className="btn-secondary" onClick={selectWallet}>
          <FontAwesomeIcon icon={faWallet} className="mr-1 text-slate-300" />{' '}
          Connect Wallet
        </button>
      )}
    </div>
  )
}
