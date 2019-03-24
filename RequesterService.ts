import axios, { AxiosPromise } from 'axios'
import { Environment } from 'Environment';

export class RequesterService {
    constructor(readonly environment: Environment, readonly token: string) { }

    request(resource: string, params: any): AxiosPromise {
        params.locale = this.environment.locale;
        params.apikey = this.environment.apikey;

        const options = {
            baseURL: this.environment.baseUrl,
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
            params: params
        }

        console.log(`GETTING at ${resource} with ${JSON.stringify(options)}`)
        return axios.get(resource, options)
    }
}