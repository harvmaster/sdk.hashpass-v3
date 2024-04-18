import sha256 from './'

describe('SHA256', () => {
  test('should hash a string', () => {
    const hash = sha256('hello world')
    expect(hash).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9')
  })
})

