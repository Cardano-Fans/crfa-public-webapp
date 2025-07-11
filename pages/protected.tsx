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
        <title>ADA Price Prediction | Premium Cardano Analytics | Cardano Fans</title>
        <meta name="description" content="Access premium ADA price predictions and advanced Cardano analytics. Exclusive insights for CRFA token holders and pool delegators." />
        <meta name="keywords" content="ADA price prediction, cardano analytics, premium content, CRFA token, cardano forecasting" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Premium ADA Price Prediction | Cardano Analytics" />
        <meta property="og:description" content="Exclusive ADA price predictions and advanced Cardano analytics for token holders and delegators." />
        <meta property="og:image" content="https://cardano.fans/logo192.png" />
        <meta property="og:url" content="https://cardano.fans/protected" />
        <meta property="og:type" content="website" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://cardano.fans/protected" />
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
