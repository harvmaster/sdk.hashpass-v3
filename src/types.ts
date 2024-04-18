import { PasswordEncodings } from "./Crypto/types";

export type ServiceProps = {
  name: string;
  domain?: string;
  logo?: string;
  notes: ServiceNotes,
  encoding: PasswordEncodings;
  date_created: number;
  stats: ServiceStats
}
export type EncryptedServiceProps = ServiceProps

export type Service = {
  encrypted: false;
  encrypt: (key: string) => void;
} & ServiceProps

export type EncryptedService = {
  encrypted: true
  decrypt: (key: string) => void;
} & ServiceProps

export type ServiceNotes = {
  username?: string;
  email?: string;
  other?: string;
}

export type ServiceStats = {
  lastUsed: number;
  timesUsed: number;
}
