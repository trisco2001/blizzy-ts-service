import axios from 'axios'

async function getCharacterInfo(character: string, server: string) {
    const requestBody = { token: 'USmx2qIgjY78OSwljDJlStnxN5GXi4W1Qv', resource: `wow/character/${server}/${character}`, params: {fields: 'items'}}
    return axios.post('http://localhost:3000/service', requestBody)
}

getCharacterInfo('Barnaby', 'Executus').then (result => {
    console.log(result)
}, reason => {
    console.log(reason)
});