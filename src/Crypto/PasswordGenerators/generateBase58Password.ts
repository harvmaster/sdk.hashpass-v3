import { sha256 } from 'js-sha256';
import { hexToBase58 } from '../Encodings';

// Higher Security Version - Recommended Going Forward
export const generateBase58Password = (secret: string, service: string) => {
  if (!secret) throw new Error('Secret can not be undefined')
  if (service == undefined) throw new Error('service can not be undefined')

  let combined = secret + "-" + service;

  for (let i = 0; i < 65536; i++) {
    combined = sha256(combined);
  }

  combined = hexToBase58(combined)

  // Limit to 16 Characters
  combined = combined.slice(0, 16)

  // Set the First character to a 'h'
  combined = 'h' + combined.slice(1, 16)

  // Set the 5th character to a '9'
  combined = combined.slice(0, 4) + '9' + combined.slice(5, 16)

  // Set the 10th character to a 'Z'
  combined = combined.slice(0, 9) + 'Z' + combined.slice(10, 16)

  // Set the 16th character to a '!'
  combined = combined.slice(0, 15) + '!'

  return combined
}

export default generateBase58Password