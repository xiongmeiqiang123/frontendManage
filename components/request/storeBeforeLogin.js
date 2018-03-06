import store from 'store'
const LASTHASH = '__LASTHASH'
let hash = window.location.hash;

export async function  saveLashHash() {
    store.set(LASTHASH, hash)
}

export async function getLashHash() {
    store.get(LASTHASH, hash)
}
export async function removeLashHash() {
    store.remove(LASTHASH, hash)
}
