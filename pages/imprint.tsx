import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { useAOS } from '../hooks/useAOS'

const Imprint: NextPage = () => {
  useAOS()

  return (
    <div>
      <Head>
        <title>Imprint | Cardano Fans</title>
        <meta name="description" content="Legal information and contact details for Cardano Fans stake pool." />
        <meta name="robots" content="noindex, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://cardano.fans/imprint" />
      </Head>

      <Header />

      <div className="container mx-auto my-10 px-4 pt-32 mt-20 mb-48">
        <h1 className="c-main font-bold text-4xl mb-8 underline underline-offset-2">Imprint</h1>

        <div className="c-white text-lg leading-relaxed space-y-4">
          <p className="font-semibold text-xl">Cardano Fans - Mateusz Czeladka</p>
          <p>Kolonnenstrasse 8</p>
          <p>10827 Berlin</p>
          <p>Germany</p>

          <div className="mt-8">
            <p className="font-semibold">USt-IdNr:</p>
            <p>-</p>
          </div>

          <div className="mt-8">
            <p className="font-semibold">Contact:</p>
            <p>
              <a
                href="mailto:info@cardano.fans"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                info@cardano.fans
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Imprint
