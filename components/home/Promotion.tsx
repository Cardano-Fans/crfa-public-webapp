export const Promotion: React.FC = () => {
  return (
    <section id="promotion" className="bg-dark py-36 mx-auto">
      <div className="container lg:flex flex-row gap-8 mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
        <div className="flex flex-col items-start justify-center w-full lg:w-1/2 mb-16 lg:mb-0">
          <h2 className="section-heading mb-8" data-aos="fade-down">
            Promotion
          </h2>
          <p className="c-white mb-8">
            Loyality program for all who delegate your ADA Wallet to Cardano
            Fans
          </p>
          <a
            href="https://adapools.org/pool/6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368"
            target="_blank"
            className="btn rounded mt-10"
            data-aos="fade-up"
            data-aos-delay={350}
            rel="noreferrer"
          >
            <span className="btn-text-blended">Get more details</span>
          </a>
        </div>
        <div
          className="flex flex-col items-center justify-center w-full lg:w-1/2"
          data-aos="fade-left"
          data-aos-delay={400}
        >
          <div className="p-8 lg:p-14 rounded-md c-dark bg-main">
            Every epoch a raffle, 15 ADA will be distributed to a staker based
            on the following conditions:
            <ul style={{ listStyle: 'inside' }} className="mb-8">
              <li>min 100 ADA staked</li>
              <li>min 4 epochs staked</li>
            </ul>
            The longer you stake with CRFA the higher the chance to win.
          </div>
        </div>
      </div>
    </section>
  )
}
