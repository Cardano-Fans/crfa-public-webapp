import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const AdaPoolsIframe: React.FC = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div 
        className="w-full bg-gray-800 rounded flex items-center justify-center text-gray-400"
        style={{ minHeight: 320 }}
      >
        Loading pool statistics...
      </div>
    )
  }

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ minHeight: 320 }}
      frameBorder={0}
      className="rounded-2"
      src="https://js.adapools.org/widget-dark.html?pool=6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368"
      data-aos="zoom-in"
      title="AdaPools.org Cardano Fans pool widget"
    />
  )
}

export const BlockchainInsights: React.FC = () => {
  return (
    <section id="more" className="details py-36 mx-auto">
      <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h2 className="section-heading mb-2" data-aos="fade-down">
          Cardano Blockchain Insights
        </h2>
        <p
          className="c-white w-75 mb-16"
          data-aos="fade-right"
          data-aos-delay={200}
        >
          Cardano Blockchain Insights contains of on chain and off chain metrics
          from a birds eye point of view evolution of Cardano project.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <AdaPoolsIframe />
          </div>
          <div className="w-full lg:w-1/2">
            <Link
              href="/cardano-blockchain-insight/"
              className="w-100 rounded-md"
              passHref
            >
              <Image
                className="w-100 rounded-md"
                src="/ada-fans-cardano.png"
                alt="Cardano Blockchain Insights"
                width={600}
                height={400}
                data-aos="zoom-in"
              />
            </Link>
          </div>
        </div>
        <Link
          href="/cardano-blockchain-insight/"
          className="btn-secondary mt-10"
          data-aos="fade-up"
          data-aos-anchor-placement="top"
          data-aos-delay={350}
        >
          Get more details
        </Link>
      </div>
    </section>
  )
}
