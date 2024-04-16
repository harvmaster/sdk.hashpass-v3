import AuthToken from "../Auth/AuthToken";
import api from "../api";

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

    const authToken = new AuthToken(data)

    return {
      user: data.user,
      authToken
    }
  } catch (err: any) {
    console.log(err)
    if (err?.response?.status === 400) {
      throw new Error(err.response.data.error)
    }
    if (err?.response?.status === 401) {
      throw new Error(err.response.data.error)
    }

    throw new Error(err)
  }
}

export default login