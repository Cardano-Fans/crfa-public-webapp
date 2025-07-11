import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { useAOS } from '../hooks/useAOS'

const PoolIframe: React.FC<{ src: string; width?: string | number; height?: string | number; style?: React.CSSProperties }> = ({ 
  src, 
  width, 
  height, 
  style 
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div 
        style={style || { width: width || '100%', height: height || '60px' }}
        className="bg-gray-800 rounded flex items-center justify-center text-gray-400"
      >
        Loading pool statistics...
      </div>
    )
  }

  return (
    <iframe 
      style={style} 
      width={width} 
      height={height} 
      src={src}
      title="Cardano Fans pool statistics"
    >
      <a href="https://cexplorer.io/pool/pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3" rel="noopener noreferrer" target="_blank">
        View pool details on cexplorer.io
      </a>
    </iframe>
  )
}

const OurPoolStats: NextPage = () => {
    useAOS()

    return (
        <div>

            <Head>
                <title>Live Cardano Pool Statistics | CRFA Performance Metrics</title>
                <meta name="description" content="Real-time performance metrics for Cardano Fans staking pool. View blocks produced, rewards, ROA, and detailed pool statistics updated live." />
                <meta name="keywords" content="cardano pool stats, CRFA statistics, pool performance, ADA rewards, staking metrics, pool blocks" />
                
                {/* Open Graph */}
                <meta property="og:title" content="Live Cardano Pool Statistics | CRFA Performance" />
                <meta property="og:description" content="Real-time performance metrics and statistics for Cardano Fans staking pool including blocks, rewards, and ROA data." />
                <meta property="og:image" content="https://cardano.fans/logo192.png" />
                <meta property="og:url" content="https://cardano.fans/pool-stats" />
                <meta property="og:type" content="website" />
                
                {/* Canonical */}
                <link rel="canonical" href="https://cardano.fans/pool-stats" />
            </Head>

            <Header />

            <div className="container mx-auto my-10 px-4 mt-20 mb-48">

                <h1 className="text-slate-50 font-bold slide-card-title mb-4 flex justify-center">Live Pool Statistics</h1>
                
                <h2 className="text-slate-50 font-bold slide-card-title mb-4 flex justify-center">Overview:</h2>

                <div className='mb-8'>
                    <PoolIframe 
                      src="https://img.cexplorer.io/w/widget-wide.html?pool=pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3&theme=dark"
                      style={{ width: "100%", height: "60px" }}
                    />
                </div>

                <div className='grid grid-cols-2 divide-x'>
                    <div className="border-none">
                        <h3 className="text-slate-50 font-bold slide-card-title mb-4 flex justify-center">Summary:</h3>
                        <div className="flex justify-center">
                            <PoolIframe 
                              src="https://img.cexplorer.io/w/widget.html?pool=pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3&theme=dark"
                              width="500" 
                              height="320"
                            />
                        </div>
                    </div>

                    <div className="border-none">
                        <h3 className="text-slate-50 font-bold slide-card-title mb-4 flex justify-center">Block Stats:</h3>
                        <div className="flex justify-center">
                            <PoolIframe 
                              src="https://img.cexplorer.io/w/widget-graph.html?pool=pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3&theme=dark"
                              width="530" 
                              height="280"
                            />
                        </div>
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    )
}

export default OurPoolStats
