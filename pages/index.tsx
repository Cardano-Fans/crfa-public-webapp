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
        <title>Cardano Fans Staking Pool - 1.99% Fees | Professional ADA Staking | CRFA</title>
        <meta name="description" content="Stake your ADA with Cardano Fans pool. Only 1.99% fees, 10k pledge, 99.9% uptime. Professional operators with 15+ years experience. Join 1000+ delegators today!" />
        <meta name="keywords" content="cardano staking, ada staking pool, cardano fans, CRFA, low fees, stake pool operator, ADA delegation" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Cardano Fans Staking Pool - Low Fees, High Performance" />
        <meta property="og:description" content="Professional Cardano staking pool with 1.99% fees, 10k ADA pledge, and 15+ years server management experience." />
        <meta property="og:image" content="https://cardano.fans/logo192.png" />
        <meta property="og:url" content="https://cardano.fans/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cardano Fans" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@matiwinnetou" />
        <meta name="twitter:title" content="Cardano Fans Staking Pool" />
        <meta name="twitter:description" content="Professional Cardano staking pool with low fees and high performance" />
        <meta name="twitter:image" content="https://cardano.fans/logo192.png" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://cardano.fans/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cardano Fans",
              "url": "https://cardano.fans",
              "logo": "https://cardano.fans/logo192.png",
              "description": "Professional Cardano staking pool with 1.99% fees, 10k ADA pledge, and 15+ years server management experience.",
              "founder": {
                "@type": "Person",
                "name": "Mati Winnetou"
              },
              "sameAs": [
                "https://twitter.com/matiwinnetou",
                "https://github.com/Cardano-Fans"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "technical support",
                "url": "https://cardano.fans"
              }
            })
          }}
        />
      </Head>

      <Header />

      <main>
        <Hero />

        <AboutPool />

        <News />

        <AboutCardano />
      </main>

      <Footer />
    </div>
  )
}

export default Home
