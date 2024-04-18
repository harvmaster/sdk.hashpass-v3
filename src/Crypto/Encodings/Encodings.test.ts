import { hexToBase58 } from './'

describe('hexToBase58', () => {
  test('should convert a hex string to a base58 string', () => {
    const base58 = hexToBase58('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9')
    expect(base58).toBe('DULfJyE3WQqNxy3ymuhAChyNR3yufT88pmqvAazKFMG4')
  })
})