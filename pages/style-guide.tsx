import type { NextPage } from 'next'

import Head from 'next/head'

import { useAOS } from '../hooks/useAOS'

const Home: NextPage = () => {
  useAOS()

  return (
    <div>
      <Head>
        <title></title>
      </Head>
      <section className="container py-36 mx-auto">
        <h1 className="heading-hero mb-36">
          Style Guide
        </h1>
        <h2 className="c-white uppercase mb-8 text-5xl">
          Color Pallete
        </h2>
        <hr className="mb-8" />
        <div className="flex gap-8 mb-20">
          <div className="rounded-full w-40 h-40 c-white features-card flex items-center justify-center text-center">
            c-main
            #E64646
          </div>
          <div className="rounded-full w-40 h-40 border-2 border-white c-white flex items-center justify-center text-center">
            c-dark<br />
            #00082D
          </div>

          <div className="rounded-full w-60 h-40 c-white flex items-center justify-center text-center" style={{ background: "rgba(255,255,255, .04)" }}>
            slide card color<br />
            rgba(255,255,255, .04)
          </div>

          <div className="w-96 h-40 c-white flex items-center justify-center text-center p-4 rounded-full" style={{ background: "linear-gradient(35deg, rgba(230, 70, 70, 0.32) 0%, rgba(0,8,45,1) 90%)" }}>
            Hero Gradient<br /><br />
            linear-gradient<br />
            (35deg, rgba(230, 70, 70, 0.32) 0%, rgba(0,8,45,1) 90%)
          </div>
        </div>

        <h2 className="c-white uppercase mb-8 text-5xl">
          Typography
        </h2>
        <hr className="mb-8" />
        <p className="c-white text-2xl">
          Poppins
        </p>
        <div className="c-white mt-12 mb-20">
          <h1 className="heading-hero mb-4">Heading H1 - 64px</h1>
          <h2 className="section-heading mb-4">Heading H2 - 48px</h2>
          <h3 className="slide-card-title mb-4">Heading H3 - 32px</h3>
          <h4 className="text-2xl mb-4">Heading H4 - 24px</h4>
          <p className="c-white">
            Paragraph - 16px
          </p>
        </div>
        <h2 className="c-white uppercase mb-8 text-5xl">
          Buttons
        </h2>
        <hr className="mb-8" />
        <div className="flex gap-8">
          <a href="#about" className="btn rounded">
            <span className="btn-text-blended">Button Main</span>
          </a>
          <a href="#" className="btn btn-2">Button Secondary</a>
        </div>
      </section>
    </div>
  )
}
export default Home
