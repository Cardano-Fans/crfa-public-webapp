import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import cx from 'classnames'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { customScript } from '../legacy/custom-script'

const Home: NextPage = () => {
  useEffect(() => {
    customScript()
  }, [])

  return (
    <div>
      <Head>
        <title>Cardano Fans - CRFA: Cardano Fans Stacking Pool</title>
      </Head>

      <Header />

      <main>
        <section className="hero">
          <div id="wrapper">
            <canvas
              id="canvas"
              className="canvas"
              width={1680}
              height={939}
              style={{ opacity: '0.1' }}
            />
            <canvas
              id="canvasbg"
              className="canvasbg"
              width={1680}
              height={939}
            />
          </div>
          <div className="container mx-auto hero-container relative">
            <div className="flex flex-col-reverse lg:flex-row mx-auto">
              <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2">
                <h1
                  className="heading-hero text-center lg:text-left mb-12 aos-init aos-animate"
                  data-aos="fade-right"
                  data-aos-anchor-placement="top"
                >
                  <span>CARDANOFANS</span>
                  <br />
                  <br />
                  Staking Pool
                </h1>
                <a
                  href="#about"
                  className="btn rounded aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top"
                  data-aos-delay={350}
                >
                  <span className="btn-text-blended">View more</span>
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/2 mb-10 lg:mb-0">
                <img
                  className="w-1/2 lg:w-3/4 rounded-circle cardano-hero-logo aos-init aos-animate"
                  src="/cardano-white.png"
                  alt="Cardano Logo"
                  data-aos="zoom-in"
                />
              </div>
            </div>
          </div>
          <div className="custom-shape-divider-bottom-1634242204">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              />
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              />
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </section>
        <section id="about" className="about py-36">
          <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
            <h2 className="section-heading mb-10 aos-init" data-aos="fade-down">
              About our Pool
            </h2>
            <div className="lg:flex mx-auto">
              <div className="flex flex-col items-center justify-center p-8 w-full lg:w-1/2 relative">
                <div className="w-60 sm:w-72 md:w-96 h-60 sm:h-72 md:h-96 z-10 rounded-full bg-red absolute left-10"></div>
                <img
                  className="w-10/12 z-20 aos-init"
                  src="/stakepool-epoch.png"
                  alt=""
                  data-aos="zoom-in"
                />
              </div>
              <div className="flex items-center justify-center w-full lg:w-1/2">
                <div
                  className="swiper mySwiper w-full swiper-creative swiper-3d swiper-initialized swiper-horizontal swiper-pointer-events aos-init"
                  data-aos="fade-left"
                >
                  <div
                    className="swiper-wrapper"
                    id="swiper-wrapper-9a779acf302944ef"
                    aria-live="polite"
                  >
                    <div
                      className="swiper-slide swiper-slide-visible swiper-slide-active"
                      role="group"
                      aria-label="1 / 6"
                      style={{
                        width: 660,
                        zIndex: 6,
                        transform:
                          'translate3d(calc(0px), calc(0px), calc(0px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
                        opacity: 1,
                      }}
                    >
                      <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                        <h3 className="slide-card-title mb-6">Delegation</h3>
                        <p className="slide-card-content break-words uppercase mb-6">
                          OUR POOL ID:{' '}
                          <span id="poolId">
                            6C518B4861BB88B1395CEB116342CECBCFB8736282655F9A61C4C368
                          </span>
                          <br />
                          TICKER: CRFA
                          <br />
                          DELEGATE with any Cardano compatible wallet
                        </p>
                        <button id="copyId" className="btn-2">
                          Copy pool ID
                        </button>
                      </div>
                    </div>
                    <div
                      className="swiper-slide swiper-slide-next"
                      role="group"
                      aria-label="2 / 6"
                      style={{
                        width: 660,
                        zIndex: 5,
                        transform:
                          'translate3d(calc(-660px + 100%), calc(0px), calc(0px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
                        opacity: 1,
                      }}
                    >
                      <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                        <h3 className="slide-card-title mb-6">Fees / Pledge</h3>
                        <p className="slide-card-content">
                          0% FEES (PROMO UNTIL 5 MLN ADA), THEN 1.99% + 1M ADA
                          PLEDGE
                          <br />
                          <br />
                          LOW FEES AS WE STRONGLY BELIEVE IN ACCESSIBILITY TO
                          FINANCE FOR EVERYONE
                        </p>
                      </div>
                    </div>
                    <div
                      className="swiper-slide"
                      role="group"
                      aria-label="3 / 6"
                      style={{
                        width: 660,
                        zIndex: 4,
                        transform:
                          'translate3d(calc(-1320px + 100%), calc(0px), calc(0px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
                        opacity: 1,
                      }}
                    >
                      <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                        <h3 className="slide-card-title mb-6">Hardware</h3>
                        <p className="slide-card-content uppercase">
                          WE ARE RUNNING CARDANOFANS STAKING POOL ON BAREMETAL
                          WITH TWO RELAY NODES AND ONE BLOCK PRODUCING, LINK 200
                          MBIT
                          <br />
                          <br />
                          Baremetal stakepool with 200 Mbit fiber running on
                          Intel i3 and 2 x Intel i7 servers ( 3 x 16 GB RAM)
                        </p>
                      </div>
                    </div>
                    <div
                      className="swiper-slide"
                      role="group"
                      aria-label="4 / 6"
                      style={{
                        width: 660,
                        zIndex: 3,
                        transform:
                          'translate3d(calc(-1980px + 100%), calc(0px), calc(0px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
                        opacity: 1,
                      }}
                    >
                      <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                        <h3 className="slide-card-title mb-6">Monitoring</h3>
                        <p className="slide-card-content">
                          WE HAVE SETUP ADVANCED MONITORING WITH ALTERING IN
                          CASE THINGS GET PEAR SHAPED.
                        </p>
                      </div>
                    </div>
                    <div
                      className="swiper-slide"
                      role="group"
                      aria-label="5 / 6"
                      style={{
                        width: 660,
                        zIndex: 2,
                        transform:
                          'translate3d(calc(-2640px + 100%), calc(0px), calc(0px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
                        opacity: 1,
                      }}
                    >
                      <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                        <h3 className="slide-card-title mb-6">Operators</h3>
                        <p className="slide-card-content">
                          WELCOME TO CARDANOFANS CARDANO (CRFA) STAKE POOL. WE
                          ARE PROFESSIONAL STAKE POOL OPERATORS. WE HAVE BEEN
                          RUNNING LINUX SERVERS (BARE METAL, CLOUD) FOR OVER 15
                          YEARS NOW.
                        </p>
                      </div>
                    </div>
                    <div
                      className="swiper-slide"
                      role="group"
                      aria-label="6 / 6"
                      style={{
                        width: 660,
                        zIndex: 1,
                        transform:
                          'translate3d(calc(-3300px + 100%), calc(0px), calc(0px)) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
                        opacity: 1,
                      }}
                    >
                      <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                        <h3 className="slide-card-title mb-6">Involvement</h3>
                        <p className="slide-card-content">
                          WE STRONGLY BELIEVE THAT FINANCE SHOULD BE AVAILABLE
                          FOR EVERYONE NOT JUST PRIVILIGED ONES. THERE IS ABOUT
                          3 BLN PEOPLE THAT ARE CURRENTLY UNBANKED, CARDANO AIMS
                          TO CHANGE THIS AND WE WILL SUPPORT IT VIA RUNNING LOW
                          FEES STAKING POOL.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-bullets-dynamic"
                    style={{ width: 80 }}
                  >
                    <span
                      className="swiper-pagination-bullet swiper-pagination-bullet-active swiper-pagination-bullet-active-main"
                      style={{ left: 32 }}
                    />
                    <span
                      className="swiper-pagination-bullet swiper-pagination-bullet-active-next"
                      style={{ left: 32 }}
                    />
                    <span
                      className="swiper-pagination-bullet swiper-pagination-bullet-active-next-next"
                      style={{ left: 32 }}
                    />
                    <span
                      className="swiper-pagination-bullet"
                      style={{ left: 32 }}
                    />
                    <span
                      className="swiper-pagination-bullet"
                      style={{ left: 32 }}
                    />
                    <span
                      className="swiper-pagination-bullet"
                      style={{ left: 32 }}
                    />
                  </div>
                  <div className="swiper-buttons">
                    <div
                      className="swiper-button-prev mr-3 swiper-button-disabled"
                      tabIndex={-1}
                      role="button"
                      aria-label="Previous slide"
                      aria-controls="swiper-wrapper-9a779acf302944ef"
                      aria-disabled="true"
                    />
                    <div
                      className="swiper-button-next"
                      tabIndex={0}
                      role="button"
                      aria-label="Next slide"
                      aria-controls="swiper-wrapper-9a779acf302944ef"
                      aria-disabled="false"
                    />
                  </div>
                  <span
                    className="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="news" className="news py-36 mx-auto">
          <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
            <h2 className="section-heading mb-16 aos-init" data-aos="fade-down">
              News
            </h2>
          </div>
        </section>
        <section id="promotion" className="bg-dark py-36 mx-auto">
          <div className="container lg:flex flex-row gap-8 mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
            <div className="flex flex-col items-start justify-center w-full lg:w-1/2 mb-16 lg:mb-0">
              <h2
                className="section-heading mb-8 aos-init"
                data-aos="fade-down"
              >
                Promotion
              </h2>
              <p className="c-white mb-8">
                Loyality program for all who delegate your ADA Wallet to Cardano
                Fans
              </p>
              <a
                href="https://adapools.org/pool/6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368"
                target="_blank"
                className="btn rounded mt-10 aos-init"
                data-aos="fade-up"
                data-aos-delay={350}
                rel="noreferrer"
              >
                <span className="btn-text-blended">Get more details</span>
              </a>
            </div>
            <div
              className="flex flex-col items-center justify-center w-full lg:w-1/2 aos-init"
              data-aos="fade-left"
              data-aos-delay={400}
            >
              <div className="p-8 lg:p-14 rounded-md c-dark bg-main">
                Every epoch a raffle, 15 ADA will be distributed to a staker
                based on the following conditions:
                <ul style={{ listStyle: 'inside' }} className="mb-8">
                  <li>min 100 ADA staked</li>
                  <li>min 4 epochs staked</li>
                </ul>
                The longer you stake with CRFA the higher the chance to win.
              </div>
            </div>
          </div>
        </section>
        <section id="more" className="details py-36 mx-auto">
          <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
            <h2 className="section-heading mb-2 aos-init" data-aos="fade-down">
              Cardano Blockchain Insights
            </h2>
            <p
              className="c-white w-75 mb-16 aos-init"
              data-aos="fade-right"
              data-aos-delay={200}
            >
              Cardano Blockchain Insights contains of on chain and off chain
              metrics from a birds eye point of view evolution of Cardano
              project.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 mb-16">
              <div className="w-full lg:w-1/2">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ minHeight: 320 }}
                  frameBorder={0}
                  className="rounded-2 aos-init"
                  src="https://js.adapools.org/widget-dark.html?pool=6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368"
                  data-aos="zoom-in"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <a href="/cardano-blockchain-insight/">
                  <img
                    className="w-100 rounded-md aos-init"
                    src="/ada-fans-cardano.png"
                    alt="zoom in"
                    data-aos="zoom-in"
                  />
                </a>
              </div>
            </div>
            <a
              href="/cardano-blockchain-insight/"
              className="btn rounded mt-10 aos-init"
              data-aos="fade-up"
              data-aos-anchor-placement="top"
              data-aos-delay={350}
            >
              <span className="btn-text-blended">Get more details</span>
            </a>
          </div>
        </section>
        <section id="cardano" className="features py-36 mx-auto">
          <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
            <h2 className="section-heading mb-10 aos-init" data-aos="fade-down">
              About Cardano
            </h2>
            <div className="flex flex-col lg:flex-row items-stretch gap-8">
              <div
                className="features-card shadow-md rounded-md relative w-full lg:w-1/3 aos-init"
                data-aos="fade-right"
              >
                <img className="mb-3" src="/blockchain.png" alt="" />
                <h3 className="mb-3 features-card-title">Cryptocurrency</h3>
                <p className="features-card-content">
                  Cardano is a public blockchain and cryptocurrency project. It
                  requires decentralized node servers to validate and secure the
                  blockchain for all participants.
                </p>
              </div>
              <div
                className="features-card shadow-md rounded-md w-full lg:w-1/3 aos-init"
                data-aos="fade-right"
                data-aos-delay={200}
              >
                <img className="mb-3" src="/fintech.png" alt="" />
                <h3 className="mb-3 features-card-title">Earn</h3>
                <p className="features-card-content">
                  If you hold Ada (₳) cryptocurrency, you can participate in
                  this process and earn rewards by staking your Ada.
                </p>
              </div>
              <div
                className="features-card shadow-md rounded-md w-full lg:w-1/3 aos-init"
                data-aos="fade-right"
                data-aos-delay={400}
              >
                <img className="mb-3" src="/fingerprint.png" alt="" />
                <h3 className="mb-3 features-card-title ">Control</h3>
                <p className="features-card-content">
                  Your Ada remains within your complete control at all times and
                  you are still allowed to transfer, spend, or move your staking
                  delegation to another stake pool.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
