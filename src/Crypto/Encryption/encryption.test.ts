import { aesKey, generateAES, encrypt, decrypt } from './'   

test('generateAES', async () => {
  const key = await generateAES('test')
  expect(key).toBeDefined()
  expect(key).toBeInstanceOf(aesKey)
  // expect to be a uint8array
  expect(key.encrypt('test')).resolves.toBeInstanceOf(Uint8Array)
})

test('encrypt/decrypt', async () => {
  const encrypted = await encrypt('testData', 'testKey')
  expect(encrypted).toBeTruthy()
  const decrypted = await decrypt(encrypted, 'testKey')
  expect(decrypted).toBe('testData')
})

test('encrypt/decrypt with aesKey', async () => {
  const key = await generateAES('test')
  const encrypted = await key.encrypt('testData')
  expect(encrypted).toBeTruthy()
  const decrypted = await key.decrypt(encrypted)
  expect(decrypted).toBe('testData')
})
