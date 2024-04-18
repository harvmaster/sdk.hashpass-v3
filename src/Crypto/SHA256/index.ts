import { sha256 } from 'js-sha256';

export const getHash = (input: string) => {
    return sha256(input);
}

export default getHash