import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { renderCanvas } from './canvas'

import { DelegateButton } from '@features/wallet'

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    renderCanvas(canvasRef.current)
  }, [canvasRef])

  return (
    <section className="hero flex items-center">
      <div id="wrapper">
        <canvas id="canvas" className="canvas" ref={canvasRef} />
      </div>
      <div className="container mx-auto relative">
        <div className="flex flex-col-reverse lg:flex-row mx-auto">
          <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2">
            <h1
              className="heading-hero text-center lg:text-left mb-12"
              data-aos="fade-right"
              data-aos-anchor-placement="top"
            >
              <span className="whitespace-nowrap">Cardano Fans</span>
              <br />
              <br />
              Staking Pool
            </h1>
            <DelegateButton
              data-aos="fade-up"
              data-aos-anchor-placement="top"
              data-aos-delay={350}
            />

            <div className="flex space-x-4 mt-6">
              <Link href="/pool-stats" className="btn-secondary">
                <span className="btn-text-blended">View Pool Stats</span>
              </Link>
              <Link href="/our-work" className="btn-secondary">
                <span className="btn-text-blended">Our Projects</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/2 mb-10 lg:mb-0">
            <Image
              className="w-1/2 lg:w-3/4 rounded-circle cardano-hero-logo"
              src="/cardano-white.png"
              alt="Cardano Logo"
              width={400}
              height={400}
              data-aos="zoom-in"
            />
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1634242204">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          />
        </svg>
      </div>
    </section>
  )
}
