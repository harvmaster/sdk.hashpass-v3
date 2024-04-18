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
  expect(encrypted).toBeInstanceOf(Uint8Array)
  const decrypted = await decrypt(encrypted, 'testKey')
  expect(decrypted).toBe('testData')
})
