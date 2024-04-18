import api, { RequestError } from "../api";

import { AccessTokenResponse } from "../types";

export const refreshAccessToken = async (refresh_token: string) => {
  try {
    const data = await api.post<AccessTokenResponse>('/user/refresh', {
      refresh_token
    })

    return data
  } catch (err: any) {
    console.log(err)
    if (err?.response?.status === 400) {
      throw new RequestError(err.response.data.error, err.response)
    }
    if (err?.response?.status === 401) {
      throw new RequestError(err.response.data.error, err.response)
    }

    throw err
  }
}

export default refreshAccessToken