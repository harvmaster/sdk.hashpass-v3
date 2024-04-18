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

class API {
  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  baseURL: string = 'https://api.hashpass.mc.hzuccon.com'

  async get<returnType extends Object>(url: string, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(url, 'GET', {}, options);
  }

  async post<returnType extends Object>(url: string, body: RequestBody = {}, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(url, 'POST', body, options);
  }

  async put<returnType extends Object>(url: string, body: RequestBody = {}, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(url, 'PUT', body, options);
  }

  async delete<returnType extends Object>(url: string, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(url, 'DELETE', {}, options);
  }

  setBaseURL (url: string) {
    this.baseURL = url;
  }

  setHeader (header: string, value: string) {
    this.headers[header] = value;
  }

  setBearerToken (token: string) {
    this.setHeader('Authorization', `Bearer ${token}`);
  }

  clearBearerToken () {
    delete this.headers['Authorization'];
  }
}

const api = new API()

export default api