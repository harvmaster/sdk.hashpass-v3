import api from '../api'

import EncryptedService from '../../Service/EncryptedService'
import { ServiceListResponse } from '../types'

interface GetServicesOptions {
  decrypt?: boolean
}

const defaultOptions: GetServicesOptions = {
  decrypt: true
}

export const getServices = async (options: GetServicesOptions = defaultOptions) => {
  try {
    const data = await api.get<ServiceListResponse>('/service')

    const encryptedServices = data.services.map(service => new EncryptedService(service))
    
    return encryptedServices
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

export default getServices