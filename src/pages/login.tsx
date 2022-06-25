import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import InputForm from '../components/InputForm'
import { Alert, CircularProgress } from '@mui/material'

const Login: NextPage = () => {

    const router = useRouter()
    const { redirect }: any = router.query

    const { data: session, status } = useSession()
    if (status == 'authenticated') {
        router.push('/');
    }

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const formRef: any = useRef()

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    const validation = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
    })

    const login = async () => {
        setLoading(true)
        const data = { ...formLogin, json: true, redirect: false }
        const request: any = await signIn('credentials', {
            ...data,
        })
        const { error, status } = request
        if (status == 200) {
            if (redirect) {
                router.push(redirect)
            } else {
                router.push('/')
            }
        } else {
            setAlert(true)
        }
        setLoading(false)
    }


    return (
        <MainLayout>
            <Head>
                <title>Login Page</title>
            </Head>
            <div className='h-full w-full flex justify-center items-center'>
                <div className='w-1/3'>
                    <div>
                        <h2 className="text-bold mt-10 mb-4 text-3xl text-gray-700">
                            <b>Login</b>
                        </h2>

                        <Formik
                            initialValues={formLogin}
                            validationSchema={validation}
                            onSubmit={(values, { setSubmitting }) => {
                                login()
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                isValid,
                            }) => (
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <InputForm
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        placeholder="Ex: budi@example.com"
                                        value={values.email}
                                        onChange={handleChange}
                                        onInput={(e: any) => {
                                            setFormLogin({ ...formLogin, email: e.target.value })
                                        }}
                                        label="Email"
                                        errorMessage={errors.email}
                                    />
                                    <InputForm
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="*******"
                                        value={values.password}
                                        onChange={handleChange}
                                        onInput={(e: any) => {
                                            setFormLogin({ ...formLogin, password: e.target.value })
                                        }}
                                        errorMessage={errors.password}
                                        label="Password"
                                    />
                                    <div>
                                        {alert == true && (
                                            <div className="my-4 flex w-full justify-center">
                                                <Alert
                                                    className="w-full"
                                                    onClose={() => {
                                                        setAlert(false)
                                                    }}
                                                    severity="error"
                                                >
                                                    Username or password not match
                                                </Alert>
                                            </div>
                                        )}

                                        {loading == true && (
                                            <div className="flex justify-center">
                                                <CircularProgress /> <span>Loading...</span>
                                            </div>
                                        )}
                                        {loading == false && (
                                            <button
                                                className="focus:shadow-outline w-full rounded-full bg-sky-600 py-2 px-4 font-bold text-white focus:outline-none"
                                                type="submit"
                                            >
                                                <span className="flex items-center justify-center">
                                                    Sign In
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Login
