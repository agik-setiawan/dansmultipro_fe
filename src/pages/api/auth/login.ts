import { withIronSessionApiRoute } from "iron-session/next";
import httpStatus from 'http-status';
import http from "../../../utils/http";
import { environment } from "../../../environments/environment";
import API from "../../../api/API";
import axios, { AxiosError, AxiosResponseHeaders } from "axios";
import { omit } from "lodash";

export default withIronSessionApiRoute(
    async function loginRoute(req: any, res: any) {
        try {
            if (req.method === 'POST') {
                const body = req.body;
                const { email, password } = body;
                const request = await axios.post(environment.api_url + API.AUTH_LOGIN_EXTERNAL_URL, {
                    email,
                    password
                });
                const data = request.data;
                if (data.statusCode == 200) {
                    req.session.user = data.user;
                    req.session.accessToken = data.accessToken;
                    await req.session.save();
                }
                return await res.send({ ...data });
            } else {
                return await res.send({ statusCode: 400 });
            }
        } catch (error: any) {
            const response = error.response;
            // console.log('abc', response.data);
            return await res.send({ ...response.data });
        }
    },
    {
        cookieName: "nuliscv_auth",
        password: "complex_password_at_least_32_characters_long",
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);