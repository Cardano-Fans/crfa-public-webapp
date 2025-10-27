import NextImage from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCreative } from 'swiper/modules'
// import Swiper core and required modules

import { Slide } from './Slide'
import { Delegation } from './Delegation'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
                alt="Cardano Fans stake pool epoch performance chart"
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-full lg:w-1/2">

            <Swiper
              modules={[Navigation, Pagination, EffectCreative]}
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
              {/* <SwiperSlide>
                <Slide title=''>
                  <div>
                    <a href="https://cexplorer.io/pool/pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3" rel="noreferrer" target="_blank">
                      <img src="https://js.cexplorer.io/img/p-b-1/pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3.jpg" />
                    </a>
                  </div>
                </Slide>
              </SwiperSlide> */}

              <SwiperSlide>
                <Slide title="Fees / Pledge">
                  1.99% + 10k ADA PLEDGE
                  <br />
                  <br />
                  LOW FEES AS WE STRONGLY BELIEVE IN ACCESSIBILITY TO FINANCE
                  FOR EVERYONE
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Delegation />
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Hardware">
                  We are using a mixture of on-premise and cloud-based setup. Normally block producer is running in the cloud AND
                  in case of emergency we can switch to on-premise instance.
                  <br />
                  <br />
                  Cloud instances have all at least 24 GB RAM and running on 10 GB connection.
                  Our on-premise nodes have NVMes / 32 GB RAM and are running on 500 Mbit
                  cable connection with a dedicated static IP.
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Monitoring">
                  WE HAVE SETUP ADVANCED MONITORING WITH ALERTING IN CASE THINGS
                  GET PEAR SHAPED.
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Operators">
                  WELCOME TO CARDANO FANS CARDANO (CRFA) STAKE POOL. WE ARE
                  PROFESSIONAL STAKE POOL OPERATORS. WE HAVE BEEN RUNNING LINUX
                  SERVERS (BARE METAL, CLOUD) FOR OVER 15 YEARS NOW.
                </Slide>
              </SwiperSlide>

              <SwiperSlide>
                <Slide title="Involvement">
                  WE STRONGLY BELIEVE THAT FINANCE SHOULD BE AVAILABLE FOR
                  EVERYONE NOT JUST PRIVILEGED ONES. THERE IS ABOUT 3 BILLION PEOPLE
                  THAT ARE CURRENTLY UNBANKED, CARDANO AIMS TO CHANGE THIS AND
                  WE WILL SUPPORT IT VIA RUNNING LOW FEES STAKING POOL.
                  <br /><br />
                  <Link href="/our-work" className="text-blue-400 hover:text-blue-300 underline">
                    VIEW OUR OPEN SOURCE PROJECTS
                  </Link>
                </Slide>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
