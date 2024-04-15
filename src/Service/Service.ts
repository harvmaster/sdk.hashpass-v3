import { PasswordEncodings } from "../Crypto/types";
import { ServiceProps, Service as ServiceI } from "../types";
import EncryptedService from "./EncryptedService";
import encryptNotes from "./Notes/encryptNotes";

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

  async encrypt(key: string) {
    const json = this.toJSON()

    const encryptedNotes = await encryptNotes(json.notes, key)
    json.notes = encryptedNotes
    
    return new EncryptedService(json)
  }

  toJSON(): ServiceProps & { encrypted: false } {
    return {
      name: this.name,
      domain: this.domain,
      logo: this.logo,
      notes: { ...this.notes },
      encoding: this.encoding,
      date_created: this.date_created,
      stats: this.stats,
      encrypted: this.encrypted
    };
  }
}

export default Service;