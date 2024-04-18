import AuthToken from "../Auth/AuthToken";
import api from "../api";

import { UserAuthResponse } from "../types";

/**
 * Sends post request to creeate a user.
 * Does not hash or encrypt the password. Make sure you do this before calling this method
 * @param username 
 * @param password 
 * @returns 
 */
export const createUser = async (username: string, password: string) => {
  try {
    const data = await api.post<UserAuthResponse>('/user', {
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
      throw new Error(err.response.data.error)
    }
    if (err?.response?.status === 409) {
      throw new Error(err.response.data.error)
    }

    throw new Error(err)
  }
}

export default createUser