import api from '../api'

import { ServiceResponse } from '../types'
import EncryptedService from '../../Service/EncryptedService'

export type UpdateServiecOptions = {
  decrypt: boolean
}

const defaultOptions: UpdateServiecOptions = {
  decrypt: true
}

/**
 * updateBody is an EncryptedService object, this ensures that the data is encrypted before sending it to the server
 * @param updateBody 
 * @param options 
 * @returns 
 */
export const updateService = async (updateBody: EncryptedService, options: UpdateServiecOptions = defaultOptions) => {
  try {
    const data = await api.put<ServiceResponse>('/service', {
      ...updateBody.toJSON()
    })

    const service = new EncryptedService(data.service)

    return service
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

export default updateService