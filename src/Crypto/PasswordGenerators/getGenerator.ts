import { generateLegacyPassword } from './generateLegacyPassword';
import { generateHexPassword } from './generateHexPassword';
import { generateBase58Password } from './generateBase58Password';

type PasswordGenerator = (secret: string, service: string) => string
type Algorithm = 'LEGACY' | 'HEX' | 'BASE58'

export const algorithms: Record<string, PasswordGenerator> = {
  LEGACY: generateLegacyPassword,
  HEX: generateHexPassword,
  BASE58: generateBase58Password,
}

export const getGenerator = <T extends string>(algorithm: Uppercase<T> extends Algorithm ? T : Algorithm): PasswordGenerator  => {
  return algorithms[algorithm.toLocaleUpperCase()];
}

export default getGenerator