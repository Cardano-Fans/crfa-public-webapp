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

        <h3 className="c-main font-bold slide-card-title mb-4 underline underline-offset-2">Websites:</h3>

        <div className="flex flex-wrap -mx-4">
          <WorkItem
            title='Cardano Blockchain Insights'
            description='Cardano Blockchain Insights is a Cardano explorer of various blockchain metrics.'
            img_uri='/CardanoBlockchainInsights.jpeg'
            link='/cardano-blockchain-insight'
            link_text='Cardano Blockchain Insights'
          />
        </div>

        <h2 className="c-main font-bold slide-card-title mb-4 underline underline-offset-2 mt-4">Open Source:</h2>
        <div className="flex flex-wrap -mx-4">
          <WorkItem
            title="Acca"
            description='An alternative standard library for Aiken smart contract programming language.'
            img_uri='/acca.png'
            link='https://github.com/Cardano-Fans/acca'
            link_text='Cardano-Fans/acca'
          />

          <WorkItem
            title='CRFA Block Checker'
            description='SPO tool written in Ruby to regularly check if blocks are made according to the leaderlogs.'
            link='https://github.com/Cardano-Fans/crfa-block-checker'
            link_text='Cardano-Fans/crfa-block-checker'
          />

          <WorkItem
            title='CRFA Block Monitor'
            description='Software to monitor Cardano block producers and switch between primary and secondary for high resilience.'
            link='https://github.com/Cardano-Fans/crfa-block-monitor'
            link_text='Cardano-Fans/crfa-block-monitor'
          />

          <WorkItem
            title='CRFA Public Webapp'
            description='Demonstration of how to build a React app with wallet connector.'
            link='https://github.com/Cardano-Fans/crfa-public-webapp'
            link_text='Cardano-Fans/crfa-public-webapp'
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
            link='https://github.com/Cardano-Fans/crfa-offchain-data-registry'
            link_text='Cardano-Fans/crfa-offchain-data-registry'
          />

          <WorkItem
            title="CRFA Metadata Service"
            description='Microservice that serves data from CRFA dApp Offchain Registry.'
            link='https://github.com/Cardano-Fans/crfa-metadata-service'
            link_text='Cardano-Fans/crfa-metadata-service'
          />

          <WorkItem
            title="Dapps On Cardano"
            description='Microservice that exposes smart contract statistics on Cardano.'
            link='https://github.com/Cardano-Fans/crfa-dapp-store-service'
            link_text='https://github.com/Cardano-Fans/crfa-dapp-store-service'
          />

          <WorkItem
            title="CRFA Prometheus Gateway"
            description='Ruby microservice that exposes Cardano data from cardano-node via Prometheus.'
            img_uri='/prometheus.png'
            link='https://github.com/Cardano-Fans/crfa-prometheus-web-gateway'
            link_text='Cardano-Fans/crfa-prometheus-web-gateway'
          />

          <WorkItem
            title="CRFA Donation App"
            description='Micrometer app showing how to build a simple backend app with SQLite using Cardano.'
            link='https://github.com/Cardano-Fans/crfa-cardano-donation-app'
            link_text='Cardano-Fans/crfa-cardano-donation-app'
          />

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default OurWork
