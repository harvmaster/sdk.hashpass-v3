import AuthToken from "../Auth/AuthToken";
import api, { RequestError } from "../api";

import { UserAuthResponse } from "../types";

/**
 * Sends POST request to login a user.
 * This method does not hash or encrypt the password. Make sure you do this before calling this method
 * @param username 
 * @param password 
 * @returns 
 */
export const login = async (username: string, password: string) => {
  try {
    const data = await api.post<UserAuthResponse>('/user/login', {
      username,
      password
    })

    const { access_token, refresh_token: { token: refresh_token} } = data
    const authToken = new AuthToken({ access_token, refresh_token })

    return {
      user: data.user,
      authToken
    }
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

export default login