const getCrypto = async () => {
  let crypto
  try {
    try {
      if (!crypto) crypto = window
    } catch (err) {}

    try {
      if (!crypto) {
        const nodeCrypto = await import('crypto')
        if (!nodeCrypto.webcrypto) throw new Error('no webcrypto')
        crypto = {
          crypto: nodeCrypto.webcrypto
        }
      }
    } catch (err) {}

    try {
      if (!crypto) crypto = self
    } catch (err) {}
  } catch (err) {
    throw new Error('no valid crypto')
  }
  return crypto
}

export default getCrypto