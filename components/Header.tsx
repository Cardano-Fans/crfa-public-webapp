export const Header: React.FC<{}> = () => {
  return (
    <header className="header relative">
      <div className="lg:container flex justify-between items-center mx-auto pl-6 lg:pl-0 pr-6 lg:pr-0">
        <nav className="flex justify-between items-center pt-2 pb-2 w-full">
          <a href="/">
            <div className="logo-box flex items-center justify-center">
              <img
                className="rounded-circle mr-8"
                style={{ width: 48, height: 48 }}
                src="https://cardano.fans/wp-content/uploads/2021/11/cropped-cardano.fans_.logo_.png"
                alt="Cardano Fans Staking Pool - Logo"
              />
              <h5 className="c-white font-semibold">
                CARDANO.<span className="c-main">FANS</span>
              </h5>
            </div>
          </a>
          <ul className="nav-list hidden lg:flex">
            <li className="nav-link">
              <a href="/#about">Our Pool</a>
            </li>
            <li className="nav-link">
              <a href="/#promotion">Promotion</a>
            </li>
            <li className="nav-link">
              <a href="/#cardano">Cardano</a>
            </li>
            <li className="nav-link">
              <a href="/cardano-blockchain-insight">Blockchain Insights</a>
            </li>
            <li className="nav-link">
              <a href="/#news">News</a>
            </li>
            <li className="nav-link">
              <a href="https://cardano-fans.medium.com/" target="_blank">
                Blog
              </a>
            </li>
            <li className="nav-link">
              <a href="/#contact">Contact</a>
            </li>
          </ul>
          <div className="hidden lg:flex items-center justify-between">
            <a href="https://t.me/freedom_cardano" className="social-link mr-4">
              <i
                className="fab fa-telegram-plane social-nav"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://twitter.com/matiwinnetou"
              className="social-link mr-4"
            >
              <i className="fab fa-twitter social-nav" aria-hidden="true" />
            </a>
            <a href="https://github.com/Cardano-Fans" className="social-link">
              <i className="fab fa-github social-nav" aria-hidden="true" />
            </a>
          </div>
        </nav>
        <div className="mobile-nav lg:hidden">
          <div className="nav-hamburger">
            <input type="checkbox" />
            <span className="line line-1" />
            <span className="line line-2" />
            <span className="line line-3" />
            <div className="menu-container">
              <div className="menu-row">
                <div className="menu-box">
                  <ul id="menu-mobile-menu" className="menu-items">
                    <li
                      id="menu-item-28"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-28"
                    >
                      <a href="https://cardano.fans/" aria-current="page">
                        Home
                      </a>
                    </li>
                    <li
                      id="menu-item-29"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-29"
                    >
                      <a href="/#about" aria-current="page">
                        Our Pool
                      </a>
                    </li>
                    <li
                      id="menu-item-30"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-30"
                    >
                      <a href="/#cardano" aria-current="page">
                        Cardano
                      </a>
                    </li>
                    <li
                      id="menu-item-27"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-27"
                    >
                      <a href="https://cardano.fans/cardano-blockchain-insight/">
                        Cardano Blockchain Insights
                      </a>
                    </li>
                    <li
                      id="menu-item-42"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-42"
                    >
                      <a href="/#news" aria-current="page">
                        News
                      </a>
                    </li>
                    <li
                      id="menu-item-31"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-31"
                    >
                      <a href="https://cardano-fans.medium.com/">Blog</a>
                    </li>
                    <li
                      id="menu-item-32"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-32"
                    >
                      <a href="/#contact" aria-current="page">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex lg:hidden items-center justify-between ml-8 mb-40 w-1/2">
                  <a
                    href="https://t.me/freedom_cardano"
                    className="social-link mr-4"
                  >
                    <i
                      className="fab fa-telegram-plane social-nav"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="https://twitter.com/matiwinnetou"
                    className="social-link mr-4"
                  >
                    <i
                      className="fab fa-twitter social-nav"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="https://github.com/Cardano-Fans"
                    className="social-link"
                  >
                    <i
                      className="fab fa-github social-nav"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
