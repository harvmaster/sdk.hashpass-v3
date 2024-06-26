import { Service, EncryptedService, EncryptedServiceProps } from '../types'

export interface User {
  username: string;
  settings: {
    algorithm: string;
  };
  create_date: Date;
}

export interface UserResponse {
  user: User;
}

export interface UserAuthResponse {
  user: User;
  refresh_token: {
    token: string,
    user: string,
    revoked: boolean,
    create_date: string
  };
  access_token: string;
}

export interface AccessTokenResponse {
  access_token: string;
}

export interface ServerError {
  error: string | {
    [key: string]: string;
  };
}

export interface ServerResponse<T> {
  data: T;
}

export interface ServiceResponse {
  service: EncryptedServiceProps;
}

export interface ServiceListResponse {
  services: EncryptedServiceProps[]
}

export interface DeleteResponse {
  status: 'success'
}

// export interface LogoResponse {
//   logos: {
//     src: string;
//     size: {
//       width: number;
//       height: number;
//     }
//   }[]
// }

// export type LogoResponse = string

export type LogoResponse = {
  src: string;
  size: {
    width: number;
    height: number;
  }
}[]

export interface DomainRecommendationResponse {
  domains: string[]
}