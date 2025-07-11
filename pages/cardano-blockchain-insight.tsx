import type { NextPage } from 'next'
import Head from 'next/head'

import { DonateButton } from '@features/wallet'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { useAOS } from '../hooks/useAOS'

const BlockchainInsight: NextPage = () => {
  useAOS()

  return (
    <div>
      <Head>
        <title>Cardano Blockchain Insights - Cardano Fans</title>
      </Head>

      <Header />

      <section className="default-page container mx-auto relative overflow-hidden pt-60 pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h1 className="heading-hero c-white mb-16" data-aos="fade-down">
          Cardano Blockchain Insights
        </h1>

        <div
          className="flex space-x-4"
          data-aos="fade-up"
          data-aos-anchor-placement="top"
          data-aos-delay={350}
        >
          <a
            href="https://datastudio.google.com/u/0/reporting/3136c55b-635e-4f46-8e4b-b8ab54f2d460/page/p_wxcw6g0irc"
            target="_blank"
            className="btn-secondary"
            rel="noopener noreferrer"
          >
            <span className="btn-text-blended">Go to Datastudio</span>
          </a>

          <DonateButton />
        </div>
        <div className="default-page-content mt-20">
          <div className="w-full frame-box">
            <iframe
              className="rounded-md"
              width="100%"
              height="100%"
              src="https://datastudio.google.com/embed/reporting/3136c55b-635e-4f46-8e4b-b8ab54f2d460/page/p_wxcw6g0irc"
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlockchainInsight
