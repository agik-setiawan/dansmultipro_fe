import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../../layouts/MainLayout";
import { GoArrowLeft } from 'react-icons/go'
import Link from "next/link";
import { useLazyJobDetailQuery } from "../../features/jobs/jobs.api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import JobModel from "../../model/JobModel";
import { CircularProgress, Divider } from "@mui/material";
import { getSession } from "next-auth/react";
import AuthContainer from "../../features/auth/AuthConatiner";

const DetailJob: NextPage = ({ }: any) => {
    const router = useRouter()
    const { id } = router.query
    const [getJobDetail, { data, isFetching, isError, isSuccess, isLoading }] = useLazyJobDetailQuery();

    const [job, setJob] = useState<JobModel>()

    const fetchJobs = async () => {
        const session: any = await getSession();
        if (session.accessToken) {
            getJobDetail({ id, accessToken: session.accessToken });
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [router])

    useEffect(() => {
        if (data) {
            setJob(data);
        }
    }, [data])
    return (
        <MainLayout>
            <AuthContainer>
                <Head>
                    <title>{job?.title ?? ""}</title>
                </Head>
                <div className="mx-2">
                    <div>
                        <Link href={'/'}>
                            <button className="flex items-center hover:opacity-75"><span className="text-gray-500"><GoArrowLeft size={20} /></span> <b className="text-sky-700 ml-2">Back</b></button>
                        </Link>
                    </div>

                    {
                        isFetching &&
                        <div className="flex justify-center my-4">
                            <CircularProgress /> <span>Loading...</span>
                        </div>
                    }

                    {
                        !isFetching &&
                        <div>
                            {
                                job &&
                                <div className="my-4 shadow p-3">
                                    <p className="text-gray-600 text-sm">{job?.type} / {job.location}</p>
                                    <p className="text-xl text-gray-700 mb-5"><b>{job.title}</b></p>
                                    <Divider />
                                    <div className="my-4 flex">
                                        <div className="w-7/12">
                                            <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: job.description }}></p>
                                        </div>
                                        <div className="w-5/12 pl-2">
                                            <div className="w-full shadow rounded p-3">
                                                <div className="shadow p-1">
                                                    <div className="flex justify-between">
                                                        <small className="text-gray-600 text-sm"><b>{job.company}</b></small>
                                                        <small className="text-sky-600"><b>1 other job</b></small>
                                                    </div>
                                                </div>
                                                <div className="shadow p-1 my-2">
                                                    <img src={job.company_logo} onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = "https://via.placeholder.com/728x400.png?text=IMAGE NOT FOUND";
                                                    }} />
                                                    <div className="my-2">
                                                        <a className="text-sky-600" target={'_blank'} href={job.company_url}>{job.company_url}</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full shadow rounded p-3 my-4">
                                                <div className="shadow p-1">
                                                    <div>
                                                        <small className="text-gray-600 text-sm"><b>How to apply</b></small>
                                                    </div>
                                                </div>
                                                <div className="shadow p-1 my-2">
                                                    <div className="my-2">
                                                        <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: job.how_to_apply }}></p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>

            </AuthContainer>
        </MainLayout>
    )
}

export default DetailJob;