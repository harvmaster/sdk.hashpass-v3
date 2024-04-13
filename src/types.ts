import { PasswordEncodings } from "./Crypto/types";

export type Service = {
  name: string;
  domain?: string;
  logo?: string;
  notes: ServiceNotes,
  encoding: PasswordEncodings;
  date_created: number;
  stats: ServiceStats
}

export interface EncryptedService extends Service {
  encrypted: true
}

export type ServiceNotes = {
  username?: string;
  email?: string;
  other?: string;
}

export type ServiceStats = {
  lastUsed: number;
  timesUsed: number;
}
