import type { HashpassWorker } from './ServiceWorker/types'
import AuthToken from './API/Auth/AuthToken'

import * as Crypto from './Crypto'
import * as API from './API'

class Hashpass {
  #serviceWorker?: HashpassWorker;
  #AuthToken?: AuthToken;
  Crypto = Crypto;
  API = API;

  constructor() {
    this.#serviceWorker = undefined;
  }

  get isUsingserviceWorker () {
    return !!this.#serviceWorker;
  }

  setserviceWorker (worker: HashpassWorker) {
    this.#serviceWorker = worker;
  }

  get serviceWorker () {
    return this.#serviceWorker;
  }

  

}