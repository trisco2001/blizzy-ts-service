export class Environment {
    locale: string
    apikey: string
    baseUrl: string

    constructor() {
        this.locale = process.env["LOCALE"]!
        this.apikey = process.env["APIKEY"]!
        this.baseUrl = process.env["BASE_URL"]!
    }
}