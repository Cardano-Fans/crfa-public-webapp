export const Footer: React.FC = () => {
  return (
    <footer
      id="contact"
      className="footer overflow-hidden py-20 pl-6 sm:pl-0 pr-6 sm:pr-0"
    >
      <div className="container flex flex-col lg:flex-row mx-auto">
        <div className="w-full lg:w-1/2 flex flex-col justify-around mb-8 lg:mb-0">
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
            className="social-box hidden lg:block w-full lg:w-1/3 aos-init aos-animate"
            data-aos="fade-right"
            data-aos-delat={800}
          >
            <h3 className="c-white text-3xl mb-4">Follow us</h3>
            <div className="flex items-center justify-between">
              <a href="https://t.me/freedom_cardano" className="social-link">
                <i
                  className="fab fa-telegram-plane social-icon"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://twitter.com/matiwinnetou"
                className="social-link"
              >
                <i className="fab fa-twitter social-icon" aria-hidden="true" />
              </a>
              <a href="https://github.com/Cardano-Fans" className="social-link">
                <i className="fab fa-github social-icon" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="social-box lg:hidden w-full lg:w-1/3">
          <h3
            className="c-white text-4xl mb-8 aos-init aos-animate"
            data-aos="fade-right"
            data-aos-delay={600}
          >
            Follow us
          </h3>
          <div className="flex items-center justify-between">
            <a
              href="https://t.me/freedom_cardano"
              className="social-link aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={800}
            >
              <i
                className="fab fa-telegram-plane social-icon"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://twitter.com/matiwinnetou"
              className="social-link aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={1000}
            >
              <i className="fab fa-twitter social-icon" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/Cardano-Fans"
              className="social-link aos-init aos-animate"
              data-aos="fade-right"
              data-aos-delay={1200}
            >
              <i className="fab fa-github social-icon" aria-hidden="true" />
            </a>
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
