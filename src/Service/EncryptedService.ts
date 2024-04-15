import { PasswordEncodings } from "../Crypto/types";
import { ServiceProps, EncryptedService as EncryptedServiceI } from "../types";

import Service from "./Service";
import decryptNotes from "./Notes/decryptNotes";

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

  async decrypt(key: string): Promise<Service> {
    const json = this.toJSON()

    const decryptedNotes = await decryptNotes(json.notes, key)
    json.notes = decryptedNotes

    return new Service(json)
  }

  toJSON(): ServiceProps & { encrypted: true } {
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

export default EncryptedService;