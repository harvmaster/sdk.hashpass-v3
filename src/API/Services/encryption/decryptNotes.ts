import { decrypt } from 'src/ServiceWorker'

export const decryptNotes = async (notes: Notes): Promise<Notes> => {
  try {
    const unlocked = {
      username: notes.username ? (await decrypt(notes.username)).data : '',
      email: notes.email ? (await decrypt(notes.email)).data : '',
      other: notes.other ? (await decrypt(notes.other)).data : ''
    } as Notes

    return unlocked
  } catch (err) {
    console.log(err)
    return {
      username: '',
      email: '',
      other: ''
    }
    throw new Error()
  }
}

export default decryptNotes