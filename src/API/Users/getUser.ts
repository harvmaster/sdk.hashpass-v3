import api, { RequestError, RequestOptions } from "../api";

import { UserResponse } from "../types";

export const getUser = async (access_token?: string ) => {
  const headers: RequestOptions['headers'] = {}
  if (access_token) headers['Authorization'] = `Bearer ${access_token}`

  try {
    const data = await api.get<UserResponse>('/user', {
      headers
    })

    return data
  } catch (err: any) {
    // console.log(err)
    if (err?.response?.status === 400) {
      throw new RequestError(err.response.data.error, err.response)
    }
    if (err?.response?.status === 401) {
      throw new RequestError(err.response.data.error, err.response)
    }
    if (err?.response?.status === 404) {
      throw new RequestError(err.response.data.error, err.response)
    }

    throw err
  }
}

export default getUser