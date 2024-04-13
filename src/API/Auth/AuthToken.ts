import jwt_decode from "jwt-decode";
import api from '../api';

interface AuthTokenProps {
  access_token?: string;
  refresh_token: string;
}

type RefreshAccessTokenResponse = {
  access_token: string;
}

class AuthToken {
  access_token?: string;
  refresh_token: string;

  constructor({ access_token, refresh_token }: AuthTokenProps) {
    this.access_token = access_token || undefined;
    this.refresh_token = refresh_token;
  }

  isExpired() {
    console.log('Checking if token is expired')
    if (!this.access_token) return true;
    const decoded = jwt_decode(this.access_token) as any;
    const now = Date.now() / 1000;
    console.log('Token expires at: ', decoded.exp)
    console.log('Current time: ', now)
    return decoded.exp < now
  }

  async refreshAccessToken (): Promise<string> {
    if (!this.refresh_token) return Promise.reject('No refresh token');
    const token = await api.post<RefreshAccessTokenResponse>('/user/refresh', {
      refresh_token: this.refresh_token
    });



    return api.post('/user/refresh', {
      refresh_token: this.refresh_token
    }).then(res => {
      this.access_token = res.data.access_token;
      return res.data.access_token;
    });
  }

  saveTokens () {
    localStorage.setItem('refresh_token', this.refresh_token);
    if (this.access_token) localStorage.setItem('access_token', this.access_token);
  }

  setAuthHeader () {
    api.defaults.headers.common['Authorization'] = `Bearer ${this.access_token}`;
  }

  static deleteTokens () {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    delete api.defaults.headers.common['Authorization']
  }

  static loadTokens (): AuthToken | undefined {
    const access_token = localStorage.getItem('access_token') || undefined;
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) return;
    return new AuthToken({ access_token, refresh_token });
  }
}

export default AuthToken;