import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'
import { Hero } from '../components/home/Hero/Hero'
import { AboutPool } from '../components/home/about-pool/AboutPool'
import { AboutCardano } from '../components/home/AboutCardano'
import { News } from '../components/home/News'
import { BlockchainInsights } from '../components/home/BlockchainInsights'

import { useAOS } from '../hooks/useAOS'

const Home: NextPage = () => {
  useAOS()

  return (
    <div>
      <Head>
        <title>Cardano Fans - CRFA: Cardano Fans Staking Pool</title>
      </Head>

      <Header />

      <main>
        <Hero />

        <AboutPool />

        <News />

        <BlockchainInsights />

        <AboutCardano />
      </main>

      <Footer />
    </div>
  )
}

export default Home
