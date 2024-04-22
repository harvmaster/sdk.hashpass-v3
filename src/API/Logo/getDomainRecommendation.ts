import api from '../api'

import { DomainRecommendationResponse } from '../types'

export const getDomainRecommendation = async (domain: string, access_token?: string) => {
  try {
    const headers: any = {}
    if (access_token) headers['Authorization'] = `Bearer ${access_token}`
    const data = await api.get<DomainRecommendationResponse>(`/logo/domain?domain=${domain}`, {
      headers
    })

    console.log(data)

    return data.domains
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

export default getDomainRecommendation