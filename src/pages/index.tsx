import type { NextPage } from 'next'
import Head from 'next/head'
import Jobs from '../features/jobs/Jobs'
import MainLayout from '../layouts/MainLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AuthContainer from '../features/auth/AuthConatiner'

const JobPage: NextPage = () => {

    // const { data: session, status } = useSession()
    // const router = useRouter();
    // if (status == 'unauthenticated') {
    //     router.push('login');
    // }

    return (

        <MainLayout>
            <AuthContainer>
                <>
                    <Head>
                        <title>Job Lists</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Jobs />
                </>
            </AuthContainer>
        </MainLayout>

    )
}

export default JobPage
