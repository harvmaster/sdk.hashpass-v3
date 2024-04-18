import { generateLegacyPassword } from './generateLegacyPassword';
import { generateHexPassword } from './generateHexPassword';
import { generateBase58Password } from './generateBase58Password';

type PasswordGenerator = (secret: string, service: string) => string
type Algorithm = 'LEGACY' | 'HEX' | 'BASE58'

export const algorithms: Record<string, PasswordGenerator> = {
  legacy: generateLegacyPassword,
  hex: generateHexPassword,
  base58: generateBase58Password,
}

export const getGenerator = (algorithm: Uppercase<Algorithm>): PasswordGenerator  => {
  return algorithms[algorithm.toLocaleLowerCase()];
}

export default getGenerator