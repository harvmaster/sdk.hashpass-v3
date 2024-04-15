import { PasswordEncodings } from "../Crypto/types";
import { ServiceProps, Service as ServiceI } from "../types";

class Service implements ServiceI {
  encrypted: false;
  name: string;
  domain?: string;
  logo?: string;
  notes: {
    username?: string;
    email?: string;
    other?: string;
  };
  encoding: PasswordEncodings;
  date_created: number;
  stats: {
    lastUsed: number;
    timesUsed: number;
  };

  constructor(service: ServiceProps) {
    this.encrypted = false;
    this.name = service.name;
    this.domain = service.domain;
    this.logo = service.logo;
    this.notes = service.notes;
    this.encoding = service.encoding;
    this.date_created = service.date_created;
    this.stats = service.stats;
  }

  encrypt(key?: string) {
    this.encrypted = true;
  }
}

export default Service;