import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useWallet } from '@features/wallet'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'
import { PricePrediction } from '@components/protected/PricePrediction'
import { WalletConnectionSkeleton } from '../components/shared/LoadingSkeleton'
import { useAOS } from '../hooks/useAOS'

const Home: NextPage = () => {
  useAOS()

  const { checkPremiumAccessByToken, premiumAccessStatus } = useWallet()

  useEffect(() => {
    checkPremiumAccessByToken()
  }, [checkPremiumAccessByToken])

  return (
    <div>
      <Head>
        <title>Cardano Fans - CRFA: Cardano Fans Staking Pool</title>
      </Head>

      <Header />

      <section className="default-page container mx-auto relative overflow-hidden pt-60 pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h1 className="text-5xl c-white mb-16" data-aos="fade-down">
          ADA Price Prediction
        </h1>

        {(premiumAccessStatus === 'unknown' ||
          premiumAccessStatus === 'checking') && (
          <WalletConnectionSkeleton />
        )}

        {premiumAccessStatus === 'granted' && <PricePrediction />}

        {premiumAccessStatus === 'denied' && (
          <div className="text-white">
            This is premium content. To access it, you need a CRFA token.
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Home
