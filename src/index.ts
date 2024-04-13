import type { HashpassWorker } from './ServiceWorker/types'
import type { AuthToken } from './API/Auth/AuthToken'

class Hashpass {
  #serviceWorker?: HashpassWorker;
  #AuthToken?: AuthToken;

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