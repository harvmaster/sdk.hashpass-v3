import { encrypt } from 'src/ServiceWorker'

export const encryptNotes = async (notes: Notes): Promise<Notes> => {
  try {
    const unlocked = {
      username: notes.username ? (await encrypt(notes.username)).data : '',
      email: notes.email ? (await encrypt(notes.email)).data : '',
      other: notes.other ? (await encrypt(notes.other)).data : ''
    } as Notes

    return unlocked
  } catch (err) {
    console.log(err)
    throw new Error()
  }
}

export default encryptNotes