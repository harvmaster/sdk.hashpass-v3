import api, { RequestOptions } from '../api'

import { DeleteResponse } from '../types'

export const deleteUser = async (access_token?: string) => {
  const headers: RequestOptions['headers'] = {}
  if (access_token) headers['Authorization'] = `Bearer ${access_token}`

  try {
    const data = await api.delete<DeleteResponse>('/user', {
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

export default deleteUser