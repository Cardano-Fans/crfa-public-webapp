import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper core and required modules
import SwiperCore, { EffectCreative, Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// install Swiper modules
SwiperCore.use([EffectCreative, Pagination, Navigation])

export const AboutPool: React.FC = () => {
  return (
    <section id="about" className="about py-36">
      <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h2 className="section-heading mb-10" data-aos="fade-down">
          About our Pool
        </h2>
        <div className="lg:flex mx-auto">
          <div className="flex flex-col items-center justify-center p-8 w-full lg:w-1/2 relative">
            <div className="w-60 sm:w-72 md:w-96 h-60 sm:h-72 md:h-96 z-10 rounded-full bg-red absolute left-10"></div>
            <img
              className="w-10/12 z-20 aos-init"
              src="/stakepool-epoch.png"
              alt=""
              data-aos="zoom-in"
            />
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <Swiper
              effect={'creative'}
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              spaceBetween={50}
              slidesPerView={1}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ['100%', 0, 0],
                },
              }}
            >
              <SwiperSlide>
                <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                  <h3 className="slide-card-title mb-6">Delegation</h3>
                  <p className="slide-card-content break-words uppercase mb-6">
                    OUR POOL ID:{' '}
                    <span id="poolId">
                      6C518B4861BB88B1395CEB116342CECBCFB8736282655F9A61C4C368
                    </span>
                    <br />
                    TICKER: CRFA
                    <br />
                    DELEGATE with any Cardano compatible wallet
                  </p>
                  <button id="copyId" className="btn-2">
                    Copy pool ID
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                  <h3 className="slide-card-title mb-6">Fees / Pledge</h3>
                  <p className="slide-card-content">
                    0% FEES (PROMO UNTIL 5 MLN ADA), THEN 1.99% + 1M ADA PLEDGE
                    <br />
                    <br />
                    LOW FEES AS WE STRONGLY BELIEVE IN ACCESSIBILITY TO FINANCE
                    FOR EVERYONE
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                  <h3 className="slide-card-title mb-6">Hardware</h3>
                  <p className="slide-card-content uppercase">
                    WE ARE RUNNING CARDANOFANS STAKING POOL ON BAREMETAL WITH
                    TWO RELAY NODES AND ONE BLOCK PRODUCING, LINK 200 MBIT
                    <br />
                    <br />
                    Baremetal stakepool with 200 Mbit fiber running on Intel i3
                    and 2 x Intel i7 servers ( 3 x 16 GB RAM)
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                  <h3 className="slide-card-title mb-6">Monitoring</h3>
                  <p className="slide-card-content">
                    WE HAVE SETUP ADVANCED MONITORING WITH ALTERING IN CASE
                    THINGS GET PEAR SHAPED.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                  <h3 className="slide-card-title mb-6">Operators</h3>
                  <p className="slide-card-content">
                    WELCOME TO CARDANOFANS CARDANO (CRFA) STAKE POOL. WE ARE
                    PROFESSIONAL STAKE POOL OPERATORS. WE HAVE BEEN RUNNING
                    LINUX SERVERS (BARE METAL, CLOUD) FOR OVER 15 YEARS NOW.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-card p-8 lg:p-14 z-10 relative overflow-hidden rounded-md">
                  <h3 className="slide-card-title mb-6">Involvement</h3>
                  <p className="slide-card-content">
                    WE STRONGLY BELIEVE THAT FINANCE SHOULD BE AVAILABLE FOR
                    EVERYONE NOT JUST PRIVILIGED ONES. THERE IS ABOUT 3 BLN
                    PEOPLE THAT ARE CURRENTLY UNBANKED, CARDANO AIMS TO CHANGE
                    THIS AND WE WILL SUPPORT IT VIA RUNNING LOW FEES STAKING
                    POOL.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
