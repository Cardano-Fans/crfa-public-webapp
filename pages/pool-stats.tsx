import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { useAOS } from '../hooks/useAOS'


const OurPoolStats: NextPage = () => {
    useAOS()

    return (
        <div>

            <Head>
                <title>Pool Stats</title>
            </Head>

            <Header />

            <div className="container mx-auto my-10 px-4 mt-20 mb-48">

                <h3 className="text-slate-50 font-bold slide-card-title mb-4">Overview:</h3>

                <div className='mb-8'>
                    <iframe style={{ width: "100%", height: "60px" }} src="https://img.cexplorer.io/w/widget-wide.html?pool=pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3&theme=dark"><a href="https://cexplorer.io/pool/pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3">pool detail on cexplorer.io</a></iframe>
                </div>

                <div className='grid grid-cols-2 divide-x'>
                    <div className="border-none">
                        <h3 className="text-slate-50 font-bold slide-card-title mb-4">Summary:</h3>
                        <iframe width="500" height="320" src="https://img.cexplorer.io/w/widget.html?pool=pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3&theme=dark"><a href="https://cexplorer.io/pool/pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3">pool detail on cexplorer.io</a></iframe>
                    </div>

                    <div className="border-none">
                        <h3 className="text-slate-50 font-bold slide-card-title mb-4">Block Stats:</h3>
                        <iframe width="530" height="280" src="https://img.cexplorer.io/w/widget-graph.html?pool=pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3&theme=dark"><a href="https://cexplorer.io/pool/pool1d3gckjrphwytzw2uavgkxskwe08msumzsfj4lxnpcnpks3zjml3">pool detail on cexplorer.io</a></iframe>
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    )
}

export default OurPoolStats
