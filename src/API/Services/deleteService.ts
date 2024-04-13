import api from '../api'

import { ServiceDeleteResponse } from '../types'

export const deleteService = async (name: string) => {
  try {
    const data = await api.post<ServiceDeleteResponse>('/service/delete', {
      name
    })

    return data.status == 'success' ? true : false
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

export default deleteService