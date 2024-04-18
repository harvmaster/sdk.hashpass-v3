import { generateLegacyPassword, generateHexPassword, generateBase58Password, getGenerator, algorithms } from './';

describe('PasswordGenerators', () => {
  test('should generate a legacy password', () => {
    const password = generateLegacyPassword('secret', 'service');
    expect(password).toBe('zc3673f1aH9c1fc!');
  })

  test('should generate a hex password', () => {
    const password = generateHexPassword('secret', 'service');
    expect(password).toBe('z3c171fcfHb581e!');
  })

  test('should generate a base58 password', () => {
    const password = generateBase58Password('secret', 'service');
    expect(password).toBe('hZVW9Zj2wZoBU5Q!');
  })

  test('should throw an error if secret is undefined', () => {
    // @ts-ignore
    expect(() => generateLegacyPassword(undefined, 'service')).toThrow();
    // @ts-ignore
    expect(() => generateHexPassword(undefined, 'service')).toThrow();
    // @ts-ignore
    expect(() => generateBase58Password(undefined, 'service')).toThrow();
  })

  test('should throw an error if service is undefined', () => {
    // @ts-ignore
    expect(() => generateLegacyPassword('secret' , undefined)).toThrow();
    // @ts-ignore
    expect(() => generateHexPassword('secret' , undefined)).toThrow();
    // @ts-ignore
    expect(() => generateBase58Password('secret' , undefined)).toThrow();
  })

  test('should return a generator', () => {
    expect(getGenerator('legacy')).toBe(generateLegacyPassword);
    expect(getGenerator('hEX')).toBe(generateHexPassword);
    expect(getGenerator('BAsE58')).toBe(generateBase58Password);
  })

  test('should throw an error if algorithm is not supported', () => {
    // @ts-ignore
    expect(getGenerator('UNSUPPORTED')).toBeUndefined()
  })

  test('algorithm should be exported', () => {
    expect(algorithms).toBeDefined();
  })

})