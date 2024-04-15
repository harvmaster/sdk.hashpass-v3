import { encrypt } from "../../Crypto/Encryption";
import { ServiceNotes } from "../../types";

export const encryptNotes = async (notes: ServiceNotes, key: string): Promise<ServiceNotes> => {
  const { username, other, email } = notes

  let encryptedUsername = ''
  if (username) {
    encryptedUsername = await encrypt(username, key)
  }

  let encryptedEmail = ''
  if (email) {
    encryptedEmail = await encrypt(email, key)
  }

  let encryptedOther = ''
  if (other) {
    encryptedOther = await encrypt(other, key)
  }

  return {
    username: encryptedUsername,
    email: encryptedEmail,
    other: encryptedOther
  }
}

export default encryptNotes