import { PasswordEncodings } from "../Crypto/types";
import { ServiceProps, EncryptedService as EncryptedServiceI } from "../types";

import Service from "./index";

class EncryptedService implements EncryptedServiceI {
  encrypted: true;
  name: string;
  domain?: string;
  logo?: string;
  readonly notes: {
    readonly username?: string;
    readonly email?: string;
    readonly other?: string;
  };
  encoding: PasswordEncodings;
  date_created: number;
  stats: {
    lastUsed: number;
    timesUsed: number;
  };

  constructor(service: ServiceProps) {
    this.encrypted = true;
    this.name = service.name;
    this.domain = service.domain;
    this.logo = service.logo;
    this.notes = service.notes;
    this.encoding = service.encoding;
    this.date_created = service.date_created;
    this.stats = service.stats;
  }

  decrypt(key?: string) {
    this.encrypted = false;
  }
}

export default EncryptedService;