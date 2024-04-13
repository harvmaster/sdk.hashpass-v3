import { PasswordEncodings } from '../Crypto/types'

export interface HashpassWorker {
  setSecret (secret: string): void
  unlockSecret (pin: string): Promise<void>
  lock (): void
  isValidPin (pin: string): Promise<boolean>
  isLocked (): boolean
  generatePassword (service: string, algorithm: PasswordEncodings): string
  getAlgorithm (algorithm: PasswordEncodings): (secret: string, service: string) => string
  startTimeout (): void
  stopTimeout (): void
  decrypt (encrypted: string): Promise<string>
  encrypt (data: string): Promise<string>
}