import api from '../api'

import { LogoResponse } from '../types'

export const getLogos = async (domain: string) => {
  try {
    const data = await api.get<LogoResponse>(`/logo?domain=${domain}`)

    return data
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

export default getLogos