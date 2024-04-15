import { decrypt } from "../../Crypto/Encryption";
import { ServiceNotes } from "../../types";

export const decryptedNotes = async (notes: ServiceNotes, key: string): Promise<ServiceNotes> => {
  const { username, other, email } = notes

  let decryptedUsername = ''
  if (username) {
    decryptedUsername = await decrypt(username, key)
  }

  let decryptedEmail = ''
  if (email) {
    decryptedEmail = await decrypt(email, key)
  }

  let decryptedOther = ''
  if (other) {
    decryptedOther = await decrypt(other, key)
  }

  return {
    username: decryptedUsername,
    email: decryptedEmail,
    other: decryptedOther
  }
}

export default decryptedNotes