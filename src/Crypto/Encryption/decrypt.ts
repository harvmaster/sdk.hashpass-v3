import { generateAES } from '.'

export const decrypt = async (data: string, key: string) => {
  const aes = await generateAES(key)
  const encodedData = Uint8Array.from(atob(data), c => c.charCodeAt(0))
  const decrypted = await aes.decrypt(encodedData)
  return decrypted
}

export default decrypt