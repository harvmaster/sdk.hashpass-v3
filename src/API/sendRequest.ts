import Hashpass from './'

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export type RequestBody = Record<string, any>

const sendRequest = async <returnType extends Object>(url: string, method: RequestMethod, body: RequestBody, options: RequestOptions): Promise<returnType> => {
  const fetchURL = options.params ? `${url}?${new URLSearchParams(options.params)}` : url;
  const res = await fetch(fetchURL, {
    method,
    headers: options.headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorObj = {
      status: res.status,
      statusText: res.statusText,
      url: res.url,
    }
    throw new Error(`Failed to ${method} ${url}, ${errorObj}`);
  }

  return await res.json() as returnType;
}

export const get = async <returnType extends Object>(url: string, options: RequestOptions): Promise<returnType> => {
  return await sendRequest<returnType>(url, 'GET', {}, options);
}

export const post = async <returnType extends Object>(url: string, body: RequestBody, options: RequestOptions): Promise<returnType> => {
  return await sendRequest<returnType>(url, 'POST', body, options);
}

export const put = async <returnType extends Object>(url: string, body: RequestBody, options: RequestOptions): Promise<returnType> => {
  return await sendRequest<returnType>(url, 'PUT', body, options);
}

export const del = async <returnType extends Object>(url: string, body: RequestBody, options: RequestOptions): Promise<returnType> => {
  return await sendRequest<returnType>(url, 'DELETE', body, options);
}

export const requireAuth = () => {
  if (Hashpass.AuthToken.isExpired()) throw new Error('Token expired');
  const token = Hashpass.AuthToken.access_token

  return {
    post: async <returnType extends Object>(url: string, body: RequestBody, options: RequestOptions): Promise<returnType> => {
      return await post<returnType>(url, body, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      })
    },
    get: async <returnType extends Object>(url: string, options: RequestOptions): Promise<returnType> => {
      return await get<returnType>(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      })
    },
    put: async <returnType extends Object>(url: string, body: RequestBody, options: RequestOptions): Promise<returnType> => {
      return await put<returnType>(url, body, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      })
    },
    delete: async <returnType extends Object>(url: string, body: RequestBody, options: RequestOptions): Promise<returnType> => {
      return await del<returnType>(url, body, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      })
    }
  }
}


export default {
  get,
  post,
  put,
  delete: del,
  requireAuth,
}