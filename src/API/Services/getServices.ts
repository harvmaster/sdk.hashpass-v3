import api from '../api'

import { Service, EncryptedService } from '../../types'
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

    let services: EncryptedService[] = data.services
    if (options.decrypt) {
      services = await Promise.all(services.map(async (service) => {
        if (!service.notes) service.notes = {}
        service.notes = await decryptNotes(service.notes)
        return service
      }))
    }
    
    return services
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