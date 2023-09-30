import { api as warpcaster } from './utils/warpcaster-api'

const getLikes = async (castHash: string) => {
    const res = await warpcaster.url(`/cast-reactions?castHash=${castHash}&limit=25`).get().json()
    console.log(res)
    return res
}


console.log('get likes test ', getLikes('0x92dc68040066319b2174c791f269af3ea5ac1bd1'))