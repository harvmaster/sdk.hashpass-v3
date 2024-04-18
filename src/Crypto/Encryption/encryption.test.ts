import { aesKey, generateAES } from './'   

test('generateAES', async () => {
  const key = await generateAES('test')
  expect(key).toBeDefined()
  expect(key).toBeInstanceOf(aesKey)
  // expect to be a uint8array
  expect(key.encrypt('test')).resolves.toBeInstanceOf(Uint8Array)
})
