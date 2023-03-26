import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { useAOS } from '../hooks/useAOS'

import { WorkItem } from '../components/shared/WorkItem'

const OurWork: NextPage = () => {
  useAOS()

  return (
    <div>

      <Head>
        <title>Our Work</title>
      </Head>
 
      <Header />

      <div className="container mx-auto my-10 px-4 mt-20 mb-48">

      <h3 className="text-slate-50 font-bold slide-card-title mb-4">Websites:</h3>


      <div className="flex flex-wrap -mx-4">
        <WorkItem 
            title='DappsOnCardano.com'
            description='dApps Explorer co-authored with ADRIA stake pool.'
            img_uri='/DappsOnCardano.jpeg'
            link='https://DappsOnCardano.com'
            link_text='DappsOnCardano.com'
             />

        <WorkItem 
            title='Cardano Blockchain Insights'
            description='Cardano Blockchain Insights is a Cardano explorer of various blockchain metrics.'
            img_uri='/CardanoBlockchainInsights.jpeg'
            link='/cardano-blockchain-insight'
            link_text='Cardano Blockchain Insights'
             />
      </div>

      <h2 className="text-slate-100 font-bold slide-card-title mb-4">Open Source:</h2>
      <div className="flex flex-wrap -mx-4">
        <WorkItem
            title="Acca"
            description='An alternative standard library for Aiken smart contract programmning language.'
            img_uri='/acca.jpeg'
            link='https://github.com/Cardano-Fans/acca'
            link_text='github.com/Cardano-Fans/acca'
             />

        <WorkItem 
            title='CRFA Block Checker'
            description='SPO tool written in Ruby to regularly check if blocks are made according to the leaderlogs.'
            img_uri='/osi.png'
            link='https://github.com/Cardano-Fans/crfa-block-checker'
            link_text='github.com/Cardano-Fans/crfa-block-checker'
             />

        <WorkItem 
            title='Demeter Run Java Starter Kit'
            description='Demeter template to start Cardano Plutus development with Java.'
            img_uri='/demeter_run.jpeg'
            link='https://demeter.run/code?repository=https://github.com/Cardano-Fans/demeter-java-starter-kit&template=java&source=demeter&key=java-starter-kit'
            link_text='Demeter Run Java Starter Kit'
             />

        <WorkItem 
            title="Demeter Run Java Plutus V2 Starter Kit"
            description='Demeter template to start Offchain Cardano Plutus V2 development with Java.'
            img_uri='/demeter_run.jpeg'
            link='https://demeter.run/code?repository=https://github.com/Cardano-Fans/demeter-java-plutus-v2-starter-kit&template=java&source=demeter&key=demeter-java-plutus-v2-starter-kit'
            link_text='Demeter Run Java Plutus V2 Starter Kit'
             />

          <WorkItem 
            title="CRFA dApp Offchain Registry"
            description='CRFA Offchain Registry that powers DappsOnCardano.com.'
            img_uri='/osi.png'
            link='https://github.com/Cardano-Fans/crfa-offchain-data-registry'
            link_text='github.com/Cardano-Fans/crfa-offchain-data-registry'
             />

          <WorkItem 
            title="CRFA Metadata Service"
            description='Microservice that serves data from CRFA dApp Offchain Registry.'
            img_uri='/osi.png'
            link='https://github.com/Cardano-Fans/crfa-metadata-service'
            link_text='github.com/Cardano-Fans/crfa-metadata-service'
             />

          <WorkItem 
            title="CRFA Prometheus Gateway"
            description='Ruby microservice that exposes cardano data from cardano-node via prometheus.'
            img_uri='/osi.png'
            link='https://github.com/Cardano-Fans/crfa-prometheus-web-gateway'
            link_text='github.com/Cardano-Fans/crfa-prometheus-web-gateway'
             />

      </div>

      <h2 className="text-slate-100 font-bold slide-card-title mb-4">Infrastructure:</h2>

      <div className="flex flex-wrap -mx-4">

        <WorkItem 
            title='CRFA Freeloaderz Submit Service'
            description='Dedicated one of our cardano nodes to take part in transactions load balancing in Europe.'
            img_uri='/FreeLoaderz.png'
            link='https://freeloaderz.io'
            link_text='FreeLoaderz.io'
             />

        <WorkItem 
            title="Milkomeda's validator"
            description="We've been choosen to validate blocks on Milkomeda (Cardano's EVM sidechain)."
            img_uri='/milkomeda.webp'
            link='https://milkomeda.com'
            link_text='milkomeda.com'
             />
      </div>

    </div>

      <Footer />
    </div>
  )
}

export default OurWork
