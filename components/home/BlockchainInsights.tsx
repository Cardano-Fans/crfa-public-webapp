import Link from 'next/link'

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
            <iframe
              width="100%"
              height="100%"
              style={{ minHeight: 320 }}
              frameBorder={0}
              className="rounded-2"
              src="https://js.adapools.org/widget-dark.html?pool=6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368"
              data-aos="zoom-in"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Link passHref href="/cardano-blockchain-insight/">
              <a>
                <img
                  className="w-100 rounded-md"
                  src="/ada-fans-cardano.png"
                  alt="zoom in"
                  data-aos="zoom-in"
                />
              </a>
            </Link>
          </div>
        </div>
        <Link passHref href="/cardano-blockchain-insight/">
          <a
            className="btn-secondary mt-10"
            data-aos="fade-up"
            data-aos-anchor-placement="top"
            data-aos-delay={350}
          >
            Get more details
          </a>
        </Link>
      </div>
    </section>
  )
}
