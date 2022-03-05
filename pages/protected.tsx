import type { NextPage } from 'next'
import Head from 'next/head'
import { useWallet } from '@features/wallet'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'
import { useAOS } from '../hooks/useAOS'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useAOS()

  const { hasPremiumAccess, checkPremiumAccessByToken } = useWallet()

  useEffect(() => {
    checkPremiumAccessByToken()
  }, [])

  return (
    <div>
      <Head>
        <title>Cardano Fans - CRFA: Cardano Fans Staking Pool</title>
      </Head>

      <Header />

      <section className="default-page container mx-auto relative overflow-hidden pt-60 pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h1 className="text-lg c-white mb-16" data-aos="fade-down">
          Protected page
        </h1>

        {hasPremiumAccess ? (
          <div className="text-9xl font-extrabold tracking-widest text-white">
            Premium content
          </div>
        ) : (
          <div className="text-white">
            This is premium content, to access you should buy CRFA token.
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Home
