import { encrypt } from '../../../Crypto/Encryption'

import { ServiceNotes } from '../../../types'

export const encryptNotes = async (notes: ServiceNotes): Promise<ServiceNotes> => {
  try {
    const unlocked = {
      username: notes.username ? (await encrypt(notes.username)).data : '',
      email: notes.email ? (await encrypt(notes.email)).data : '',
      other: notes.other ? (await encrypt(notes.other)).data : ''
    } as ServiceNotes

    return unlocked
  } catch (err) {
    console.log(err)
    throw new Error(`Failed to encrypt notes: ${err}`,)
  }
}

export default encryptNotes