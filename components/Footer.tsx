import { GithubButton, TwitterButton, TelegramButton } from './SocialButton'

export const Footer: React.FC = () => {
  return (
    <footer
      id="contact"
      className="footer overflow-hidden py-20 pl-6 sm:pl-0 pr-6 sm:pr-0"
    >
      <div className="container flex flex-col mx-auto">
        <div className="w-full flex flex-col justify-around mb-8 lg:mb-0">
          <div>
            <h2
              className="section-heading mb-8 aos-init aos-animate"
              data-aos="fade-down"
            >
              Contact us
            </h2>
            <p
              className="c-white text-md mb-8 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={300}
            >
              <span className="text-2xl">Do you have any questions?</span>
              <br />
              Send us a message!
            </p>
          </div>
          <div
            className="aos-init aos-animate"
            data-aos="fade-right"
            data-aos-delat={800}
          >
            <h3 className="c-white text-3xl mb-4">Follow us</h3>
            <div className="flex items-center space-x-8">
              <TelegramButton size="md" variant="primary" />
              <TwitterButton size="md" variant="primary" />
              <GithubButton size="md" variant="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="copy-box container mx-auto mt-20">
        <div className="copy-text c-white text-xs flex justify-center">
          Copyright © 2021
        </div>
      </div>
    </footer>
  )
}
