import { CircularProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import ListJob from "../../components/ListJob";
import JobModel from "../../model/JobModel";
import { useLazyJobsQuery } from "./jobs.api";
import SearchJobs from "./SearchJobs";
import { concat } from 'lodash';
import { getSession } from "next-auth/react";

export default function Jobs() {
    const [getJobs, { data, isSuccess, isLoading, isError, isFetching }] = useLazyJobsQuery();
    const [jobs, setJobs] = useState<JobModel[]>([]);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [typeParam, setTypeParam] = useState("more");
    const initialparam = {
        page: 1,
        location: "",
        description: ""
    }
    const [params, setParams] = useState(initialparam)

    const fetchJobs = async () => {
        const session: any = await getSession();
        if (session.accessToken) {
            getJobs({ params,accessToken:session.accessToken });
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    useEffect(() => {
        fetchJobs()
    }, [params])

    useEffect(() => {
        if (data !== undefined) {
            if (typeParam == "more") {
                const jobsData = concat(jobs, data)
                setJobs(jobsData);
            } else {
                setJobs(data);
            }
        }
    }, [data])

    const moreJobs = () => {
        setTypeParam("more");
        setParams({ ...params, page: params.page + 1 });
    }

    const search = () => {
        setTypeParam("search");
        setParams({ ...params, location: location, description: description });
    }

    return (
        <div className='px-2'>
            <SearchJobs setJobDescription={setDescription} setLocation={setLocation} search={search} />
            <div className="my-4">
                <div>
                    <h1 className="text-gray-600 text-lg mb-3"><b>Job List</b></h1>
                    <Divider />
                </div>
                <div className="my-4">

                    <div>
                        {
                            !isFetching &&
                            <div>
                                {
                                    jobs &&
                                    <div>
                                        {
                                            jobs.map((item, i: number) => {
                                                return (
                                                    <div key={i}>
                                                        <ListJob {...item} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {
                            isFetching &&
                            <div className="flex justify-center my-4">
                                <CircularProgress /> <span>Loading...</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="my-4">
                {
                    !isFetching &&
                    <button onClick={moreJobs} className="w-full px-4 py-2 bg-sky-600 text-gray-100 text-center rounded"><b>More Jobs</b></button>
                }
            </div>
        </div>
    )
}