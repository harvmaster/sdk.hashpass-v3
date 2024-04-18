import { sha256 } from 'js-sha256';

// Legacy Hashing algorithm. Not Used
export const generateLegacyPassword = (secret: string, service: string) => {
  if (!secret) throw new Error('Secret can not be undefined')
  if (!service) throw new Error('service can not be undefined')

  let combined = secret + "-" + service;

  for (let i = 0; i < 65535; i++) {
    combined = sha256.digest(combined) as unknown as string;
  }
  combined = sha256(combined)

  combined = combined.slice(0, 16)
  combined = 'z' + combined.slice(1, 16)
  combined = combined.slice(0, 4) + '7' + combined.slice(5, 16)
  combined = combined.slice(0, 9) + 'H' + combined.slice(10, 16)
  combined = combined.slice(0, 15) + '!'

  return combined
}

export default generateLegacyPassword
