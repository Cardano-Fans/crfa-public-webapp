import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { customScript } from '../legacy/custom-script'

const BlockchainInsight: NextPage = () => {
  useEffect(() => {
    customScript()
  }, [])

  return (
    <div>
      <Head>
        <title>Cardano Blockchain Insights - Cardano Fans</title>
      </Head>

      <Header />

      <section className="default-page container mx-auto relative overflow-hidden pt-60 pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h1
          className="heading-hero c-white mb-16 aos-init aos-animate"
          data-aos="fade-down"
        >
          Cardano Blockchain Insight{' '}
        </h1>
        <a
          href="https://datastudio.google.com/u/0/reporting/3136c55b-635e-4f46-8e4b-b8ab54f2d460/page/k5r9B"
          target="_blank"
          className="btn rounded aos-init aos-animate"
          data-aos="fade-up"
          data-aos-anchor-placement="top"
          data-aos-delay={350}
          rel="noreferrer"
        >
          <span className="btn-text-blended">Go to Datastudio</span>
        </a>
        <div className="default-page-content mt-20">
          <div className="w-full frame-box">
            <iframe
              className="rounded-md"
              width="100%"
              height="100%"
              src="https://datastudio.google.com/embed/reporting/3136c55b-635e-4f46-8e4b-b8ab54f2d460/page/k5r9B"
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
