import api from '../api'

import { PasswordEncodings } from '../../Crypto/types'
import { ServiceResponse } from '../types'

export const createService = async (name: string, domain: string, encoding: PasswordEncodings = 'base58', logo = '') => {
  try {
    const data = await api.post<ServiceResponse>('/service', {
      name,
      domain,
      encoding,
      logo
    })

    return data.service
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

export default createService