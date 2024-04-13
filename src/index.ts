import type { HashpassWorker } from './ServiceWorker/types'

class Hashpass {
  #serviceWorker?: HashpassWorker;

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