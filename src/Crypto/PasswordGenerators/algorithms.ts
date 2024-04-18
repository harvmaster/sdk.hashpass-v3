// export default [ 'legacy', 'hex', 'base58' ]

import generateLegacyPassword from './generateLegacyPassword'
import generateHexPassword from './generateHexPassword'
import generateBase58Password from './generateBase58Password'

const algorithms = {
  LEGACY: 'LEGACY',
  HEX: 'HEX',
  BASE58: 'BASE58'
}

export default algorithms