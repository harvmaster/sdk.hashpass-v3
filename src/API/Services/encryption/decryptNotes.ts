import { decrypt } from '../../../Crypto/Encryption'

import { ServiceNotes } from '../../../types'

export const decryptNotes = async (notes: ServiceNotes): Promise<ServiceNotes> => {
  try {
    const unlocked = {
      username: notes.username ? (await decrypt(notes.username)).data : '',
      email: notes.email ? (await decrypt(notes.email)).data : '',
      other: notes.other ? (await decrypt(notes.other)).data : ''
    } as ServiceNotes

    return unlocked
  } catch (err) {
    console.log(err)
    return {
      username: '',
      email: '',
      other: ''
    }
  }
}

export default decryptNotes