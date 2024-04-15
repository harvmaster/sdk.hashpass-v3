import api from '../api'

import { Service } from '../../types'
import { ServiceResponse } from '../types'

export type UpdateServiecOptions = {
  decrypt: boolean
}

const defaultOptions: UpdateServiecOptions = {
  decrypt: true
}

export const updateService = async (updateBody: Partial<Service>, options: UpdateServiecOptions = defaultOptions) => {
  try {
    if (updateBody.notes) updateBody.notes = await encryptNotes(updateBody.notes)
    
    const data = await api.put<ServiceResponse>('/service', {
      ...updateBody
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

export default updateService