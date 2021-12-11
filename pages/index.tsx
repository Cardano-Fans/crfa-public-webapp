import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'
import { Hero } from '../components/home/Hero/Hero'
import { AboutPool } from '../components/home/about-pool/AboutPool'
import { AboutCardano } from '../components/home/AboutCardano'
import { News } from '../components/home/News'
import { Promotion } from '../components/home/Promotion'
import { BlockchainInsights } from '../components/home/BlockchainInsights'

import { useAOS } from '../hooks/useAOS'

const Home: NextPage = () => {
  useAOS()

  return (
    <div>
      <Head>
        <title>Cardano Fans - CRFA: Cardano Fans Stacking Pool</title>
      </Head>

      <Header />

      <main>
        <Hero />

        <AboutPool />

        <News />

        <Promotion />

        <BlockchainInsights />

        <AboutCardano />
      </main>

      <Footer />
    </div>
  )
}

export default Home
