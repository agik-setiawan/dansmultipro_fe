import type { NextPage } from 'next'
import Head from 'next/head'
import Jobs from '../../features/jobs/Jobs'
import MainLayout from '../../layouts/MainLayout'


const JobPage: NextPage = () => {
    return (
        <MainLayout>
            <>
                <Head>
                    <title>Job Lists</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Jobs />
            </>
        </MainLayout>
    )
}

export default JobPage
