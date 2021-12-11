export const AboutCardano: React.FC = () => {
  return (
    <section id="cardano" className="features py-36 mx-auto">
      <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h2 className="section-heading mb-10" data-aos="fade-down">
          About Cardano
        </h2>
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          <Card
            image="/blockchain.png"
            title="Cryptocurrency"
            data-aos="fade-right"
          >
            Cardano is a public blockchain and cryptocurrency project. It
            requires decentralized node servers to validate and secure the
            blockchain for all participants.
          </Card>

          <Card
            title="Earn"
            image="/fintech.png"
            data-aos="fade-right"
            data-aos-delay={200}
          >
            If you hold Ada (₳) cryptocurrency, you can participate in this
            process and earn rewards by staking your Ada.
          </Card>

          <Card
            title="Control"
            image="/fingerprint.png"
            data-aos="fade-right"
            data-aos-delay={400}
          >
            Your Ada remains within your complete control at all times and you
            are still allowed to transfer, spend, or move your staking
            delegation to another stake pool.
          </Card>
        </div>
      </div>
    </section>
  )
}

const Card = ({ image, title, children, ...rest }) => {
  return (
    <div
      className="bg-main text-dark p-10 shadow-md rounded-md relative w-full lg:w-1/3"
      {...rest}
    >
      <img className="mb-4 " src={image} alt="icon" />

      <h3 className="text-3xl mb-4">{title}</h3>
      <p>{children}</p>
    </div>
  )
}
