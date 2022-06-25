import { createApi } from "@reduxjs/toolkit/query/react";
import API from "../../api/API";
import { environment } from "../../environments/environment";
import axiosBaseQuery from "../../utils/query/axiosBaseQuery";

export const jobsApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: axiosBaseQuery({
        baseUrl: environment.api_url
    }),
    endpoints: (builder) => ({
        jobs: builder.query<void, any>({
            query({ params, accessToken }) {
                return {
                    url: API.GET_JOBS_URL,
                    method: 'GET',
                    params,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            },
            transformResponse: (response: any) => response.data ?? []
        }),
        jobDetail: builder.query<void, any>({
            query({ id, accessToken }) {
                return {
                    url: API.GET_JOBS_URL + '/' + id,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            },
            transformResponse: (response: any) => response.data ?? []
        })
    })
})

export const { useLazyJobsQuery, useLazyJobDetailQuery } = jobsApi;
export default jobsApi;