import NextImage from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper core and required modules
import SwiperCore, { EffectCreative, Pagination, Navigation } from 'swiper'

import { Slide } from './Slide'
import { Delegation } from './Delegation'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// install Swiper modules
SwiperCore.use([EffectCreative, Pagination, Navigation])

export const AboutPool: React.FC = () => {
  return (
    <section id="about" className="about py-36">
      <div className="container  mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h2 className="section-heading mb-10" data-aos="fade-down">
          About our Pool
        </h2>
        <div className="lg:flex mx-auto">
          <div className="flex flex-col items-center justify-center p-8 w-full lg:w-1/2 relative">
            <div className="w-60 sm:w-72 md:w-96 h-60 sm:h-72 md:h-96 z-10 rounded-full bg-red absolute left-10"></div>

            <div className="w-10/12 z-20 ">
              <NextImage
                height={213}
                width={373}
                src="/stakepool-epoch.png"
                data-aos="zoom-in"
                alt=""
              />
            </div>
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
                <Delegation />
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Fees / Pledge">
                  2.5% + 1M ADA PLEDGE
                  <br />
                  <br />
                  LOW FEES AS WE STRONGLY BELIEVE IN ACCESSIBILITY TO FINANCE
                  FOR EVERYONE
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Hardware">
                  WE ARE RUNNING CARDANOFANS STAKING POOL ON BAREMETAL WITH TWO
                  RELAY NODES AND ONE BLOCK PRODUCING, LINK 200 MBIT
                  <br />
                  <br />
                  Baremetal stakepool with 200 Mbit fiber running on Intel i3
                  and 2 x Intel i7 servers ( 3 x 16 GB RAM)
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Monitoring">
                  WE HAVE SETUP ADVANCED MONITORING WITH ALTERING IN CASE THINGS
                  GET PEAR SHAPED.
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Operators">
                  WELCOME TO CARDANOFANS CARDANO (CRFA) STAKE POOL. WE ARE
                  PROFESSIONAL STAKE POOL OPERATORS. WE HAVE BEEN RUNNING LINUX
                  SERVERS (BARE METAL, CLOUD) FOR OVER 15 YEARS NOW.
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Involvement">
                  WE STRONGLY BELIEVE THAT FINANCE SHOULD BE AVAILABLE FOR
                  EVERYONE NOT JUST PRIVILIGED ONES. THERE IS ABOUT 3 BLN PEOPLE
                  THAT ARE CURRENTLY UNBANKED, CARDANO AIMS TO CHANGE THIS AND
                  WE WILL SUPPORT IT VIA RUNNING LOW FEES STAKING POOL.
                </Slide>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
