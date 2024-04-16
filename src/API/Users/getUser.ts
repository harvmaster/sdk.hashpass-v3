import api, { RequestOptions } from "../api";

import { User } from "../types";

export const getUser = async (access_token?: string ) => {
  const headers: RequestOptions['headers'] = {}
  if (access_token) headers['Authorization'] = `Bearer ${access_token}`

  try {
    const data = await api.get<User>('/user', {
      headers
    })

    return data
  } catch (err: any) {
    console.log(err)
    if (err?.response?.status === 400) {
      throw new Error(err.response.data.error)
    }
    if (err?.response?.status === 401) {
      throw new Error(err.response.data.error)
    }
    if (err?.response?.status === 404) {
      throw new Error(err.response.data.error)
    }

    throw new Error(err)
  }
}

export default getUser