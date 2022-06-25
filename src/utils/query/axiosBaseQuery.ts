import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query'

const axiosBaseQuery = (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
    {
        url: string
        method: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
        params?: AxiosRequestConfig['params'],
        headers?: AxiosRequestConfig['headers'],
    },
    unknown,
    unknown
> =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axios({ url: baseUrl + url, method, data, params, headers })
            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export default axiosBaseQuery;