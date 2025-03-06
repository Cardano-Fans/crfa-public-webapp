import NextImage from 'next/image'
import { faWallet, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { config } from '@shared/config'
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
          <PopoverButton>
            <div className="flex items-center relative">
              <div className="flex items-center z-10 p-3 bg-slate-900 text-primary rounded-full border-2 border-primary">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <div
                className="bg-slate-200/20 hover:bg-slate-200/25 transition-all  text-slate-200 pl-4 pr-3 rounded-l-none rounded-3xl  py-1 -ml-2 flex items-center tracking-wider"
                title={wallet.address}
              >
                {shortenAddress(wallet.address)}

                <div className="ml-2 flex items-center bg-white/90 rounded-full p-[2px]">
                  <NextImage
                    style={{ objectFit: 'contain' }}
                    className=""
                    height={22}
                    width={22}
                    //@ts-ignore
                    src={config.wallets[wallet.walletKey].logo}
                    alt=""
                  />
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ml-3"
                  size="sm"
                />
              </div>
            </div>
          </PopoverButton>

          <PopoverPanel
            transition
            className="absolute z-10 w-screen max-w-sm px-4 mt-3 transition duration-200 ease-in-out transform -translate-x-1/2 left-1/2"
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-900 text-slate-200 p-7 border border-slate-800">
              <div className="flex justify-between mb-3">
                <div className="font-medium">Connected to:</div>
                <div className="flex items-center">
                  <div className="mr-2 flex items-center bg-white/90 rounded-full p-[2px]">
                    <NextImage
                      style={{ objectFit: 'contain' }}
                      className=""
                      height={22}
                      width={22}
                      //@ts-ignore
                      src={config.wallets[wallet.walletKey].logo}
                      alt=""
                    />
                  </div>
                  {/*@ts-ignore*/}
                  {config.wallets[wallet.walletKey].name}
                </div>
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
          </PopoverPanel>
        </Popover>
      )}

      {status === 'disconnected' && (
        <button className="btn-secondary" onClick={selectWallet}>
          <FontAwesomeIcon icon={faWallet} className="mr-1 text-slate-300" />{' '}
          Connect Wallet
        </button>
      )}

      {status === 'connecting' && (
        <button className="btn-secondary">
          <FontAwesomeIcon icon={faWallet} className="mr-1 text-slate-300" />{' '}
          Connecting...
        </button>
      )}
    </div>
  )
}
