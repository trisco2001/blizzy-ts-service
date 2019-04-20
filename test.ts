import axios from 'axios'

async function getToken() {
    return axios.get('http://localhost:3000/auth')
}

async function getCharacterInfo(character: string, server: string, token: string) {
    const requestBody = { token: token, resource: `wow/character/${server}/${character}`, params: {fields: 'items'}}
    return axios.post('http://localhost:3001/service', requestBody)
}

getToken().then(tokenResponse => {
    console.log(tokenResponse.data);
    getCharacterInfo('Scorsby', 'Executus', tokenResponse.data.authToken).then (result => {
        console.log(result)
    }, reason => {
        console.log(reason)
    });
});

let test = { a: "1", b: 2 }
let value = test['a']
console.log(value)

