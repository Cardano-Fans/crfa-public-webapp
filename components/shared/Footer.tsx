import Link from 'next/link'
import { GithubButton, TwitterButton, TelegramButton } from './SocialButton'

export const Footer: React.FC = () => {
  return (
    <footer
      id="contact"
      className="footer overflow-hidden py-20 pl-6 sm:pl-0 pr-6 sm:pr-0"
    >
      <div className="container flex flex-col mx-auto">
        <div className="w-full flex flex-col justify-around mb-8 lg:mb-0">
          <div className="mb-4">
            <h2 className="section-heading mb-8" data-aos="fade-down">
              Contact us
            </h2>
            <div
              className="c-white text-md mb-8"
              data-aos="fade-right"
              data-aos-delay={300}
            >
              <div className="text-2xl mb-7">Do you have any questions?</div>

              <a
                href="mailto:fanscardano@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Send us message
              </a>
            </div>
          </div>

          <div data-aos="fade-right" data-aos-delay={800}>
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
        <div className="copy-text c-white text-sm flex justify-center">
          Copyright © 2025
        </div>
      </div>
    </footer>
  )
}
