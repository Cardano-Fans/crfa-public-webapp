import { useEffect, useState } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import Image from "next/image";
import { GithubButton, TwitterButton, TelegramButton } from './SocialButton'
import {
  SelectWalletModal,
  ConnectWallet,
  useRestoreWallet,
} from '@features/wallet'

export const Header: React.FC = () => {
  const [isSticky, setSticky] = useState(false)

  useRestoreWallet()

  useEffect(() => {
    const listener = () => {
      let value = window.scrollY

      if (value > 200) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', listener, { passive: true })

    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])

  return (
    <>
      <SelectWalletModal />

      <header className={cx('header', { 'sticky-header': isSticky })}>
        <div className="flex justify-between items-center mx-auto pl-6 lg:pl-6 pr-6 lg:pr-6">
          <nav className="flex justify-between items-center pt-2 pb-2 w-full">
            <Link href="/" className="logo-box flex items-center justify-center">
              <Image
                className="rounded-circle m-2"
                src={"/logo192.png"}
                width={48}
                height={48}
                alt="Cardano Fans Staking Pool - Logo"
              />
              <h5 className="c-white font-semibold">
                CARDANO <span className="c-main">FANS</span>
              </h5>
            </Link>
            <ul className="nav-list hidden lg:flex">
              <li className="nav-link">
                <Link href="/#about">Our Pool</Link>
              </li>
              <li className="nav-link">
                <Link href="/our-work">Showcase</Link>
              </li>
              <li className="nav-link">
                <Link href="/pool-stats">Pool Stats</Link>
              </li>
              <li className="nav-link">
                <Link href="/cardano-blockchain-insight">Blockchain Insights</Link>
              </li>
              <li className="nav-link">
                <Link href="/#news">News</Link>
              </li>
              <li className="nav-link">
                <a
                  href="https://cardano-fans.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li className="nav-link">
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
            <div className="hidden sm:flex lg:mr-0 items-center mr-6">
              <ConnectWallet />
            </div>
          </nav>
          <div className="mobile-nav lg:hidden">
            <div className="nav-hamburger">
              <input type="checkbox" aria-label="Toggle mobile navigation menu" />
              <span />
              <span />
              <span />

              <div className="menu-container">
                <div className="menu-row">
                  <div className="menu-box">
                    <ul className="menu-items">
                      <li className="menu-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="/#about">Our Pool</Link>
                      </li>
                      <li className="menu-item">
                        <a href="https://cardano.fans/our-work/">Showcase</a>
                      </li>
                      <li className="menu-item">
                        <Link href="/pool-stats">Pool Stats</Link>
                      </li>
                      <li className="menu-item">
                        <a href="https://cardano.fans/cardano-blockchain-insight/">
                          Cardano Blockchain Insights
                        </a>
                      </li>
                      <li className="menu-item">
                        <Link href="/#news">News</Link>
                      </li>
                      <li className="menu-item">
                        <a href="https://cardano-fans.medium.com">Blog</a>
                      </li>
                      <li className="menu-item">
                        <Link href="/#contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex lg:hidden items-center justify-between ml-8 mb-40 w-1/2">
                    <TelegramButton size="md" variant="secondary" />
                    <TwitterButton size="md" variant="secondary" />
                    <GithubButton size="md" variant="secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
