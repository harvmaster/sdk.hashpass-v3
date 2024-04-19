export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export type RequestBody = Record<string, any>

export class RequestError extends Error {
  response: any;

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

export const sendRequest = async <returnType extends Object>(url: string, method: RequestMethod, body: RequestBody = {}, options: RequestOptions): Promise<returnType> => {
  const fetchURL = options.params ? `${url}?${new URLSearchParams(options.params)}` : url;
  const res = await fetch(fetchURL, {
    method,
    headers: options.headers,
    body: Object.keys(body).length ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const errorObj = {
      status: res.status,
      statusText: res.statusText,
      data: await res.json(),
    }
    throw new RequestError(`Failed to ${method} ${url}`, errorObj);
  }

  return await res.json() as returnType;
}

export class API {
  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  baseURL: string = 'https://api.hashpass.mc.hzuccon.com'

  buildURL (url: string) {
    return `${this.baseURL}${url}`
  }

  async get<returnType extends Object>(url: string, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(this.buildURL(url), 'GET', undefined, options);
  }

  async post<returnType extends Object>(url: string, body: RequestBody = {}, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(this.buildURL(url), 'POST', body, options);
  }

  async put<returnType extends Object>(url: string, body: RequestBody = {}, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(this.buildURL(url), 'PUT', body, options);
  }

  async delete<returnType extends Object>(url: string, options: RequestOptions = {}): Promise<returnType> {
    options.headers = { ...this.headers, ...options.headers, }
    return await sendRequest<returnType>(this.buildURL(url), 'DELETE', undefined, options);
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