import { generateAES } from '.'

export const encrypt = async (data: string, key: string) => {
  const aes = await generateAES(key)
  const encrypted = await aes.encrypt(data)
  const base64String = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  return base64String
}

export default encrypt