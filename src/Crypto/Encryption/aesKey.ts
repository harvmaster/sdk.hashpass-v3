import getCrypto from "../getCrypto"

export class aesKey {
  key: CryptoKey;
  
  constructor(key: CryptoKey) {
    this.key = key
  }

  async encrypt(data: string) {
    const caller = await getCrypto()
    if (!caller) throw new Error('no valid caller')
    console.log('caller', caller)

    // @ts-ignore
    const iv = caller.crypto.getRandomValues(new Uint8Array(12))
    const encrypted = await caller.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      this.key,
      new TextEncoder().encode(data)
    )
    const encryptedArray = new Uint8Array(encrypted)
    const combined = new Uint8Array(iv.length + encryptedArray.length)

    combined.set(iv)
    combined.set(encryptedArray, iv.length)

    return combined
  }

  async decrypt(data: Uint8Array) {
    const iv = data.slice(0, 12)
    const encrypted = data.slice(12)

    const caller = await getCrypto()
    if (!caller) throw new Error('no valid caller')

    const decrypted = await caller.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      this.key,
      encrypted
    )
    return new TextDecoder().decode(decrypted)
  }
}

export default aesKey